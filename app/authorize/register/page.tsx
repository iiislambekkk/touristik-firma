"use client";

import React, {useState} from 'react';
import {AutoComplete, Form, message} from "antd";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import './../authorize.css';
import {RegisterRequest, registerUser} from "@/src/services/auth";


type FieldType = {
    username?: string;
    email?: string;
    password?: string;
};



const RegisterPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerHandler() {


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
    }

    return (
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input value={userName} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input value={userName} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button onClick={registerHandler} type="primary" htmlType="button">
                        Submit
                    </Button>
                </Form.Item>
        </Form>

    );
};

export default RegisterPage;