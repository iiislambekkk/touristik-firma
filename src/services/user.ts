"use client";

import {Config} from "@/config";
import axios from "axios";

export interface UserRequest {
    text: string;
    date: string;
    entityId: string;
    userId: string;
    parentId: string;
}


export const getUserInformation = async (id: string) => {
    let res = await axios.get(`${Config.serverAdress}api/user/${id}`, {
        headers: {
            'accept': 'application/json',
        }
    });

    return res.data;
}

export const getCurrentUser = async () => {
    try {
        let res = await axios.get(`${Config.serverAdress}api/user/userinfo`, {
            headers: {
                'accept': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        return res.data;
    }

    catch(e) {
        return "Error";
    }
}