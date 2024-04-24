"use client"

import "../globals.css";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {App, ConfigProvider, Drawer, message} from "antd";
import {useEffect, useState} from "react";
import {themes} from "@/src/helpers/themeProvider";
import {MenuOutlined} from "@ant-design/icons";

import MyMenu from "@/src/components/MyMenu/MyMenu";
import MyFooter from "@/src/components/MyFooter";
import {appStore} from "@/src/store/appStore";
import {getCurrentUser} from "@/src/services/user";
import {HttpTransportType, HubConnectionBuilder} from "@microsoft/signalr";
import {Config} from "@/config";
import {redirect} from "next/navigation";

export default function RootLayout({
                                       children, params
                                   }: Readonly<{
    children: React.ReactNode;
    params: {lang: string};
}>) {

    const lang = params.lang;
    const [darkMode, setdarkMode] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [needToRedirect, setNeedToRedirect] = useState(false);

    const joinHub = async () => {
        let connection = new HubConnectionBuilder().withUrl(`${Config.serverAdress}hub`,  {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).withAutomaticReconnect()
            .build()

        connection.on("ReceiveNotifications", () => {
            if (appStore.isAdmin) {
                messageApi.info('Брондауға жаңа запрос түсті');

                appStore.setIsNotifyActive(true);
                appStore.setAvatarPath("")
            }
            else {
                console.log("BREDDDD")
            }
        })

        connection.on("RefreshCommentss", () => {

            appStore.setRefreshComments();

        })

        try {
            await connection.start();
            await connection.invoke("JoinHub")
        } catch (e) {
            console.log(e)
        }

        appStore.setConnection(connection);
    }

    function themeHandler() {
        setdarkMode(!darkMode);
        localStorage.setItem("isDarkMode", "" + !darkMode);
    }

    const getUser = async () => {
        try {
            const userinfo = JSON.parse(await getCurrentUser());
            const currentUser = userinfo.user;
            const role = userinfo.role;
            if (currentUser.user == "Error"){
                appStore.setUser({} as User);
                appStore.setAuth(false);
                return;
            }


            localStorage.setItem("userId", currentUser.Id)

            appStore.setUserId(currentUser.Id);
            appStore.setUser(currentUser);

            if (role === "Admin") {
                appStore.setIsAdmin(true);
            }

            appStore.setAvatarPath(currentUser.avatarPath);
            appStore.setAuth(true);
            joinHub()
        }
        catch (e) {
            appStore.setAuth(false)
            console.log(e)
            localStorage.removeItem("isAuth")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            setNeedToRedirect(true);
        }
    }



    useEffect(  () => {
        if (localStorage.getItem("isDarkMode") === "true") setdarkMode(true);
        else setdarkMode(false);
        if (needToRedirect) redirect(`login`)

        if (localStorage.hasOwnProperty("token")){
            getUser()
        } else {
            localStorage.removeItem("isAuth")
            localStorage.removeItem("role")
        }





    }, [lang, needToRedirect])
    
    return (


        <ConfigProvider
            theme={{
                token: !darkMode ? themes.light : themes.dark,
                components: !darkMode ? themes.lightComponents : themes.DarkComponents,
            }}
        >
            {contextHolder}
            <App>
                <Layout style={{minHeight: "100vh", minWidth: "280px", position: "relative", marginTop: "60px"}}>
                    <Header  style={{position: "fixed", width: "100%", marginTop: "-60px", zIndex: 10}}>
                        <div className={'drawerButton'}>
                            <MenuOutlined style={{paddingLeft: '10px',fontSize: 32, color: "white",
                                paddingTop: "16px"
                            }} onClick={() => setIsDrawerOpen(!isDrawerOpen)}/>
                        </div>
                        <MyMenu themeHandler={themeHandler} lang={lang} isMobile={false} setIsDrawerOpen={setIsDrawerOpen}/>

                        <Drawer
                            open={isDrawerOpen}
                            closable={false}
                            bodyStyle={{border: 'no'}}
                            onClose={() => setIsDrawerOpen(!isDrawerOpen)}
                            placement={'left'}
                            className={'drawerMenu'}
                        >
                            <MyMenu themeHandler={themeHandler} lang={lang} isMobile={true} setIsDrawerOpen={setIsDrawerOpen}></MyMenu>
                        </Drawer>
                    </Header>
                    <Content style={{padding: "0 48px"}}>{children}</Content>

                    <MyFooter lang={lang}/>
                </Layout>
            </App>
        </ConfigProvider>


    );
}
