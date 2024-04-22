import {Config} from "@/config";
import axios from "axios";


export interface DateRequest {
    startDate: string;
    endDate: string;
    entityId: string;
    price: number;
}

export const getAllDates = async (entityId: string) => {
    try {
        let res = await axios.get(`${Config.serverAdress}api/tourdates/${entityId}`, {
            headers: {
                'accept': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });

        return res.data;
    }
    catch(e) {

        console.log(e)
        return "Error";
    }



}

export const getDateById = async (entityId: string) => {

    let res = await axios.get(`${Config.serverAdress}api/tourdates/getbyid/${entityId}`, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const createDate = async (dateRequest: DateRequest) => {
    let res = await axios.post(`${Config.serverAdress}api/tourdates`, dateRequest,{
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const deleteDate = async (id: string) => {

    let res = await axios.delete(`${Config.serverAdress}api/tourdates/${id}`, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}