import {DateTime} from "luxon";
import React, {useEffect, useState} from "react";
import { firestore } from "../firebase";
import { CheckIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { addDoc, collection, endAt, onSnapshot, orderBy, query, startAt, Timestamp, where } from "firebase/firestore";
import { User } from "firebase/auth";

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
    const ref = collection(firestore, 'histories')
    addDoc(ref, {
      menu,
      routineId: routine.id,
      doneAt: new Date(),
      createdAt: new Date(),
      uid: user.uid ,
    });
  };

  useEffect(() => {
    const ref = query(collection(firestore, 'histories'),
      where("routineId", "==", routine.id),
      where("uid", "==", user.uid),
      orderBy('doneAt', 'desc'),
      startAt(Timestamp.fromDate(dates[dates.length - 1].toJSDate())),
      endAt(Timestamp.fromDate(dates[0].toJSDate())));
    const unsubscribe = onSnapshot(ref, ({ docs }) => {
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
                      if (menu !== history.menu) {
                        return false
                      }
                      return date.toJSDate() <= doneAt.toDate() && doneAt.toDate() <= date.endOf('day').toJSDate()
                    })
                    const style = date.toSeconds() === today.toSeconds() ? { background: '#d1e3f7' } : {}
                    const isToday = date.toSeconds() === today.toSeconds();
                    return (
                      <Td key={index} style={style} onClick={() => onClick(date, menu, isToday, mark)}>{
                        mark ? (<CheckIcon />) : ''
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
