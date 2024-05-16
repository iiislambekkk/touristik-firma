"use client";

import {TourRequest} from "@/src/services/tours";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {DownOutlined, UploadOutlined} from '@ant-design/icons';
import type {CollapseProps, MenuProps, UploadProps} from 'antd';
import {Button, Collapse, Dropdown, message, Pagination, Space, Upload} from 'antd';
import {Config} from "@/config";
import parse from 'html-react-parser';
import { renderToString } from 'react-dom/server';
import {ItemProps} from "antd/es/space/Item";
import styles from "./CreateUpdateTour.module.css";
import * as languages from './createUpdateDictionary.json';
import axios from "axios";


interface Props {
    mode: Mode;
    values: Tour;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: TourRequest) => void;
    handleUpdate: (id: string, request: TourRequest) => void;
    lang: string;
}

export enum Mode {
    Create,
    Edit,
}



const CreateUpdateTour = (
    {
      mode,
      values,
      isModalOpen,
      handleCancel,
      handleCreate,
      handleUpdate,
      lang,
    } : Props) => {

    let dict: Dictionary = languages;
    let dictionary = dict[lang];

    const [titleEn, setTitleEn] = useState(" ");
    const [titleKz, setTitleKz] = useState("");
    const [titleRu, setTitleRu] = useState(" ");
    const [descriptionEn, setDescriptionEn] = useState(" ");
    const [descriptionKz, setDescriptionKz] = useState("");
    const [descriptionRu, setDescriptionRu] = useState(" ");
    const [previewPhotoPath, setPreviewPhotoPath] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState(0);

    const [numOfDays, setNumOfDays] = useState(0);
    const [daysKz, setDaysKz] = useState({} as Kunder);
    const [daysRu, setDaysRu] = useState({} as Kunder);
    const [daysEn, setDaysEn] = useState({} as Kunder);


    const handleOnOk = async () => {
        
        const tourRequest = {titleEn, titleKz, titleRu, descriptionEn, descriptionKz, descriptionRu, previewPhotoPath, country, price, daysEn:JSON.stringify(daysEn), daysKz: JSON.stringify(daysRu), daysRu: JSON.stringify(daysKz), numOfDays};


        mode == Mode.Create ? handleCreate(tourRequest) : handleUpdate(values.id, tourRequest);
    }




    const props: UploadProps = {
        name: 'file',
        action: `${Config.serverAdress}api/tours/uploadImage`,
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setPreviewPhotoPath(info.file.response)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        setTitleEn(values.titleEn)
        setTitleKz(values.titleKz)
        setTitleRu(values.titleRu)
        setDescriptionEn(values.descriptionEn)
        setDescriptionKz(values.descriptionKz)
        setDescriptionRu(values.descriptionRu)
        setPreviewPhotoPath(values.previewPhotoPath)
        setCountry(values.country)
        setPrice(values.price)
        setDaysEn(values.daysEn != undefined ? JSON.parse(values.daysEn) as Kunder : {} as Kunder)
        setDaysKz(values.daysKz != undefined ? JSON.parse(values.daysKz) as Kunder : {} as Kunder)
        setDaysRu(values.daysRu != undefined ? JSON.parse(values.daysRu) as Kunder : {} as Kunder)
        setNumOfDays(values.numOfDays)

    }, [values])

    const itemsKz: CollapseProps['items'] = [
    ];
    const itemsEn: CollapseProps['items'] = [
    ];
    const itemsRu: CollapseProps['items'] = [
    ];

    for (let i=1; i<=numOfDays; i++) {

        itemsKz.push({
            key: `${i}`,
            label: `Күн ${i}`,
            children: (
                <div className={styles.inputs}>
                    <TextArea
                        value={daysKz[i]?.header ? daysKz[i].header : ""}
                        rows={4}
                        onChange={(e) => {
                            if (daysKz[i] == undefined) {
                                setDaysKz({...daysKz, [i]: {
                                        header: "",
                                        description: ""
                                    }})
                            }
                            setDaysKz({...daysKz, [i]: {...daysKz[i], header: e.target.value}})

                            /*console.log(daysKz[i as keyof object]);*/
                        }}
                        placeholder={"Заголовок жаз "}
                    />
                    <TextArea
                        value={daysKz[i]?.description ? daysKz[i].description : ""}
                        rows={4}
                        onChange={(e) => {
                            if (daysKz[i] == undefined) {
                                setDaysKz({...daysKz, [i]: {
                                        header: "",
                                        description: ""
                                    }})
                            }
                            setDaysKz({...daysKz, [i]: {...daysKz[i], description: e.target.value}})

                            /*console.log(daysKz[i as keyof object]);*/
                        }}
                        placeholder={"Описание жазыңыз"}
                    />
                </div>
            ),
        })

        itemsEn.push({
            key: `${i}`,
            label: `Day ${i}`,
            children: (
                <div className={styles.inputs}>
                    <TextArea
                        value={daysEn[i]?.header ? daysEn[i].header : ""}
                        rows={4}
                        onChange={(e) => {
                            if (daysEn[i] == undefined) {
                                setDaysEn({...daysEn, [i]: {
                                        header: "",
                                        description: ""
                                    }})
                            }
                            setDaysEn({...daysEn, [i]: {...daysEn[i], header: e.target.value}})

                            /*console.log(daysEn[i as keyof object]);*/
                        }}
                        placeholder={"Type the title"}
                    />
                    <TextArea
                        value={daysEn[i]?.description ? daysEn[i].description : ""}
                        rows={4}
                        onChange={(e) => {
                            if (daysEn[i] == undefined) {
                                setDaysEn({...daysEn, [i]: {
                                        header: "",
                                        description: ""
                                    }})
                            }
                            setDaysEn({...daysEn, [i]: {...daysEn[i], description: e.target.value}})

                           /* console.log(daysEn[i as keyof object]);*/
                        }}
                        placeholder={"Type the Description"}
                    />
                </div>
            ),
        })

        itemsRu.push({
            key: `${i}`,
            label: `День ${i}`,
            children: (
                <div className={styles.inputs}>
                    <TextArea
                        value={daysRu[i]?.header ? daysRu[i].header : ""}
                        rows={4}
                        onChange={(e) => {
                            if (daysRu[i] == undefined) {
                                setDaysRu({...daysRu, [i]: {
                                        header: "",
                                        description: ""
                                    }})
                            }
                            setDaysRu({...daysRu, [i]: {...daysRu[i], header: e.target.value}})

                         /*   console.log(daysRu[i as keyof object]);*/
                        }}
                        placeholder={"Введите заголовок"}
                    />
                    <TextArea
                        value={daysRu[i]?.description ? daysRu[i].description : ""}
                        rows={4}
                        onChange={(e) => {
                            if (daysRu[i] == undefined) {
                                setDaysRu({...daysRu, [i]: {
                                        header: "",
                                        description: ""
                                    }})
                            }
                            setDaysRu({...daysRu, [i]: {...daysRu[i], description: e.target.value}})

                         /*   console.log(daysRu[i as keyof object]);*/
                        }}
                        placeholder={"Введите описание"}
                    />
                </div>
            ),
        })
    }

    return (
        <Modal title={mode === Mode.Create ? dictionary?.addTour : dictionary?.redactTour} open={isModalOpen} cancelText={lang == "en" ? "Cancel" : lang == "kz" ? "Доғару" : "Отмена"}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <div className="post__modal">
                <Input
                    value={titleEn}
                    onChange={(e) => {
                        setTitleEn(e.target.value)
                    }
                    }
                    placeholder={"Type the title"}
                />
                <Input
                    value={titleKz}
                    onChange={(e) => {
                        setTitleKz(e.target.value)
                    }
                    }
                    placeholder={"Тур атын енгіз"}
                />
                <Input
                    value={titleRu}
                    onChange={(e) => {
                        setTitleRu(e.target.value)
                    }
                    }
                    placeholder={"Введи название тура"}
                />
                <TextArea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    autoSize={{minRows: 3, maxRows: 3}}
                    placeholder={"Description"}
                />
                <TextArea
                    value={descriptionKz}
                    onChange={(e) => setDescriptionKz(e.target.value)}
                    autoSize={{minRows: 3, maxRows: 3}}
                    placeholder={"Мәтін"}
                />
                <TextArea
                    value={descriptionRu}
                    onChange={(e) => setDescriptionRu(e.target.value)}
                    autoSize={{minRows: 3, maxRows: 3}}
                    placeholder={"Описание"}
                />
                <Input
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value)
                    }
                    }
                    placeholder={"Елді таңданыз"}
                />
                <label htmlFor="price">
                    Бағасы
                    <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder={"Бағасы"}
                    />
                </label>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <label htmlFor="days">
                    Неше күндік тур
                    <Input
                    id="days"
                    value={numOfDays}
                    onChange={(e) => setNumOfDays(Number(e.target.value))}
                    placeholder={"Неше күндік тур"}
                />
                </label>

                <Collapse accordion={true} items={itemsKz}></Collapse>
                <Collapse accordion={true} items={itemsEn}></Collapse>
                <Collapse accordion={true} items={itemsRu}></Collapse>


            </div>
        </Modal>
    );
};

export default CreateUpdateTour;