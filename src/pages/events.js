import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import moment from "moment/moment";

function Events() {
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
                        console.log("All events data: ",events)

                        let sortedEvents = events.sort((a,b) => {
                            const dateA = new Date(a.start.date || a.start.dateTime)
                            const dateB = new Date(b.start.date || b.start.dateTime)
                            return dateA - dateB
                        });

                        let currentEvents = sortedEvents.filter((item) => {
                            const eventDate = new Date(item.start.date || item.start.dateTime)
                            const currentDate = new Date();
                            return eventDate >= currentDate;
                        })

                        console.log("Only upcoming events: ", currentEvents);
                        console.log("Closest Upcoming Event: ", currentEvents[0].summary)
                        console.log("Dates sorted: ",sortedEvents.map(x => x.start));

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
        <p>Todays date: {moment().format("MMMM Do, YYYY")} </p>
            <ul>
                {events?.map((event) => (
                    <li key={event.id} className="flex justify-center">
                        <div>
                            <h1>{event.summary}</h1>
                            <h3>{event.description}</h3>
                            <p>Date: {event.start.date || event.start.dateTime}</p>
                            {event.attachments?.map((image, index) => (
                                <p key={index}> <img className="eventImg" src={`https://drive.google.com/uc?id=${image.fileId}`} /> </p>
                            ))}
                        </div>

                    </li>
                ))}
            </ul>
        </>

    );
}

export default Events;