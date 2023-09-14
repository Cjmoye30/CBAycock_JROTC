import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Syllabus = () => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            <h1>SYLLABUS PAGE</h1>
        </>
    )
}

export default Syllabus;
