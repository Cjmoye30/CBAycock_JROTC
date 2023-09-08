import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Event from "../components/event";

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
                        console.log(events)
                        setEvents(events);
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
            <ul>
                {events?.map((event) => (
                    <li key={event.id} className="flex justify-center">
                        <Event description={event.summary} />
                    </li>
                ))}
            </ul>
        </>

    );
}

export default Events;