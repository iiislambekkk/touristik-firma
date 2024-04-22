"use client"

import React, {useEffect, useState} from 'react';
import styles from "./reservation.module.css";
import {getAllReservData} from "@/src/services/reservationData";
import Input from "antd/es/input/Input";
import TourDates from "@/src/components/TourDates/TourDates";
import Title from "antd/es/typography/Title";
import {Collapse, CollapseProps, Typography} from "antd";
import {getDateById} from "@/src/services/dates";
import * as dictionary from "./reservationDict.json";

const Page = ({params}: {params: {lang: string}}) => {

    const [reserveDatas, setReserveDatas] = useState<ReserveData[]>([]);
    let dict: Dictionary = dictionary;
    const reservDict = dict?.[params.lang];


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


                const touristsItems: CollapseProps['items'] = [
                ];

                for (let i= 1; i<= data.countOfTourists; i++) {

                    touristsItems.push({
                        key: `${i}`,
                        label: `Турист ${i}`,
                        children: (
                            <div className={styles.days}>
                                <Title>{reservDict.name}: {touristInfo[i].fio}</Title>
                                <Typography>{reservDict.birthDate}: {touristInfo[i].birthDate}</Typography>
                                <Typography>{reservDict.numOfPassport}: {touristInfo[i].numOfPassport}</Typography>
                                <Typography>{reservDict.dateOfPassport}: {touristInfo[i].dateOfPassport}</Typography>
                                <Typography>{reservDict.pol}: {touristInfo[i].pol}</Typography>
                            </div>
                        ),
                    })
                }

                return (
                    <div key={data.id} className={styles.reserve}>

                        <Title level={4}  style={{marginBottom: "0px", marginTop: "0px"}} >{reservDict.countOfTourists}: {data.countOfTourists}</Title>

                        <Title level={3} style={{marginBottom: "0px", marginTop: "0px"}}>{reservDict.contacts}:</Title>
                        <Typography>Email: {data.email}</Typography>
                        <Typography>Phone: {data.phone}</Typography>
                        <Typography>Question: {data.question}</Typography>

                        <Title level={3} style={{marginBottom: "0px", marginTop: "12px"}}>{reservDict.info}:</Title>


                         <Collapse accordion={true} items={touristsItems}></Collapse>
                    </div>
                    )
                })
            }
        </div>
    );
};

export default Page;