import React, {useEffect, useState} from 'react';
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {Button, Typography} from "antd";
import styles from './Comments.module.css';
import {getUserInformation} from "@/src/services/user";
import {Config} from "@/config";
import {appStore} from "@/src/store/appStore";
import * as dictionary from "./commentaryDict.json"

interface Props {
    comment: Comments,
    lang: string,
    deleteCommentary: (id: string) => void;
}



const Commentary = ({lang, comment, deleteCommentary}: Props) => {

    const [user, setUser] = useState({} as User);
    let [role, setRole] = useState("");
    let dict: Dictionary = dictionary;

    useEffect(() => {

        const fetchUserInformation = async () => {
            let user = await getUserInformation(comment.userId) as User;
            setUser(user);
            console.log(user)
        }

        if (localStorage.getItem("role") == "Admin") {
            setRole("Admin")
        }

        fetchUserInformation()
    }, []);

    return (
    <>
        <div className={styles.commentBlock}>

            <div className={styles.avatar} style={{backgroundImage: `url('${Config.serverAdress}avatars/${user.id}.png')`}}></div>
            <div className={styles.comment}>
                <div className={styles.commentHeader}>
                    <Typography>{user.userName}</Typography>
                    <Typography className={styles.commentDate}>{comment.date}</Typography>
                </div>

                <Typography>{comment.text}</Typography>

                <div className={styles.controls}>
                    <Button>{dict[lang].reply}</Button>
                    <Button>{dict[lang].change}</Button>
                    {role === "Admin" || localStorage.getItem("userId") === comment.userId ? <Button onClick={() => deleteCommentary(comment.id)} danger>{dict[lang].delete}</Button> : <></>}
                </div>

            </div>
        </div>

        {comment.replies && comment.replies.map((reply, index) => (
            <div  key={index} style={{width: "98%", marginLeft: "2%"}}>
                <Commentary deleteCommentary={deleteCommentary} lang={lang} comment={reply} />
            </div>
        ))}
    </>
    );
};

export default Commentary;