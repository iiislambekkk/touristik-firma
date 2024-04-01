"use client";

import {Menu, Select, Switch} from "antd";
import Link from "next/link";
import * as dictionary from '../../app/layoutDictionary.json';
import {useRouter} from "next/navigation";
import Image from 'next/image';
import {Config} from "@/config";
import {Console} from "inspector";

const  MyMenu =  ({themeHandler, lang, isMobile, setIsDrawerOpen}: {themeHandler: () => void, lang: string, isMobile: boolean, setIsDrawerOpen: (isOpen: boolean) => void}) => {

    const router = useRouter();

    let dict: any = dictionary;
    let menu = dict[lang]?.layout.menu;


    const items = [
        {key: "home",label: <Link  href={`/${lang}`}>{menu.home}</Link>},
        {key: "posts", label: <Link href={`/${lang}/posts`}>{menu.posts}</Link>},
        {key: "Theme", label: <Switch onChange={themeHandler} checkedChildren={menu.lightMode} unCheckedChildren={menu.darkMode} />},
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
                    localStorage.hasOwnProperty("userId") ? <div className={'avatarWrapper'}>
                        <div className="avatar"
                             style={{backgroundImage: `url('${Config.serverAdress}avatars/${localStorage.getItem('userId')}.png')`}}></div>
                    </div> : <></>
                }
            </>
            }
    ]

    const leftItems = [
        {key: "home", label: <Link href={`/${lang}`}>{menu.home}</Link>},
        {key: "posts", label: <Link href={`/${lang}/posts`}>{menu.posts}</Link>},
    ]

    const rightItems = [
        {key: "Theme", label: <Switch onChange={themeHandler} checkedChildren={menu.lightMode} unCheckedChildren={menu.darkMode} />},
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
                    {localStorage.getItem("userId") != null ? <div className="avatar" style={{backgroundImage: `url('${Config.serverAdress}avatars/${localStorage.getItem('userId')}.png')`}}></div> : <></>}
                </div>
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
                    <Image
                        src={'/logo.svg'}
                        width={90}
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
};

export default MyMenu;