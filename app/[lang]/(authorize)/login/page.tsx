"use client";

import React, {useState} from 'react';
import {AutoComplete, Form, message} from "antd";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import '../authorize.css';
import {LoginRequest, loginUser} from "@/src/services/auth";
import * as dictionary from '../authDictionary.json';
import Loader from "@/src/components/Loader/Loader";
import {appStore} from "@/src/store/appStore";

type FieldType = {
    username?: string;
    email?: string;
    password?: string;
};



const LoginPage = ({params}: {params: {lang: string}}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloading, setLoading] = useState(false);

    let dict: Dictionary = dictionary;
    const authDict = dict?.[params.lang];

    async function loginHandler() {
        setLoading(true);

        const loginRequest = {
            email: email,
            password: password,
        } as LoginRequest;

        try {
            appStore.setAuth(false);
            appStore.setUser({} as User);
            appStore.setAvatarPath("");
            localStorage.removeItem("token");
            const rez = await loginUser(loginRequest);

            if (rez.status == 200) {
                message.success("Кіру жүзеге асты!")

                let user = JSON.parse(await rez.text())

                localStorage.setItem("token", user.token);
                localStorage.setItem("role", user.role);
                localStorage.setItem("userName", user.userName);
                localStorage.setItem("userId", user.userId);
                localStorage.setItem("isAuth", 'true');

                if (user.role === "Admin") appStore.setIsAdmin(true);
                else appStore.setIsAdmin(false);
                appStore.setUserId(user.userId);
                appStore.setAvatarPath(user.user.avatarPath);
                appStore.setUser(user.user);
                appStore.setAuth(true);

            }
            else {
                message.error("Кіру жүзеге аспады!")
            }
        }
        catch(e) {
            console.log(e);
            message.error("Кіру жүзеге аспады!");
        }


        setLoading(false);
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                className={"form"}
                autoComplete="off"
            >

                <Form.Item<FieldType>
                    label={authDict.email}
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label={authDict.password}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>


                <Form.Item style={{margin: "0 auto"}}
                >
                    <Button onClick={loginHandler} type="primary" htmlType="button">
                        {authDict.submit}
                    </Button>
                </Form.Item>
            </Form>

            {isloading ? <Loader imgUrl={"/bishimbaev.jpg"} message={"Don't саске. Login сені делаю"}/> : <></>}
        </>
    );
};

export default LoginPage;