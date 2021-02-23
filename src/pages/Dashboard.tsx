import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

type Props = {
  item: any;
};

function Routine(props: Props) {
  const { item } = props
  const dates = ['2/21', '2/22', '2/23', '2/24', '2/25']

  return (
    <div>
      {item.title}
      <table>
        <thead>
          <tr>
            <th style={{ width: 200 }}>メニュー</th>
            {
              dates.map((date, index) => {
                return (
                  <th key={index}>{date}</th>
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
                        return (
                          <td key={index}>○</td>
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

export default function Dashboard() {
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
          return (<Routine key={item.id} item={item}/>);
        })
      }
    </div>
  )
}
