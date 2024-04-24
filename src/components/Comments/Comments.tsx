import React, {useEffect, useState} from 'react';
import styles from './Comments.module.css';
import Commentary from "@/src/components/Comments/Commentary";
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {CommentRequest, createComment} from "@/src/services/comments";

interface Props {
    comments: Comments[];
    lang: string;
    entityId: string;
    deleteCommentary: (id: string) => void;
    getCommentaries: (id: string) => void;
    tourid: string;
}

const Comments = ({lang, comments, entityId, deleteCommentary, getCommentaries, tourid}: Props) => {

    const [structuredComms, setStructuredComms] = useState([] as Comments[]);

    function structureComments(comments: Comments[]) {
        const commentMap: { [id: string]: Comments } = {};
        const rootComments: Comments[] = [];

        comments.forEach(comment => {
            commentMap[comment.id] = { ...comment, replies: [] };
        });


        comments.forEach(comment => {
            if (comment.parentId !== '00000000-0000-0000-0000-000000000000' && commentMap[comment.parentId]) {
                const parentComment = commentMap[comment.parentId];
                parentComment.replies.push(commentMap[comment.id]);
            } else {
                rootComments.push(commentMap[comment.id]);
            }
        });

        return rootComments;
    }

    useEffect(() => {
        if (comments.length == 0) return;
        setStructuredComms(structureComments(comments));

    }, [comments])


    return (
    <div className={styles.comments}>
        {structuredComms.map((comment : Comments, index: number) => (
            <Commentary tourid={tourid} getCommentaries={getCommentaries} deleteCommentary={deleteCommentary} key={lang + comment.id} comment={comment} lang={lang}/>
        ))}
    </div>
    )
};

export default Comments;