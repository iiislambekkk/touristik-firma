"use client";

import Button from "antd/es/button/button";
import {useEffect, useState} from "react";
import {TourRequest, createTour, deleteTour, getAllTours, updateTour} from "@/src/services/tours";
import Tours from "@/src/components/Tours";
import Title from "antd/es/typography/Title";
import CreateUpdateTour, {Mode} from "@/src/components/CreateUpdateTour/CreateUpdateTour";
import Loader from "@/src/components/Loader/Loader";
import {appStore} from "@/src/store/appStore";

const ToursPage = ({params}: {params: {lang: string}}) => {
    const defaultValues = {
        title: "",
        titleEn: "",
        titleKz: "",
        titleRu: "",
        descriptionEn: "",
        descriptionKz: "",
        descriptionRu: "",
        price: 0,
        previewPhotoPath: "",
        country: "",
    } as unknown as Tour;

    const lang = params.lang;


    const [values, setValues] = useState<Tour>(defaultValues);

    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    const handleCreateTour = async (request: TourRequest) => {

        await createTour(request);
        closeModal();


        const tours = await getAllTours();
        setTours(tours);
    }

    const handleUpdateTour = async (id: string, request: TourRequest) => {
        await updateTour(id, request);
        closeModal();

        const tours = await getAllTours();
        setTours(tours);
    }

    const handleDeleteTour = async (id: string) => {
        await deleteTour(id);

        const tours = await getAllTours();
        setTours(tours);
    }

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setValues(defaultValues);
    }

    const openEditModal = (tour: Tour) => {
        setMode(Mode.Edit);
        setValues(tour);
        setIsModalOpen(true);
    }

    useEffect(() => {
        const getTours = async () => {
            const tours = await getAllTours();
            setTours(tours);
            setLoading(false);
        }

        getTours();



    }, [])

    return (
        <div>
            { appStore.isAdmin ? <Button
                    style={{marginTop: "20px"}}
                    onClick={openModal}
                >
                {lang == "en" ? "Add Tour" : lang == "kz" ? "Тур қосу" : "Добавить тур"}
                </Button> : <></>}


            <CreateUpdateTour
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleUpdate={handleUpdateTour}
                handleCreate={handleCreateTour}
                handleCancel={closeModal}
                lang={lang}
            />

            {loading ?<Loader imgUrl={"/bredPitt.jpeg"} message={"Don't сасқалақтау. Загружаю"}/> : <Tours lang={lang} tours={tours}
                                                          handleOpen={openEditModal} handleDelete={handleDeleteTour}

            />}
        </div>
    );
};

export default ToursPage;