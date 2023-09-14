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

import alphaCompany from "../data/alpha";
import bravoCompany from "../data/bravo";
import charlieCompany from "../data/charlie";

const Home = () => {

    const [value, setValue] = React.useState('alpha');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box className="upcomingEventsWrapper">
                <div className="containerHeader">
                    <h4>Upcoming Events:</h4>
                    <h4>Date: {moment().format('MMMM DD, YYYY')} </h4>
                </div>
                <hr />
                <Events />
                <Link className="pageLink" to='/events'>View all Events</Link>
            </Box>

            <Box sx={{ width: '100%' }} className='companySection'>
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

            <Box sx={{textAlign: 'center'}}>
                <h1>Helpful links here:</h1>
                <button>Syllabus</button>
                <button>Class Information</button>
                <button>All Events</button>
                <button>School Calendar</button>
            </Box>
        </>
    )
}

export default Home;
