import axios from "axios";
import {Config} from "@/config";
import {CommentRequest} from "@/src/services/comments";

export interface ReservationRequest {
    countOfTourists: number;
    email: string;
    phone: string;
    question: string;
    touristsInfo: string;
    entityId: string;
    dateId: string;
    userId: string;
}


export const getAllReservData = async () => {
    let res = await axios.get(`${Config.serverAdress}api/ReservationData`, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const createReservData = async (reservRequest: ReservationRequest) => {
    let res = await axios.post(`${Config.serverAdress}api/ReservationData`, reservRequest,{
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}
