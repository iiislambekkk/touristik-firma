"use client";

import {Config} from "@/config";
import axios from "axios";

export interface CommentRequest {
    text: string;
    date: string;
    entityId: string;
    userId: string;
    parentId: string;
}


export const getAllComments = async (entityId: string) => {
    let res = await axios.get(`${Config.serverAdress}api/comments/${entityId}`, {
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const createComment = async (commentRequest: CommentRequest) => {
    let res = await axios.post(`${Config.serverAdress}api/comments/`, commentRequest,{
        headers: {
            'accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const updateComment = async (id: string, commentRequest: CommentRequest) => {

    let res = await axios.put(`${Config.serverAdress}api/comments/${id}`, JSON.stringify(commentRequest), {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const deleteComment = async (id: string, commentRequest: CommentRequest) => {
    let res = await axios.put(`${Config.serverAdress}api/comments/deleteOne/${id}`, JSON.stringify(commentRequest), {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

export const deleteCommentAndChildren = async (id: string) => {
    let res = await axios.delete(`${Config.serverAdress}api/comments/${id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    });

    return res.data;
}

