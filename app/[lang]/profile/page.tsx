"use client"

import React from 'react';
import {Button, message, Upload, UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Config} from "@/config";
import {getCurrentUser} from "@/src/services/user";
import {appStore} from "@/src/store/appStore";
import {observer} from "mobx-react-lite";

const Page = observer(() => {
    const updateUser = async () => {
        const currentUser = await getCurrentUser();
        if (currentUser == "Error") return;
        appStore.setUser(currentUser);
    }

    const props: UploadProps = {
        name: 'file',
        action: `${Config.serverAdress}api/user/uploadAvatar`,
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setTimeout(updateUser, 4000)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
    );
})

export default Page;