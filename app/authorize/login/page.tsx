"use client";

import React, {useState} from 'react';
import {AutoComplete, Form, message} from "antd";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import './../authorize.css';
import {LoginRequest, loginUser} from "@/src/services/auth";


type FieldType = {
    username?: string;
    email?: string;
    password?: string;
};



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginHandler() {

        const loginRequest = {
            email: email,
            password: password,
        } as LoginRequest;

        const rez = await loginUser(loginRequest);

        if (rez.status == 200) {
            message.success("Кіру жүзеге асты!")

            let obj = JSON.parse(await rez.text())

            localStorage.setItem("token", obj.token);
            localStorage.setItem("role", obj.role);

        }
        else {
            message.error("Кіру жүзеге аспады!")
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
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={loginHandler} type="primary" htmlType="button">
                    Submit
                </Button>
            </Form.Item>
        </Form>

    );
};

export default LoginPage;