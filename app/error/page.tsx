import React from 'react';
import Link from "next/link";

const Page = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default Page;