import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {createDate, DateRequest, deleteDate, getAllDates} from "@/src/services/dates";
import {Button, Typography} from "antd";
import styles from "./TourDates.module.css";
import {appStore} from "@/src/store/appStore";
import TextArea from "antd/es/input/TextArea";
import Input from "antd/es/input/Input";

interface Props {
    entityId: string;
    setDateId: Dispatch<SetStateAction<string>>;
    setPriceOfDate: Dispatch<SetStateAction<number>>;
    dateId: string;
}


const TourDates = ({entityId, setDateId, setPriceOfDate, dateId}: Props) => {
    const [dates, setDates] = useState<Dates[]>([])
    const [isAddDateActive, setIsAddDateActive] = useState(false)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState(0);

    const getDates = async () => {
        const res = await getAllDates(entityId);
        setDates(res);
        console.log(res)
    }

    const addDate = async () => {
        const dateRequest = {startDate: startDate, endDate: endDate, price: price, entityId: entityId} as DateRequest;
        await createDate(dateRequest);
        getDates()
        setIsAddDateActive(false);
    }

    const deleteDates = async (id: string) => {
        const res = await deleteDate(id);
        getDates();
    }

    useEffect(() => {
        getDates()
    }, [])

    return (
        <div>
            {appStore.isAdmin ? <Button onClick={() => setIsAddDateActive(true)}>Add Date</Button> : <></>}
            {isAddDateActive ?
                <div className={styles.addDate}>
                    <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder={"Write start date"}></Input>
                    <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder={"Write start date"}></Input>
                    <Input value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder={"Write start date"}></Input>
                    <div className={styles.addControls}>
                        <Button type={"primary"} onClick={() => addDate()}>Add</Button>
                        <Button danger onClick={() => setIsAddDateActive(false)}>Stop</Button>
                    </div>
                </div>
                :
                <></>
            }
            <div  className={styles.dates}>

                {dates.map((date) => (
                    <div key={date.id} className={styles.date} style={dateId == date.id ? {border: "2px solid white"} : {}}>
                        <Typography>{date.startDate} - {date.endDate}</Typography>
                        <div className={styles.controls}>
                            <Typography>{date.price} ₸</Typography>
                            {appStore.isAdmin ? <Button danger onClick={() => deleteDates(date.id)}>Жою</Button> : <></>}
                            <Button onClick={() =>
                            {
                                setDateId(date.id);
                                setPriceOfDate(date.price);
                            }}>Таңдау</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourDates;