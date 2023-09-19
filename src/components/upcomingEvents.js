import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import '../styles/home.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function UpcomingEvents() {

    const theme = createTheme({
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'red'
                    }
                }
            }
        }
    })

    const [events, setEvents] = useState([]);

    const calendarID = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

    const getEvents = (calendarID, apiKey) => {
        function initiate() {
            gapi.client
                .init({
                    apiKey: apiKey,
                })
                .then(function () {
                    return gapi.client.request({
                        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    });
                })
                .then(
                    (response) => {
                        let events = response.result.items;
                        console.log("All events data: ", events)

                        let sortedEvents = events.sort((a, b) => {
                            const dateA = new Date(a.start.date || a.start.dateTime)
                            const dateB = new Date(b.start.date || b.start.dateTime)
                            return dateA - dateB
                        });

                        let currentEvents = sortedEvents.filter((item) => {
                            const eventDate = new Date(item.start.date || item.start.dateTime)
                            const currentDate = new Date();

                            currentDate.setUTCHours(0, 0, 0, 0);
                            const eventDateString = eventDate.toISOString().split('T')[0];
                            const currentDataString = currentDate.toISOString().split('T')[0]
                            return eventDateString >= currentDataString;
                        })

                        if (currentEvents.length > 3) {
                            currentEvents = currentEvents.slice(0, 3)
                            console.log("Current events reduced to only first 3: ", currentEvents)
                        }

                        // console.log("Only upcoming events: ", currentEvents);
                        // console.log("Closest Upcoming Event: ", currentEvents[0].summary)
                        console.log("Dates sorted: ", sortedEvents.map(x => x.start));

                        setEvents(currentEvents);
                    },
                    function (err) {
                        return [false, err];
                    }
                );
        }
        gapi.load("client", initiate);
    };

    const addEvent = (calendarID, event) => {
        function initiate() {
            gapi.client
                .request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    method: "POST",
                    body: event,
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then(
                    (response) => {
                        return [true, response];
                    },
                    function (err) {
                        console.log(err);
                        return [false, err];
                    }
                );
        }
        gapi.load("client", initiate);
    };

    useEffect(() => {
        const events = getEvents(calendarID, apiKey);
        setEvents(events);
    }, []);

    return (
        <>
            {events?.map((event) => (
                <Link to={`${event.htmlLink}`} target="_blank" className="eventContent">
                    <div>
                        <h1 className="eventTitle">{event.summary}</h1>
                        <p className="eventDesc">{event.description}</p>
                    </div>
                        <p className="eventStartDate">{event.start.date || event.start.dateTime}</p>
                </Link>
            ))}
        </>
    );
}

export default UpcomingEvents;