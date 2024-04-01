"use client"

import "../globals.css";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {ConfigProvider, Drawer} from "antd";
import {useState} from "react";
import {themes} from "@/src/themeProvider";
import {MenuOutlined} from "@ant-design/icons";

import MyMenu from "@/src/components/MyMenu";
import MyFooter from "@/src/components/MyFooter";


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
        setdarkMode(!darkMode)
    }
    
    return (


        <ConfigProvider
            theme={{
                token: !darkMode ? themes.light : themes.dark,
                components: !darkMode ? themes.lightComponents : themes.DarkComponents,
            }}
        >
            <Layout style={{minHeight: "100vh"}}>
                <Header>
                    <div className={'drawerButton'}>
                        <MenuOutlined style={{paddingLeft: '10px',fontSize: 32, color: "white",
                            paddingTop: "16px"
                        }} onClick={() => setIsDrawerOpen(!isDrawerOpen)}/>
                    </div>
                    <MyMenu themeHandler={themeHandler} lang={lang} isMobile={false}/>

                    <Drawer
                        open={isDrawerOpen}
                        closable={false}
                        bodyStyle={{border: 'no'}}
                        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
                        placement={'left'}
                        className={'drawerMenu'}
                    >
                        <MyMenu themeHandler={themeHandler} lang={lang} isMobile={true}></MyMenu>
                    </Drawer>
                </Header>
                <Content style={{padding: "0 48px"}}>{children}</Content>

                <MyFooter lang={lang}/>
            </Layout>
        </ConfigProvider>


    );
}
