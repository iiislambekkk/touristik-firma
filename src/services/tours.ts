"use client";

import {Config} from "@/config";
import axios from "axios";

export interface TourRequest {
    titleEn: string;
    titleKz: string;
    titleRu: string;
    descriptionEn: string;
    descriptionKz: string;
    descriptionRu: string;
    price: number;
    previewPhotoPath: string;
    country: string;
}

export const getOneTour = async (id: string) => {
    const response = await fetch(`${Config.serverAdress}api/tours/${id}`);

    return response.json();
}


export const getAllTours = async () => {
    const response = await fetch(`${Config.serverAdress}api/tours`);

    return response.json();
}

export const createTour = async (tourRequest: TourRequest) => {
    await fetch(`${Config.serverAdress}api/tours`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(tourRequest),
    });
}

export const updateTour = async (id: string, tourRequest: TourRequest) => {
    await fetch(`${Config.serverAdress}api/tours/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(tourRequest),
    });
}

export const deleteTour = async (id: string) => {
    await fetch(`${Config.serverAdress}api/tours/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
    });
}

export const uploadTourImg = async (f: FormData) => {

    let res = await axios.post(`${Config.serverAdress}api/tours/uploadImage`, f, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type': `text/plain; charset=utf-8;`,
        }
    })

    return res;
}