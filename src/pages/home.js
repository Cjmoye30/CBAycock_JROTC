import React from "react";
import '../styles/home.css'
import moment from "moment";
import { Link } from "react-router-dom";
import Events from "../components/upcomingEvents";
import ClassCompany from "../components/classCompany";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from "@mui/material";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import alphaCompany from "../data/alpha";
import bravoCompany from "../data/bravo";
import charlieCompany from "../data/charlie";

const Home = () => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const quickLinksArray2 = [
        {
            name: 'Syllabus',
            link: 'syllabus'
        },
        {
            name: 'Class Information',
            link: 'classInfo'
        },
        {
            name: 'All Events',
            link: 'events'
        },
        {
            name: 'Class Calendar',
            link: 'calendar'
        }
    ];

    const [value, setValue] = React.useState('alpha');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box className="upcomingEventsSection section">
                <div className="containerHeader">
                    <h4>Upcoming Events:</h4>
                    <h4>Date: {moment().format('MMMM DD, YYYY')} </h4>
                </div>
                <hr />
                <Events />
                <Link to='/events' className="eventContent">
                    <div>
                        <p>All Events</p>
                    </div>
                </Link>
            </Box>

            <Box className='companySection section'>
                <h1>GOLDEN FALCONS BATALLION</h1>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} centered selectionFollowsFocus>
                            <Tab label="Aplha Company" value="alpha" />
                            <Tab label="Bravo Company" value="bravo" />
                            <Tab label="Charlie Company" value="charlie" />
                        </TabList>
                    </Box>
                    <TabPanel value="alpha"> <ClassCompany company={alphaCompany} /> </TabPanel>
                    <TabPanel value="bravo"> <ClassCompany company={bravoCompany} /> </TabPanel>
                    <TabPanel value="charlie"> <ClassCompany company={charlieCompany} /> </TabPanel>
                </TabContext>
            </Box>

            <Box className='quickLinksSection section' sx={{ textAlign: 'center' }}>
                <h1>Quick Links:</h1>
                <Grid container justifyContent='center'>
                    {quickLinksArray2.map((link, index) => (
                        <Grid key={index} item sm={6} xs={12}>
                            <Grid item xs={12} alignItems='center'>
                                <Link to={`/${link.link}`} className="quickLinkItem" >
                                    {link.name}
                                </Link>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Home;
