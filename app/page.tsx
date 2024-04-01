"use client"

import {useEffect} from "react";
import {redirect} from "next/navigation";


export default function Home() {
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    useEffect(() => {
        redirect('/kz');
    })
  return (
      <>

      </>
  );
}
