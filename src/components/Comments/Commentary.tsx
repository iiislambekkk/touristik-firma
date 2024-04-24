import React, {useEffect, useState} from 'react';
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {Button, Typography} from "antd";
import styles from './Comments.module.css';
import {getUserInformation} from "@/src/services/user";
import {Config} from "@/config";
import {appStore} from "@/src/store/appStore";
import * as dictionary from "./commentaryDict.json"
import {toJS} from "mobx";
import {CommentRequest, createComment, deleteComment, updateComment} from "@/src/services/comments";
import commstyles from "@/src/components/Comments/Comments.module.css";
import TextArea from "antd/es/input/TextArea";

interface Props {
    comment: Comments,
    lang: string,
    deleteCommentary: (id: string) => void;
    getCommentaries: (id: string) => void;
    tourid: string;
}



const Commentary = ({lang, comment, deleteCommentary, getCommentaries, tourid}: Props) => {


    const [user, setUser] = useState({} as User);
    let [role, setRole] = useState("");
    const [isReplyActive, setIsReplyActive] = useState(false);
    const [isChangeActive, setIsChangeActive] = useState(false);
    const [reply, setReply] = useState("");
    const [changeText, setChangeText] = useState(comment.text);
    let dict: Dictionary = dictionary;


    const replyComm = async (parentId: string) => {

        const newCommRequest = {text: reply, date: new Date().toISOString().slice(0, 10), entityId: tourid, userId: appStore.userId, parentId} as CommentRequest;
        await createComment(newCommRequest);

        getCommentaries(tourid);

        setIsReplyActive(false);
        setReply("");
        await appStore.connection.invoke("RefreshComments")

    }

    const deleteOneCommentary = async (id: string)=> {
        await deleteComment(id)
        getCommentaries(tourid);
    }

    const changeComm = async (userId: string) => {


        const newCommRequest = {text: changeText, date: comment.date, entityId: comment.entityId, userId: comment.userId, parentId: comment.parentId} as CommentRequest;
        await updateComment(comment.id, newCommRequest);
        getCommentaries(tourid);

        setIsChangeActive(false);
        await appStore.connection.invoke("RefreshComments")

    }

    useEffect(() => {

        const fetchUserInformation = async () => {

            let user = await getUserInformation(comment.userId) as User;
            setUser(user);
            setReply("" + user.userName + ", ");

        }

        if (localStorage.getItem("role") == "Admin") {
            setRole("Admin")
        }

        fetchUserInformation()
    }, []);


    return (
    <>
        <div className={styles.commentBlock}>

            <div className={styles.avatar} style={{backgroundImage: `url('${Config.serverAdress}/avatars/${user.avatarPath}')`}}></div>
            <div className={styles.comment}>
                <div className={styles.commentHeader}>
                    <Typography>{user.userName}</Typography>
                    <Typography className={styles.commentDate}>{comment.date}</Typography>
                </div>

                <Typography>{comment.text}</Typography>

                <div className={styles.controls}>
                    <Button onClick={() => setIsReplyActive(!isReplyActive)}>{dict[lang].reply}</Button>
                    <Button onClick={() => setIsChangeActive(!isChangeActive)}>{dict[lang].change}</Button>
                    {role === "Admin" ? <Button onClick={() => deleteCommentary(comment.id)} danger>{dict[lang].deleteVetku}</Button> : <></>}
                    {role === "Admin" || toJS(appStore.user).Id === comment.userId ? <Button onClick={() => deleteOneCommentary(comment.id)} danger>{dict[lang].delete}</Button> : <></>}
                </div>
                {isReplyActive ? <div className={commstyles.commentary__write}>
                    <TextArea value={reply} onChange={(e) => setReply(e.target.value)} placeholder={"Write your opinion"} rows={3}></TextArea>
                    <div className={commstyles.controls + " " + commstyles.sendComm}>
                        <Button type={"primary"} onClick={() => replyComm(comment.id)}>{dict[lang].send}</Button>
                        <Button danger onClick={() => setIsReplyActive(false)}>{dict[lang].stop}</Button>
                    </div>
                </div> : <></>}
                {isChangeActive ? <div className={commstyles.commentary__write}>
                    <TextArea value={changeText} onChange={(e) => setChangeText(e.target.value)} placeholder={"Write your opinion"} rows={3}></TextArea>
                    <div className={commstyles.controls + " " + commstyles.sendComm}>
                        <Button type={"primary"} onClick={() => changeComm(comment.id)}>{dict[lang].change}</Button>
                        <Button danger onClick={() => setIsChangeActive(false)}>{dict[lang].stop}</Button>
                    </div>
                </div> : <></>}
            </div>
        </div>

        {comment.replies && comment.replies.map((reply, index) => (
            <div  key={index + lang + comment.id} style={{width: "96%", marginLeft: "4%"}}>
                <Commentary tourid={tourid} getCommentaries={getCommentaries} deleteCommentary={deleteCommentary} lang={lang} comment={reply} />
            </div>
        ))}
    </>
    );
};

export default Commentary;