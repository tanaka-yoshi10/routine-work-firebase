import React, { useEffect, useState } from "react";
import { firestore, Timestamp } from "../firebase";
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  item: any;
  user: any;
};

function Routine(props: Props) {
  const { item, user } = props;
  const today = DateTime.local()
  const dates = [...Array(7)].map((_, i) => today.plus({ days: i - 3 }).startOf('day'))

  const [items, setItems] = useState([]);

  useEffect(() => {
    const ref = firestore.collection('histories')
      .where("routineId", "==", item.id)
      .where("uid", "==", user.uid)
      .orderBy('doneAt', 'desc')
      .startAt(Timestamp.fromDate(dates[dates.length - 1].toJSDate()))
      .endAt(Timestamp.fromDate(dates[0].toJSDate()));
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setItems(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <div>
      {item.title}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: 200 }}>メニュー</th>
            {
              dates.map((date, index) => {
                return (
                  <th key={index}>{date.toFormat('MM/dd')}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              item.menus.map((menu: string, index: number) => {
                return (
                  <tr key={index}>
                    <td>{menu}</td>
                    {
                      dates.map((date, index) => {
                        const mark = items.some((history:any) => {
                          const doneAt:any = history.doneAt;
                          // const done = fromJSDate(doneAt)
                          // return date <= done && done <= date.endOf('day')
                          if (menu !== history.menu) {
                            return false
                          }
                          return date.toJSDate() <= doneAt.toDate() && doneAt.toDate() <= date.endOf('day').toJSDate()
                        })
                        return (
                          <td key={index}>{
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ref = firestore.collection('routines');
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setItems(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <div>
      {
        items.map((item: any) => {
          // return (<p key={item.id}>{item.title}</p>);
          return (<Routine key={item.id} item={item} user={user}/>);
        })
      }
    </div>
  )
}
