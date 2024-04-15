"use client"

import React, {useEffect, useState} from 'react';
import {getOneTour} from "@/src/services/tours";
import {Button, Collapse, CollapseProps, Typography} from 'antd';
import {Config} from "@/config";
import './tour.css'
import commstyles from "@/src/components/Comments/Comments.module.css";

const { Text, Paragraph } = Typography;
import styles from "./tours.module.css";
import Title from "antd/es/typography/Title";
import Comments from "@/src/components/Comments/Comments";
import {CommentRequest, createComment, deleteCommentAndChildren, getAllComments} from "@/src/services/comments";
import TextArea from "antd/es/input/TextArea";
import {appStore} from "@/src/store/appStore";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";


const Page = observer(({params}: {params: {lang: string}}) => {

    const [tour, setTour] = useState<Tour>({} as Tour);
    const [entityId, setEntityId] = useState("");
    const [comments, setComments] = useState([] as Comments[]);
    const lang = params.lang;

    let daysEn: Kunder = tour.daysEn != undefined ? JSON.parse(tour.daysEn) : {};
    let daysKz: Kunder = tour.daysKz != undefined ? JSON.parse(tour.daysKz) : {};
    let daysRu: Kunder = tour.daysRu != undefined ? JSON.parse(tour.daysRu) : {};

    const [newComm, setNewComm] = useState("");

    async function sendNewComm() {
        const newCommRequest = {text: newComm, date: new Date().toISOString().slice(0, 10), entityId: entityId, userId: toJS(appStore.user).id, parentId: "00000000-0000-0000-0000-000000000000"} as CommentRequest;

        await createComment(newCommRequest);
        await getCommentaries(entityId);
    }

    async function deleteCommentary(id: string) {
        await deleteCommentAndChildren(id);
        await getCommentaries(entityId);
    }


    const itemsKz: CollapseProps['items'] = [
    ];
    const itemsEn: CollapseProps['items'] = [
    ];
    const itemsRu: CollapseProps['items'] = [
    ];

    for (let i=1; i<= tour.numOfDays; i++) {

        itemsKz.push({
            key: `${i}`,
            label: `Күн ${i}`,
            children: (
                <div className={styles.days}>
                    <Title>{daysKz[i].header}</Title>
                    <Typography>{daysKz[i].description}</Typography>
                </div>
            ),
        })

        itemsEn.push({
            key: `${i}`,
            label: `Day ${i}`,
            children: (
                <div className={styles.days}>
                    <Title>{daysKz[i].header}</Title>
                    <Typography>{daysKz[i].description}</Typography>
                </div>
            ),
        })

        itemsRu.push({
            key: `${i}`,
            label: `День ${i}`,
            children: (
                <div className={styles.days}>
                    <Title>{daysKz[i].header}</Title>
                    <Typography>{daysKz[i].description}</Typography>
                </div>
            ),
        })
    }

    const getCommentaries = async(id: string) => {
        const commentaries = await getAllComments(id);

        setComments(commentaries);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (typeof id == "string") setEntityId(id);

        if (id == null) {
            return;
        }

        const getTour = async () => {
            const tour = await getOneTour(id);

            setTour(tour);
        }

        getTour();
        getCommentaries(id);
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

            <Collapse accordion={true} items={itemsEn}></Collapse>

            <div className={commstyles.commentary__write}>
                <TextArea value={newComm} onChange={(e) => setNewComm(e.target.value)} placeholder={"Write your opinion"} rows={3}></TextArea>
                <div className={commstyles.controls + " " + commstyles.sendComm}>
                    <Button onClick={sendNewComm}>Отправить</Button>
                </div>
            </div>

            <Comments deleteCommentary={deleteCommentary}  entityId={entityId} lang={lang} comments={comments}/>
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

            <Collapse accordion={true} items={itemsKz}></Collapse>

            <div className={commstyles.commentary__write}>
                <TextArea value={newComm} onChange={(e) => setNewComm(e.target.value)} placeholder={"Ойынызбен бөлісініз"} rows={3}></TextArea>
                <div className={commstyles.controls + " " + commstyles.sendComm}>
                    <Button onClick={sendNewComm}>Отправить</Button>
                </div>
            </div>

            <Comments deleteCommentary={deleteCommentary} entityId={entityId}  lang={lang} comments={comments}/>

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

            <Collapse accordion={true} items={itemsRu}></Collapse>

            <div className={commstyles.commentary__write}>
                <TextArea value={newComm} onChange={(e) => setNewComm(e.target.value)} placeholder={"Поделитесь мнением"} rows={3}></TextArea>
                <div className={commstyles.controls + " " + commstyles.sendComm}>
                    <Button onClick={sendNewComm}>Отправить</Button>
                </div>
            </div>

            <Comments deleteCommentary={deleteCommentary}  entityId={entityId}  lang={lang} comments={comments}/>
        </div>
    );
    else return <></>
})

export default Page;