"use client";

import {Config} from "@/config";
import axios from "axios";

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
/*

    let descEn, descRu;
    let daysEn, daysRu;


    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'e2afaae72cmshd5dd1c01ceca873p10b2b2jsnf0c659bfff28',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: {}
    };

    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', tourRequest.descriptionKz);
        encodedParams.set('target', 'en');
        encodedParams.set('source', 'kk');
        options.data = encodedParams;

        const response1 = await axios.request(options);
        descEn = response1.data.data.translations[0].translatedText;

        const encodedParams2 = new URLSearchParams();
        encodedParams.set('q', tourRequest.descriptionKz);
        encodedParams.set('target', 'ru');
        encodedParams.set('source', 'kk');
        options.data = encodedParams2;

        const response2 = await axios.request(options);
        descRu = response2.data.data.translations[0].translatedText;

        const encodedParams3 = new URLSearchParams();
        encodedParams.set('q', tourRequest.daysKz);
        encodedParams.set('target', 'en');
        encodedParams.set('source', 'kk');
        options.data = encodedParams3;

        const response3 = await axios.request(options);
        daysEn = response3.data.data.translations[0].translatedText;

        const encodedParams4 = new URLSearchParams();
        encodedParams.set('q', tourRequest.daysKz);
        encodedParams.set('target', 'ru');
        encodedParams.set('source', 'kk');
        options.data = encodedParams2;

        const response4 = await axios.request(options);
        daysRu = response4.data.data.translations[0].translatedText;

    } catch (error) {
        console.log("BREDDD")
        console.error(error);
    }

    tourRequest.daysRu = daysRu;
    tourRequest.daysEn = daysEn;
    tourRequest.descriptionRu = descRu;
    tourRequest.descriptionEn = descEn;
*/


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
