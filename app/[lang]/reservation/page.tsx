"use client"

import React, {useEffect, useState} from 'react';
import styles from "./reservation.module.css";
import {getAllReservData} from "@/src/services/reservationData";
import Input from "antd/es/input/Input";
import TourDates from "@/src/components/TourDates/TourDates";
import Title from "antd/es/typography/Title";
import {Collapse, CollapseProps, Typography} from "antd";
import {getDateById} from "@/src/services/dates";

const Page = () => {

    const [reserveDatas, setReserveDatas] = useState<ReserveData[]>([]);



    useEffect(() =>
    {
        const getReserveDatas = async () => {
            const res = await getAllReservData()
            setReserveDatas(res);
        }
        getReserveDatas()
    }, [])


    return (
        <div className={styles.reservesBlock}>
            {
            reserveDatas.map((data) =>
                {

                let touristInfo: Tourists = data.touristsInfo != undefined ? JSON.parse(data.touristsInfo) : {};
                console.log(touristInfo)

                const touristsItems: CollapseProps['items'] = [
                ];

                for (let i= 1; i<= data.countOfTourists; i++) {

                    touristsItems.push({
                        key: `${i}`,
                        label: `Турист ${i}`,
                        children: (
                            <div className={styles.days}>
                                <Title>{touristInfo[i].fio}</Title>
                                <Typography>{touristInfo[i].birthDate}</Typography>
                            </div>
                        ),
                    })
                }

                return (
                    <div className={styles.reserve}>

                        <Title level={4}  style={{marginBottom: "0px", marginTop: "0px"}} >Num of Tourists: {data.countOfTourists}</Title>

                        <Title level={3} style={{marginBottom: "0px", marginTop: "0px"}}>Контактная информация:</Title>
                        <Typography>Email: {data.email}</Typography>
                        <Typography>Phone: {data.phone}</Typography>
                        <Typography>Question: {data.question}</Typography>

                        <Title level={3} style={{marginBottom: "0px", marginTop: "12px"}}>Информация о туристах:</Title>


                         <Collapse accordion={true} items={touristsItems}></Collapse>
                    </div>
                    )
                })
            }
        </div>
    );
};

export default Page;