"use client"

import React, {useEffect, useState} from 'react';
import {getOneTour, getTourPhotos, uploadTourImg} from "@/src/services/tours";
import {Image} from "antd";
import {Button, Carousel, Collapse, CollapseProps, message, Typography, Upload, UploadProps} from 'antd';
import {Config} from "@/config";
import './../tour.css'
import commstyles from "@/src/components/Comments/Comments.module.css";

const { Paragraph } = Typography;
import styles from "./../tours.module.css";
import Title from "antd/es/typography/Title";
import Comments from "@/src/components/Comments/Comments";
import {CommentRequest, createComment, deleteCommentAndChildren, getAllComments} from "@/src/services/comments";
import TextArea from "antd/es/input/TextArea";
import {appStore} from "@/src/store/appStore";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import TourDates from "@/src/components/TourDates/TourDates";
import Input from "antd/es/input/Input";
import {createReservData, ReservationRequest} from "@/src/services/reservationData";
import Connector from "@/src/helpers/signalR";
import {HttpTransportType, HubConnectionBuilder} from "@microsoft/signalr";
import {UploadOutlined} from "@ant-design/icons";


const Page = observer(({params}: {params: {lang: string, tourid: string}}) => {

    const tourid = params.tourid;
    let entityId : string = tourid;

    /*const { newMessage, events } = Connector();
    const [message, setMessage] = useState("initial value");*/




    const [tour, setTour] = useState<Tour>({} as Tour);

    const [comments, setComments] = useState([] as Comments[]);
    const [dateId, setDateId] = useState("");
    const [email, setEmail] = useState(appStore.user.Email);
    const [phone, setPhone] = useState("");
    const [question, setQuestion] = useState("");
    const [countOfTourists, setCountOfTourists] = useState(0);
    const [priceOfDate, setPriceOfDate] = useState(0);
    const [tourists, setTourists] = useState({} as Tourists);
    const [tourPhotos, setTourPhotos] = useState<TourPhotos[]>([])

    const lang = params.lang;


    let daysEn: Kunder = tour.daysEn != undefined ? JSON.parse(tour.daysEn) : {};
    let daysKz: Kunder = tour.daysKz != undefined ? JSON.parse(tour.daysKz) : {};
    let daysRu: Kunder = tour.daysRu != undefined ? JSON.parse(tour.daysRu) : {};

    const [newComm, setNewComm] = useState("");

    useEffect(() => {
        const getTour = async () => {
            const tour = await getOneTour(entityId);

            setTour(tour);
        }

        getTour();
        getCommentaries(entityId);
        getTourPics(entityId);
    }, [])

    async function sendNewComm() {
        const newCommRequest = {text: newComm, date: new Date().toISOString().slice(0, 10), entityId: entityId, userId: toJS(appStore.user).Id, parentId: "00000000-0000-0000-0000-000000000000"} as CommentRequest;

        await createComment(newCommRequest);
        await getCommentaries(entityId);
        setNewComm("");
    }

    async function deleteCommentary(id: string) {
        await deleteCommentAndChildren(id);
        await getCommentaries(entityId);
    }

    const getTourPics = async(id: string) => {
        const photos = await getTourPhotos(id);
        console.log(photos.data)
        setTourPhotos(photos.data);

    }

    const getCommentaries = async(id: string) => {
        const commentaries = await getAllComments(id);

        setComments(commentaries);
    }


    const sendReservationData = async () => {
        const reservRequest = {countOfTourists, email, phone, question, touristsInfo:JSON.stringify(tourists), entityId, dateId, userId: appStore.user.Id} as ReservationRequest;

        await createReservData(reservRequest);
        setTourists({} as Tourists)
        setPhone("")
        setEmail("")
        setCountOfTourists(0)
        setQuestion("")

        await appStore.connection.invoke("SendNotification");
    }


    const itemsKz: CollapseProps['items'] = [
    ];
    const itemsEn: CollapseProps['items'] = [
    ];
    const itemsRu: CollapseProps['items'] = [
    ];
    const touristsItems: CollapseProps['items'] = [
    ];

    for (let i=1; i<=countOfTourists; i++) {

        touristsItems.push({
            key: `${i}`,
            label: `Турист ${i}:`,
            children: (
                <div className={styles.inputs}>
                    <Input
                        value={tourists[i]?.fio ? tourists[i].fio : ""}
                        onChange={(e) => {
                            if (tourists[i] == undefined) {
                                setTourists({...tourists, [i]: {
                                        fio: "",
                                        birthDate: "",
                                        numOfPassport: "",
                                        dateOfPassport: "",
                                        pol: ""
                                    }} as Tourists)
                            }
                            setTourists({...tourists, [i]: {...tourists[i], fio: e.target.value}} as Tourists)


                        }}
                        placeholder={"ФИО жаз "}
                    />
                    <Input
                        value={tourists[i]?.birthDate ? tourists[i].birthDate : ""}
                        onChange={(e) => {
                            if (tourists[i] == undefined) {
                                setTourists({...tourists, [i]: {
                                        fio: "",
                                        birthDate: "",
                                        numOfPassport: "",
                                        dateOfPassport: "",
                                        pol: ""
                                    }} as Tourists)
                            }
                            setTourists({...tourists, [i]: {...tourists[i], birthDate: e.target.value}} as Tourists)


                        }}
                        placeholder={"birthDate жаз "}
                    />
                    <Input
                        value={tourists[i]?.numOfPassport ? tourists[i].numOfPassport : ""}
                        onChange={(e) => {
                            if (tourists[i] == undefined) {
                                setTourists({...tourists, [i]: {
                                        fio: "",
                                        birthDate: "",
                                        numOfPassport: "",
                                        dateOfPassport: "",
                                        pol: ""
                                    }} as Tourists)
                            }
                            setTourists({...tourists, [i]: {...tourists[i], numOfPassport: e.target.value}} as Tourists)


                        }}
                        placeholder={"ФИО жаз "}
                    />
                    <Input
                        value={tourists[i]?.dateOfPassport ? tourists[i].dateOfPassport : ""}
                        onChange={(e) => {
                            if (tourists[i] == undefined) {
                                setTourists({...tourists, [i]: {
                                        fio: "",
                                        birthDate: "",
                                        numOfPassport: "",
                                        dateOfPassport: "",
                                        pol: ""
                                    }} as Tourists)
                            }
                            setTourists({...tourists, [i]: {...tourists[i], dateOfPassport: e.target.value}} as Tourists)


                        }}
                        placeholder={"dateOfPassport жаз "}
                    />
                    <Input
                        value={tourists[i]?.pol ? tourists[i].pol : ""}
                        onChange={(e) => {
                            if (tourists[i] == undefined) {
                                setTourists({...tourists, [i]: {
                                        fio: "",
                                        birthDate: "",
                                        numOfPassport: "",
                                        dateOfPassport: "",
                                        pol: ""
                                    }} as Tourists)
                            }
                            setTourists({...tourists, [i]: {...tourists[i], pol: e.target.value}} as Tourists)


                        }}
                        placeholder={"pol жаз "}
                    />
                </div>
            ),
        })
    }


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
                    <Title>{daysEn[i].header}</Title>
                    <Typography>{daysEn[i].description}</Typography>
                </div>
            ),
        })

        itemsRu.push({
            key: `${i}`,
            label: `День ${i}`,
            children: (
                <div className={styles.days}>
                    <Title>{daysRu[i].header}</Title>
                    <Typography>{daysRu[i].description}</Typography>
                </div>
            ),
        })
    }



    const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let fd = new FormData()
        let fileList = e.target.files;
        let file: File = {} as File;
        if (fileList != null) {
            file = fileList[0];
        }

        fd.set("file", file)
        fd.set("entityId", entityId)
        fd.set("photoAlt", "Bred Pitt")

        let res = await uploadTourImg(fd);
        console.log(res)
    }


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

            {appStore.isAdmin ? <input type={"file"} onChange={(e) => uploadImg(e)} placeholder={"Upload file"}></input> : <></>}

            <Carousel autoplay>
                {tourPhotos.map((photo, index) =>

                    <div key={index + lang} className="tour__header">
                        <Image style={{}} src={`${Config.serverAdress}${photo.photoPath}`} width={1980} height={726} alt="" />
                    </div>


                )}
            </Carousel>

            <h2 style={{fontSize: "48px"}}>Reviews</h2>

            <div className={commstyles.commentary__write}>
                <TextArea value={newComm} onChange={(e) => setNewComm(e.target.value)} placeholder={"Write your opinion"} rows={3}></TextArea>
                <div className={commstyles.controls + " " + commstyles.sendComm}>
                    <Button onClick={sendNewComm}>Отправить</Button>
                </div>
            </div>



            {comments.length == 0 ?  <p>There are no reviews yet...</p> :
                <Comments tourid={tourid} getCommentaries={getCommentaries} deleteCommentary={deleteCommentary}  entityId={entityId} lang={lang} comments={comments}/>

            }



            <p style={{fontSize: "48px", marginBottom: "12px"}}>Num of Tourists:</p>
            <Input value={countOfTourists} onChange={(e) => setCountOfTourists(Number(e.target.value))}></Input>

            <p style={{fontSize: "48px", marginBottom: "12px"}}>Dates:</p>

            <TourDates dateId={dateId} setPriceOfDate={setPriceOfDate} setDateId={setDateId} entityId={entityId}></TourDates>

            <p style={{fontSize: "48px", marginBottom: "12px"}}>Total Cost: {countOfTourists * priceOfDate} ₸</p>
            <p style={{fontSize: "36px", marginBottom: "12px"}}>Reservation: </p>

            <Title level={3} style={{marginBottom: "0px"}}>Contact information</Title>
            <Typography>Be sure to fill it out so that we can send you all the necessary documents.</Typography>

            <div className={styles.inputs}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Write email"}></Input>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={"Write phone number"}></Input>
                <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={"Write your questions"}></Input>
            </div>

            <Title level={3} style={{marginBottom: "0px", marginTop: "12px"}}>Information about tourists</Title>
            <Typography>If the documents are at hand, you can immediately fill out information about tourists. This can be done later.</Typography>

            <Collapse accordion={true} items={touristsItems}></Collapse>

            <Button style={{marginTop: "8px"}} onClick={sendReservationData}>Send Reservation Info</Button>
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

            {appStore.isAdmin ? <input type={"file"} onChange={(e) => uploadImg(e)} placeholder={"Upload file"}></input> : <></>}

            <Carousel autoplay>
                {tourPhotos.map((photo, index) =>
                    <div  key={index + lang} className="tour__header" style={{maxWidth: "1080px", display: "flex", justifyContent: "center", maxHeight: "726px"}}>
                        <Image style={{}} src={`${Config.serverAdress}${photo.photoPath}`} width={1980} height={726} alt="" />
                    </div>
                )}
            </Carousel>

            <h2 style={{fontSize: "48px"}}>Пікірлер</h2>
            <div className={commstyles.commentary__write}>
                <TextArea value={newComm} onChange={(e) => setNewComm(e.target.value)} placeholder={"Ойынызбен бөлісініз"} rows={3}></TextArea>
                <div className={commstyles.controls + " " + commstyles.sendComm}>
                    <Button onClick={sendNewComm}>Жіберу</Button>
                </div>
            </div>


            {comments.length == 0 ?  <p>Әлі пікірлер жоқ...</p> :
                <Comments  tourid={tourid} getCommentaries={getCommentaries} deleteCommentary={deleteCommentary}  entityId={entityId} lang={lang} comments={comments}/>
            }

            <p style={{fontSize: "48px", marginBottom: "12px"}}>Турист саны:</p>
            <Input value={countOfTourists} onChange={(e) => setCountOfTourists(Number(e.target.value))}></Input>

            <p style={{fontSize: "48px"}}>Даталар:</p>
            <TourDates dateId={dateId} setPriceOfDate={setPriceOfDate} setDateId={setDateId} entityId={entityId}></TourDates>


            <p style={{fontSize: "48px", marginBottom: "12px"}}>Толық баға: {countOfTourists * priceOfDate} ₸</p>
            <p style={{fontSize: "36px", marginBottom: "12px"}}>Турға тапсырыс беру: </p>

            <Title level={3} style={{marginBottom: "0px"}}>Байланыс ақпараты</Title>
            <Typography>Сізге барлық қажетті құжаттарды жіберу үшін міндетті түрде толтырыңыз.</Typography>

            <div className={styles.inputs}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Write email"}></Input>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={"Write phone number"}></Input>
                <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={"Write your questions"}></Input>
            </div>

            <Title level={3} style={{marginBottom: "0px", marginTop: "12px"}}>Туристер туралы ақпарат</Title>
            <Typography>Егер құжаттар қолыңызда болса, туристер туралы ақпаратты бірден толтыра аласыз. Мұны кейінірек жасауға болады.</Typography>

            <Collapse accordion={true} items={touristsItems}></Collapse>

            <Button style={{marginTop: "8px"}} onClick={sendReservationData}>Өтінішті жіберу</Button>
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

            {appStore.isAdmin ? <input type={"file"} onChange={(e) => uploadImg(e)} placeholder={"Upload file"}></input> : <></>}

            <Carousel autoplay>
                {tourPhotos.map((photo, index) =>
                    <div  key={index + lang} className="tour__header" style={{maxWidth: "1080px", display: "flex", justifyContent: "center", maxHeight: "726px"}}>
                        <Image style={{}} src={`${Config.serverAdress}${photo.photoPath}`} width={1980} height={726} alt="" />
                    </div>
                )}
            </Carousel>

            <h2 style={{fontSize: "48px"}}>Отзывы</h2>
            <div className={commstyles.commentary__write}>
                <TextArea value={newComm} onChange={(e) => setNewComm(e.target.value)} placeholder={"Поделитесь мнением"} rows={3}></TextArea>
                <div className={commstyles.controls + " " + commstyles.sendComm}>
                    <Button onClick={sendNewComm}>Отправить</Button>
                </div>
            </div>


            {comments.length == 0 ?  <p>На этот тур пока нет отзывов...</p> :
                <Comments tourid={tourid} getCommentaries={getCommentaries} deleteCommentary={deleteCommentary}  entityId={entityId} lang={lang} comments={comments}/>
            }

            <p style={{fontSize: "48px", marginBottom: "12px"}}>Количество туристов:</p>
            <Input value={countOfTourists} onChange={(e) => setCountOfTourists(Number(e.target.value))}></Input>

            <p style={{fontSize: "48px"}}>Даты:</p>
            <TourDates dateId={dateId} setPriceOfDate={setPriceOfDate} setDateId={setDateId} entityId={entityId}></TourDates>


            <p style={{fontSize: "48px", marginBottom: "12px"}}>Цена: {countOfTourists * priceOfDate} ₸</p>
            <p style={{fontSize: "36px", marginBottom: "12px"}}>Бронирование тура: </p>

            <Title level={3} style={{marginBottom: "0px"}}>Контактная информация</Title>
            <Typography>Обязательно заполните, чтобы мы отправили вам все необходимые документы.</Typography>

            <div className={styles.inputs}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Write email"}></Input>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={"Write phone number"}></Input>
                <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={"Write your questions"}></Input>
            </div>

            <Title level={3} style={{marginBottom: "0px", marginTop: "12px"}}>Информация о туристах</Title>
            <Typography>Если документы под рукой, можете сразу заполнить информацию о туристах. Это можно сделать и позже.</Typography>

            <Collapse accordion={true} items={touristsItems}></Collapse>

            <Button style={{marginTop: "8px"}} onClick={sendReservationData}>Отправить заявку</Button>
        </div>
    );
    else return <h1>AHAHAHAh</h1>
})

export default Page;