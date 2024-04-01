import React from 'react';
import {Footer} from "antd/es/layout/layout";
import * as dictionary from '../../app/layoutDictionary.json';

const MyFooter = ({lang}: {lang: string}) => {

    let dict: any = dictionary;
    let footer = dict[lang].layout.footer;

    return (
        <Footer style={{textAlign: "center"}}>{footer.poweredBy}</Footer>
    );
};

export default MyFooter;