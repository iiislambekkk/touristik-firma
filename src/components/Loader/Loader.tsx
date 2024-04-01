import React from 'react';
import './Loader.css';

const Loader = ({imgUrl, message} : {imgUrl: string, message: string}) => {
    return (
        <div className={"loader__wrapper"}>
            <div className="loader__photo"  style={{backgroundImage: `url('${imgUrl}`}}>
                <div className="loader__border">
                </div>
            </div>
            <h1>
                {message}
            </h1>
        </div>
    );
};

export default Loader;