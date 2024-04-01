"use client";

import React, {useState} from 'react';
import {AutoComplete, Form, message} from "antd";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import '../authorize.css';
import {LoginRequest, loginUser} from "@/src/services/auth";
import * as dictionary from '../authDictionary.json';
import Loader from "@/src/components/Loader/Loader";


type FieldType = {
    username?: string;
    email?: string;
    password?: string;
};



const LoginPage = ({params}: {params: {lang: string}}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let dict: any = dictionary;
    const authDict = dict?.[params.lang];

    async function loginHandler() {
        setLoading(true);

        const loginRequest = {
            email: email,
            password: password,
        } as LoginRequest;

        const rez = await loginUser(loginRequest);

        if (rez.status == 200) {
            message.success("Кіру жүзеге асты!")

            let user = JSON.parse(await rez.text())

            localStorage.setItem("token", user.token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("userName", user.userName);
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("isAuth", 'true');
        }
        else {
            message.error("Кіру жүзеге аспады!")
        }

        setLoading(false);
    }

    return (
        <>
            {loading ? <Loader imgUrl={"/bishimbaev.jpg"} message={"Don't сасқалақтау.  Login делаю сені"}/> : <Form
                name="basic"
                labelCol={{ span: 8 }}
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



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button onClick={loginHandler} type="primary" htmlType="button">
                        {authDict.submit}
                    </Button>
                </Form.Item>
            </Form>
            }
        </>


    );
};

export default LoginPage;