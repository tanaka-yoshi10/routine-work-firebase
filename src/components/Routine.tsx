import {DateTime} from "luxon";
import React, {useEffect, useState} from "react";
import { firestore, Timestamp, User } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

type Props = {
  routine: any;
  user: User;
};

export default function Routine(props: Props) {
  const { routine, user } = props;
  const today = DateTime.local().startOf('day')
  const dates = [...Array(7)].map((_, i) => today.plus({ days: i - 3 }).startOf('day'))

  const [histories, setHistories] = useState([]);

  const onClick = (date: any, menu: string, isToday: boolean, mark: boolean) => {
    if (!isToday) {
      return
    }
    if (mark) {
      return
    }
    const ref = firestore.collection('histories')
    ref.add({
      menu,
      routineId: routine.id,
      doneAt: new Date(),
      createdAt: new Date(),
      uid: user.uid ,
    });
  };

  useEffect(() => {
    const ref = firestore.collection('histories')
      .where("routineId", "==", routine.id)
      .where("uid", "==", user.uid)
      .orderBy('doneAt', 'desc')
      .startAt(Timestamp.fromDate(dates[dates.length - 1].toJSDate()))
      .endAt(Timestamp.fromDate(dates[0].toJSDate()));
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setHistories(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <div>
      <Link to={`/routines/${routine.id}/edit`}>{routine.title}</Link>
      <Table variant="simple">
        <Thead>
        <Tr>
          <Th w={200}>メニュー</Th>
          {
            dates.map((date, index) => {
              const style = date.toSeconds() === today.toSeconds() ? { background: '#d1e3f7' } : {}
              return (
                <Th key={index} style={style}>{date.toFormat('MM/dd')}</Th>
              )
            })
          }
        </Tr>
        </Thead>
        <Tbody>
        {
          routine.menus.map((menu: string, index: number) => {
            return (
              <Tr key={index}>
                <Td>{menu}</Td>
                {
                  dates.map((date, index) => {
                    const mark = histories.some((history:any) => {
                      const doneAt:any = history.doneAt;
                      // const done = fromJSDate(doneAt)
                      // return date <= done && done <= date.endOf('day')
                      if (menu !== history.menu) {
                        return false
                      }
                      return date.toJSDate() <= doneAt.toDate() && doneAt.toDate() <= date.endOf('day').toJSDate()
                    })
                    const style = date.toSeconds() === today.toSeconds() ? { background: '#d1e3f7' } : {}
                    const isToday = date.toSeconds() === today.toSeconds();
                    return (
                      <Td key={index} style={style} onClick={() => onClick(date, menu, isToday, mark)}>{
                        mark ? (<FontAwesomeIcon icon={faCheck} />) : ''
                      }</Td>
                    )
                  })
                }
              </Tr>
            );
          })
        }
        </Tbody>
      </Table>
    </div>
  )
}
