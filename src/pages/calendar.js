import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Calendar = () => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    
    return (
        <>
            CALENDAR PAGE
            <div className="calendarWrapper">
                <iframe
                    className="googleCalendar"
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%233F51B5&ctz=America%2FNew_York&showTitle=1&src=MTBiYjQxNmI3MmNmMWFiODMxZjY3OTcyNzY2YWIzZWM2YjI5YTEwOWMyN2UwNjQzNDIxMjAzMDFhM2FlNjcxM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342">
                </iframe>
            </div>
        </>
    )
}

export default Calendar;