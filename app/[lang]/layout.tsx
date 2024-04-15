"use client"

import "../globals.css";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {App, ConfigProvider, Drawer} from "antd";
import {useEffect, useState} from "react";
import {themes} from "@/src/helpers/themeProvider";
import {MenuOutlined} from "@ant-design/icons";

import MyMenu from "@/src/components/MyMenu/MyMenu";
import MyFooter from "@/src/components/MyFooter";
import {appStore} from "@/src/store/appStore";
import {getCurrentUser, getUserInformation} from "@/src/services/user";
import {toJS} from "mobx";


export default function RootLayout({
                                       children, params
                                   }: Readonly<{
    children: React.ReactNode;
    params: {lang: string};
}>) {

    const lang = params.lang;
    const [darkMode, setdarkMode] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    function themeHandler() {
        setdarkMode(!darkMode);
        localStorage.setItem("isDarkMode", "" + !darkMode);
    }

    const getUser = async () => {
        const currentUser = await getCurrentUser();
        if (currentUser == "Error") return;

        appStore.setUser(currentUser);
        console.log(toJS(appStore.user).id)
    }

    useEffect(() => {
        if (localStorage.getItem("isDarkMode") === "true") setdarkMode(true);
        else setdarkMode(false);

        if (localStorage.hasOwnProperty("token")){
            getUser()
        }

    }, [lang])
    
    return (


        <ConfigProvider
            theme={{
                token: !darkMode ? themes.light : themes.dark,
                components: !darkMode ? themes.lightComponents : themes.DarkComponents,
            }}
        >
            <App>
                <Layout style={{minHeight: "100vh", minWidth: "280px"}}>
                    <Header>
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
