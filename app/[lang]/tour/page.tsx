"use client"

import React, {useEffect, useState} from 'react';
import {getAllTours, getOneTour} from "@/src/services/tours";
import CardTitle from "@/src/components/CardTitle";
import Button from "antd/es/button/button";
import Card from "antd/es/card/Card";
import { Typography } from 'antd';
import {Config} from "@/config";
import './tour.css'

const { Text, Paragraph } = Typography;


const Page = ({params}: {params: {lang: string}}) => {

    const [tour, setTour] = useState<Tour>({} as Tour);
    const lang = params.lang;
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

    if (lang === "en") return (
        <div className={"tour"}>
            <div className="tour__header">
                <img src={`${Config.serverAdress}${tour.previewPhotoPath}`} alt="" className="tour__header-image"/>
                <h1 className={"tour__header-text"}>{tour.titleEn}</h1>
            </div>

            <Paragraph className={'tour__price'}>Cost: {tour.price} тг</Paragraph>

            <hr style={{marginBottom: "24px"}}/>

            <Paragraph>{tour.descriptionEn}</Paragraph>
            <Paragraph>Country: {tour.country}</Paragraph>


        </div>
    );

    else if (lang === "kz") return (
        <div className={"tour"}>
            <div className="tour__header">
                <img src={`${Config.serverAdress}${tour.previewPhotoPath}`} alt="" className="tour__header-image"/>
                <h1 className={"tour__header-text"}>{tour.titleKz}</h1>
            </div>

            <Paragraph className={'tour__price'}>Бағасы: {tour.price} тг</Paragraph>

            <hr style={{marginBottom: "24px"}}/>

            <Paragraph>{tour.descriptionKz}</Paragraph>
            <Paragraph>Country: {tour.country}</Paragraph>


        </div>
    );

    else if (lang === "ru") return (
        <div className={"tour"}>
            <div className="tour__header">
                <img src={`${Config.serverAdress}${tour.previewPhotoPath}`} alt="" className="tour__header-image"/>
                <h1 className={"tour__header-text"}>{tour.titleRu}</h1>
            </div>

            <Paragraph className={'tour__price'}>Цена: {tour.price} тг</Paragraph>

            <hr style={{marginBottom: "24px"}}/>

            <Paragraph>{tour.descriptionRu}</Paragraph>
            <Paragraph>Country: {tour.country}</Paragraph>


        </div>
    );
    else return <></>
};

export default Page;