"use client";

import {Config} from "@/config";
import axios from "axios";
import translate from "google-translate-api-x";

/*interface day {
    [key: number]: {
        header: string;
        description: string;
    }
}*/

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
    daysKz: string;
    daysEn: string;
    daysRu: string;
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

    let res = await axios.put(`${Config.serverAdress}api/tours/${id}`, JSON.stringify(tourRequest), {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    })

    return res;
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

export const getTourPhotos = async (id: string) => {
    let res = await axios.get(`${Config.serverAdress}api/tourphotos/${id}`, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type': `text/plain; charset=utf-8;`,
        }
    })

    return res;
}


export const uploadTourImg = async (f: FormData) => {
    console.log(f.get("file"));
    let res = await axios.post(`${Config.serverAdress}api/tourphotos`, f, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type': `text/plain; charset=utf-8;`,
        }
    })

    return res;
}
