"use client";

import React, {useState} from 'react';
import {AutoComplete, Form, message} from "antd";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import '../authorize.css';
import {RegisterRequest, registerUser} from "@/src/services/auth";
import * as dictionary from '../authDictionary.json';
import Loader from "@/src/components/Loader/Loader";
import Posts from "@/src/components/Posts";


type FieldType = {
    username?: string;
    email?: string;
    password?: string;
};



const RegisterPage = ({params}: {params: {lang: string}}) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    let dict: any = dictionary;
    const authDict = dict[params.lang];

    async function registerHandler() {

        setLoading(true);
        const registerRequest = {
            userName: userName,
            email: email,
            password: password,
            role: 1,
        } as RegisterRequest;

        const rez = await registerUser(registerRequest);

        if (rez.status == 200) {
            message.success("Пайдаланушыны тіркеу жүзеге асты!")
        }
        else {
            message.error("Пайдаланушыны тіркеу жүзеге аспады!")
        }
        setLoading(false);
    }

    return (
        <>
            {loading ?<Loader imgUrl={"/bishimbaev.jpg"} message={"Don't сасқалақтау. Register делаю сені"}/> :
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    className={"form"}
                    autoComplete="off"
                >

                    <Form.Item<FieldType>
                        className={"formItems"}
                        label={authDict.username}
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={authDict.email}
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input value={userName} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={authDict.password}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input value={userName} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>



                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={registerHandler} type="primary" htmlType="button">
                            {authDict.submit}
                        </Button>
                    </Form.Item>
                </Form>
            }
        </>
    );
};

export default RegisterPage;