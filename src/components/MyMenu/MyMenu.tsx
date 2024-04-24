"use client";

import {Menu, Select, Switch} from "antd";
import Link from "next/link";
import * as dictionary from '../../../app/layoutDictionary.json';
import {useRouter} from "next/navigation";
import {Config} from "@/config";
import {appStore} from "@/src/store/appStore";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import "./MyMenu.css";
import {toJS} from "mobx";

const  MyMenu =  observer(({themeHandler, lang, isMobile, setIsDrawerOpen}: {themeHandler: () => void, lang: string, isMobile: boolean, setIsDrawerOpen: (isOpen: boolean) => void}) => {

    const router = useRouter();

    let dict: LayoutDictionary = dictionary;
    let menu = dict[lang]?.layout.menu;

    useEffect(() => {
        if (localStorage.getItem('isAuth') === "true") appStore.setAuth(true);
    }, [])

    const exitApp = () => {
        appStore.setAuth(false);
        appStore.setUser({} as User);
    }

    const items = [
        {key: "tours", label: <Link href={`/${lang}/tours`}>{menu?.tours}</Link>},
        {key: "Theme", label: <Switch checked={localStorage?.getItem("isDarkMode") === "true"} onChange={themeHandler} checkedChildren={menu?.lightMode} unCheckedChildren={menu?.darkMode} />},
        {key: "register", label: <Link href={`/${lang}/register`}>{menu?.register}</Link>},
        {key: "login", label: <Link href={`/${lang}/login`}>{menu?.login}</Link>},
        {key: "lang", label:
                <Select
                    onChange={(value) => router.push(langHandler(value))}
                    defaultValue={menu?.language}
                    options={[
                        { value: 'kz', label: 'kz' },
                        { value: 'ru', label: 'ru' },
                        { value: 'en', label: 'en' },
                    ]}
                />},
        {key: "profile", label:
            <>
                {
                    appStore.isAuth ? <div className={'avatarWrapper'}>
                        <div className="avatar" style={{backgroundImage: `url('${Config.serverAdress}avatars/${toJS(appStore.user).avatarPath}')`}}></div>
                    </div> : <></>
                }
            </>,
            children: [{key: "edit", label: <Link href={{ pathname: `/${lang}/profile`, query: { edit: 'true' } }}>Edit Profile</Link>},
                {key: "exit", label: <div onClick={exitApp}>Exit</div>}
            ]
            }
    ]


    const leftItems = [
        {key: "tours", label: <Link href={`/${lang}/tours`}>{menu?.tours}</Link>},
    ]


    const rightItems = [
        {key: "Theme", label: <Switch onChange={themeHandler} checked={localStorage.getItem("isDarkMode") === "true"} checkedChildren={menu?.lightMode} unCheckedChildren={menu?.darkMode} />},
        {key: "register", label: !appStore.isAuth ? <Link href={`/${lang}/register`}>{menu?.register}</Link> : <></> },
        {key: "login", label: !appStore.isAuth ? <Link href={`/${lang}/login`}>{menu?.login}</Link> : <Link href={`/${lang}/login`} onClick={exitApp} >{menu?.exit}</Link>},
        {key: "lang", label:
                <Select
                    onChange={(value) => router.push(langHandler(value))}
                    defaultValue={menu?.language}
                    options={[
                        { value: 'kz', label: 'kz' },
                        { value: 'ru', label: 'ru' },
                        { value: 'en', label: 'en' },
                    ]}
                />},
        {key: "profile", label:
                <div className={'avatarWrapper'}>
                        {appStore.isAuth ? <div className={`avatar ${appStore.isNotifyActive ? "notify" : ""}`} style={{backgroundImage: `url('${Config.serverAdress}avatars/${toJS(appStore.user).avatarPath}')`}}></div> : <></>}
                </div>,
            children: [{key: "edit", label: <Link href={{ pathname: `/${lang}/profile`, query: { edit: 'true' } }}>{menu?.edit}</Link>},
                {key: "exit", label: <Link href={`/${lang}/login`} onClick={exitApp} >{menu?.exit}</Link>},
                appStore.isAdmin? {key: "reservation", label: <Link onClick={() => appStore.setIsNotifyActive(false)} href={`/${lang}/reservation`}>{menu?.reservation}</Link>} : null
            ]
        }
    ]

    function langHandler(lang: string) {
        let path = '/' + lang + window.location.pathname.slice(3);
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id != null) {
            return path + "?id=" + id;
        }

        return path;
    }


    if (isMobile) {
        return <Menu
            style={{marginLeft: "-20px"}}
            mode="inline"
            items={items}
        />
    }
    else {
        return (
            <nav className="headerMenuu">
                <div className="logo">
                    <Link href={`/${lang}/tours`}>
                        <img
                            src={'/logo1.svg'}
                            width={100}
                            height={60}
                            alt="Pic"/>
                    </Link>

                </div>
                <Menu
                    className={'headerLeftMenu'}
                    mode="horizontal"
                    items={leftItems}
                    style={{flex: "auto" }}
                />
                {appStore.isNotifyActive ? <></> : <></>}
                <Menu
                    className={'headerRightMenu'}
                    mode="horizontal"
                    items={rightItems}
                    style={{flex: "auto" }}
                />
            </nav>
            )
    }
});

export default MyMenu;