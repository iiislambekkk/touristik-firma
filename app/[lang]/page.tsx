"use client"

import React, {useEffect} from 'react';
import {Carousel} from "antd";
import {appStore} from "@/src/store/appStore";
import {redirect} from "next/navigation";

const Page = ({ params }: {params: {lang: string}}) => {

    useEffect(() => {
        redirect(`/${params.lang}/tours`)
    }, [])

    return (
        <>
            <Carousel autoplay style={{maxWidth: "1000px", maxHeight: "300px", margin: "50px auto 0 auto"}}>
                <div>
                    <h1>1</h1>
                </div>
                <div>
                    <h1>1</h1>
                </div>
                <div>
                    <h1>1</h1>
                </div>
            </Carousel>
            
        </>
    );
};

export default Page;