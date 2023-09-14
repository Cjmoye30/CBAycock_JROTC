import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ClassInfo = () => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    
    return (
        <>
            <h1>CLASS INFORMATION PAGE</h1>
        </>
    )
}

export default ClassInfo;
