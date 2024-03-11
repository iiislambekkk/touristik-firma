"use client"

import "./globals.css";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {Button, ConfigProvider, Space, Menu, Switch, Drawer} from "antd";
import Link from "next/link";
import {useState} from "react";
import {themes} from "@/src/themeProvider";
import {MenuOutlined} from "@ant-design/icons";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [darkMode, setdarkMode] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const items = [
        {key: "home", label: <Link href={"/"}>Home</Link>},
        {key: "posts", label: <Link href={"/posts"}>Posts</Link>},
        {key: "register", label: <Link href={"/authorize/register"}>Тіркелу</Link>},
        {key: "login", label: <Link href={"/authorize/login"}>Кіру</Link>},
        {key: "Theme", label: <Switch onChange={() => setdarkMode(!darkMode)} checkedChildren="Light mode" unCheckedChildren="Dark mode" />},
    ]

  return (

          <html lang="en">
          <body>
          <ConfigProvider
              theme={{
                  token: !darkMode ? themes.light : themes.dark,
                  components: !darkMode ? themes.lightComponents : themes.DarkComponents,
              }}
          >
              <Layout style={{minHeight: "100vh"}}>
                  <Header>
                      <div className={'drawerButton'}>
                          <MenuOutlined style={{paddingLeft: '10px',fontSize: 32}} onClick={() => setIsDrawerOpen(!isDrawerOpen)}/>
                      </div>
                      <Menu
                          className={'headerMenu'}
                          mode="horizontal"
                          items={items}
                          style={{ flex: 1, minWidth: 0 }}
                          />
                      <Drawer
                          open={isDrawerOpen}
                          closable={false}
                          bodyStyle={{backgroundColor: "#071D70", border: 'no'}}
                          onClose={() => setIsDrawerOpen(!isDrawerOpen)}
                          placement={'left'}
                          className={'drawerMenu'}
                      >
                          <Menu
                              mode="inline"
                              items={items}
                          />
                      </Drawer>
                  </Header>
                  <Content style={{padding: "0 48px"}}>{children}</Content>

                  <Footer style={{textAlign: "center"}}>Created By Islambek</Footer>
              </Layout>
          </ConfigProvider>
          </body>
          </html>

  );
}
