"use client";

import {Menu, Select, Switch} from "antd";
import Link from "next/link";
import * as dictionary from '../../../app/layoutDictionary.json';
import {useRouter} from "next/navigation";
import Image from 'next/image';
import {Config} from "@/config";
import {Console} from "inspector";
import {appStore} from "@/src/store/appStore";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import "./MyMenu.css";

const  MyMenu =  observer(({themeHandler, lang, isMobile, setIsDrawerOpen}: {themeHandler: () => void, lang: string, isMobile: boolean, setIsDrawerOpen: (isOpen: boolean) => void}) => {

    const router = useRouter();

    let dict: any = dictionary;
    let menu = dict[lang]?.layout.menu;

    useEffect(() => {
        if (localStorage.getItem('isAuth') === "true") appStore.setAuth(true);
    }, [])

    const items = [
        {key: "home",label: <Link  href={`/${lang}`}>{menu?.home}</Link>},
        {key: "tours", label: <Link href={`/${lang}/tours`}>{menu.tours}</Link>},
        {key: "Theme", label: <Switch checked={localStorage.getItem("isDarkMode") === "true"} onChange={themeHandler} checkedChildren={menu.lightMode} unCheckedChildren={menu.darkMode} />},
        {key: "register", label: <Link href={`/${lang}/register`}>{menu.register}</Link>},
        {key: "login", label: <Link href={`/${lang}/login`}>{menu.login}</Link>},
        {key: "lang", label:
                <Select
                    onChange={(value) => router.push(langHandler(value))}
                    defaultValue={menu.language}
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
                        <div className="avatar"
                             style={{backgroundImage: `url('${Config.serverAdress}avatars/${localStorage.getItem('userId')}.png')`}}></div>
                    </div> : <></>
                }
            </>,
            children: [{key: "edit", label: <Link href={{ pathname: `/${lang}/profile`, query: { edit: 'true' } }}>Edit Profile</Link>}]
            }
    ]

    const leftItems = [
        {key: "home", label: <Link href={`/${lang}`}>{menu.home}</Link>},
        {key: "tours", label: <Link href={`/${lang}/tours`}>{menu.tours}</Link>},
    ]

    const rightItems = [
        {key: "Theme", label: <Switch onChange={themeHandler} checked={localStorage.getItem("isDarkMode") === "true"} checkedChildren={menu.lightMode} unCheckedChildren={menu.darkMode} />},
        {key: "register", label: <Link href={`/${lang}/register`}>{menu.register}</Link>},
        {key: "login", label: <Link href={`/${lang}/login`}>{menu.login}</Link>},
        {key: "lang", label:
                <Select
                    onChange={(value) => router.push(langHandler(value))}
                    defaultValue={menu.language}
                    options={[
                        { value: 'kz', label: 'kz' },
                        { value: 'ru', label: 'ru' },
                        { value: 'en', label: 'en' },
                    ]}
                />},
        {key: "profile", label:
                <div className={'avatarWrapper'}>
                    {appStore.isAuth ? <div className="avatar" style={{backgroundImage: `url('${Config.serverAdress}avatars/${localStorage.getItem('userId')}.png')`}}></div> : <></>}
                </div>,
            children: [{key: "edit", label: <Link href={{ pathname: `/${lang}/profile`, query: { edit: 'true' } }} style={{marginLeft: "100px"}}>Edit Profile</Link>}]
        }
    ]

    function langHandler(lang: string) {
        let path = '/' + lang + window.location.pathname.slice(3);

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
                    <img
                        src={'/logo1.svg'}
                        width={100}
                        height={60}
                        alt="Pic"/>
                </div>
                <Menu
                    className={'headerLeftMenu'}
                    mode="horizontal"
                    items={leftItems}
                    style={{flex: "auto" }}
                />
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