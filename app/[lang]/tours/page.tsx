"use client";

import Button from "antd/es/button/button";
import {useEffect, useState} from "react";
import {TourRequest, createTour, deleteTour, getAllTours, updateTour} from "@/src/services/tours";
import Tours from "@/src/components/Tours";
import Title from "antd/es/typography/Title";
import CreateUpdateTour, {Mode} from "@/src/components/CreateUpdateTour";
import Loader from "@/src/components/Loader/Loader";

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
    const [role, setRole] = useState('')

    const handleCreateTour = async (request: TourRequest) => {
        console.log(request)
        await createTour(request);
        closeModal();
        console.log('asd');

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


        if (localStorage.getItem("role") == "Admin") {
            setRole("Admin")
        }


    }, [])

    return (
        <div>
            { role === "Admin" ? <Button
                    style={{marginTop: "20px"}}
                    onClick={openModal}
                >
                    Пост қосу
                </Button> : <></>}


            <CreateUpdateTour
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleUpdate={handleUpdateTour}
                handleCreate={handleCreateTour}
                handleCancel={closeModal}
            />

            {loading ?<Loader imgUrl={"/bredPitt.jpeg"} message={"Don't сасқалақтау. Загружаю"}/> : <Tours lang={lang} tours={tours}
                                                          handleOpen={openEditModal} handleDelete={handleDeleteTour}

            />}
        </div>
    );
};

export default ToursPage;