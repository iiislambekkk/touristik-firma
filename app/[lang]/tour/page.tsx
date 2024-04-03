"use client"

import React, {useEffect, useState} from 'react';
import {getAllTours, getOneTour} from "@/src/services/tours";
import CardTitle from "@/src/components/CardTitle";
import Button from "antd/es/button/button";
import Card from "antd/es/card/Card";
import { Typography } from 'antd';

const { Text, Paragraph } = Typography;


const Page = () => {

    const [tour, setTour] = useState<Tour>({} as Tour);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id == null) {
            return;
        }

        const getTour = async () => {
            const tour = await getOneTour(id);
            console.log(tour)
            setTour(tour);
        }

        getTour();
    }, [])

    return (
        <Card
            key={tour?.id}
            title={<CardTitle title={tour?.titleEn} price={tour?.price}/>}
            bordered={true}
            hoverable={true}
            className={"card"}
        >
            <img src="https://localhost:7118/posts/638477802582146959.jpeg" alt="" className="card__image"/>
            <Paragraph >{tour?.descriptionEn?.slice(0, 80)}</Paragraph >
            <Paragraph >Country: {tour?.country}</Paragraph >
        </Card>
    );
};

export default Page;