"use client";

import {TourRequest, uploadTourImg} from "@/src/services/tours";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

interface Props {
    mode: Mode;
    values: Tour;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: TourRequest) => void;
    handleUpdate: (id: string, request: TourRequest) => void;
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
      handleUpdate
    } : Props) => {

    const [titleEn, setTitleEn] = useState("");
    const [titleKz, setTitleKz] = useState("");
    const [titleRu, setTitleRu] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionKz, setDescriptionKz] = useState("");
    const [descriptionRu, setDescriptionRu] = useState("");
    const [previewPhotoPath, setPreviewPhotoPath] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState(10);

    console.log(previewPhotoPath)
    const handleOnOk = async () => {
        const tourRequest = {titleEn, titleKz, titleRu, descriptionEn, descriptionKz, descriptionRu, previewPhotoPath, country, price};

        mode == Mode.Create ? handleCreate(tourRequest) : handleUpdate(values.id, tourRequest);
    }

    const uploadImg = async (file: FormData) => {
        setPreviewPhotoPath((await uploadTourImg(file)).data);
    }

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
    }, [values])

    return (
        <Modal title={mode === Mode.Create ? "Пост қосу" : "Постты редактерлеу"} open={isModalOpen} cancelText={"Отмена"}
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
                <Input
                    type={"file"}
                    onChange={(e) => {
                            let f = new FormData;
                            f.append('file', e.target.files[0])
                            uploadImg(f);
                        }
                    }
                    placeholder={"Добавьте фото"}
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
                <Input
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder={"Құны"}
                />
            </div>
        </Modal>
    );
};

export default CreateUpdateTour;