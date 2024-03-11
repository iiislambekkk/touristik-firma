"use client";

import {PostRequest} from "@/src/services/posts";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

interface Props {
    mode: Mode;
    values: Post;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: PostRequest) => void;
    handleUpdate: (id: string, request: PostRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

const CreateUpdateBook = (
    {
      mode,
      values,
      isModalOpen,
      handleCancel,
      handleCreate,
      handleUpdate
    } : Props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(10);

    const handleOnOk = async () => {
        const bookRequest = {title, description, price};

        mode == Mode.Create ? handleCreate(bookRequest) : handleUpdate(values.id, bookRequest);
    }

    useEffect(() => {
        setTitle(values.title)
        setDescription(values.description)
        setPrice(values.price)
    }, [values])

    return (
        <Modal title={mode === Mode.Create ? "Пост қосу" : "Постты редактерлеу"} open={isModalOpen} cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <div className="post__modal">
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        console.log(e.target.value)
                    }
                    }
                    placeholder={"Аты"}
                />
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoSize={{minRows: 3, maxRows: 3}}
                    placeholder={"Мәтін"}
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

export default CreateUpdateBook;