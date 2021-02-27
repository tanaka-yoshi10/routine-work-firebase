import React, { useEffect, useState } from "react";
import { firestore, Timestamp } from "../firebase";
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  routine: any;
  user: any;
};

function Routine(props: Props) {
  const { routine, user } = props;
  const today = DateTime.local().startOf('day')
  const dates = [...Array(7)].map((_, i) => today.plus({ days: i - 3 }).startOf('day'))

  const [hitories, setHistories] = useState([]);

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
      {routine.title}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: 200 }}>メニュー</th>
            {
              dates.map((date, index) => {
                const style = date.toSeconds() === today.toSeconds() ? { background: 'gray' } : {}
                return (
                  <th key={index} style={style}>{date.toFormat('MM/dd')}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              routine.menus.map((menu: string, index: number) => {
                return (
                  <tr key={index}>
                    <td>{menu}</td>
                    {
                      dates.map((date, index) => {
                        const mark = hitories.some((history:any) => {
                          const doneAt:any = history.doneAt;
                          // const done = fromJSDate(doneAt)
                          // return date <= done && done <= date.endOf('day')
                          if (menu !== history.menu) {
                            return false
                          }
                          return date.toJSDate() <= doneAt.toDate() && doneAt.toDate() <= date.endOf('day').toJSDate()
                        })
                        const style = date.toSeconds() === today.toSeconds() ? { background: 'gray' } : {}
                        const isToday = date.toSeconds() === today.toSeconds();
                        return (
                          <td key={index} style={style} onClick={() => onClick(date, menu, isToday, mark)}>{
                            mark ? (<FontAwesomeIcon icon={faCheck} />) : ''
                          }</td>
                        )
                      })
                    }
                  </tr>
                );
              })
            }
        </tbody>
      </table>
    </div>
  )
}

export default function Dashboard(props: any) {
  const { user } = props
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const ref = firestore.collection('routines');
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setRoutines(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <div>
      {
        routines.map((routine: any) => {
          return (<Routine key={routine.id} routine={routine} user={user}/>);
        })
      }
    </div>
  )
}
