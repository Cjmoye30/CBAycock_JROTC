import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from "react-router-dom";
import '../styles/header.css'
import { useState } from 'react';

const Header = () => {

    const [state, setState] = useState({ right: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <ListItemButton>
                    <Link to='/'>Home</Link>
                </ListItemButton>

                <ListItemButton>
                    <Link to='/events'>Events</Link>
                </ListItemButton>

                <ListItemButton>
                    <Link to='/calendar'>Calendar</Link>
                </ListItemButton>

                <ListItemButton>
                    <Link to='/syllabus'>Syllabus</Link>
                </ListItemButton>

                <ListItemButton>
                    <Link to='/classInfo'>Class Information</Link>
                </ListItemButton>

                <ListItemButton>
                    <Link to='/classInfo'>Continued Education</Link>
                </ListItemButton>

                <ListItemButton disabled>
                    <Link to='/'>Golden Falcon Batallion Alumni</Link>
                </ListItemButton>

                <ListItemButton disabled>
                    <Link to='/login'>Login</Link>
                </ListItemButton>

                <Divider>
                    <Chip label="External Links" />
                </Divider>

                
                <ListItemButton>
                    <Link to='https://go.boarddocs.com/nc/wcpsnc/Board.nsf/files/CMRTGM77530D/$file/2023-2024%20WCPS%20Calendar%20FINAL%20TRADITIONAL.pdf' target='_blank'>Wayne County Public Schools 2023-2024 School Calendar</Link>
                </ListItemButton>
                
                <ListItemButton>
                    <Link to='https://www.usarmyjrotc.com/' target='_blank'>U.S. Army JROTC</Link>
                </ListItemButton>

            </List>

        </Box>
    );

    return (
        <>
            <header>
                <Link to='/'>
                    <h1>Golden Falcons Batalion</h1>
                    <h3><em>Charles B. Aycock JROTC</em></h3>
                </Link>

                <React.Fragment key='right'>
                    <Button onClick={toggleDrawer('right', true)}>Menu</Button>
                    <Drawer
                        anchor='right'
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        {list('right')}
                    </Drawer>
                </React.Fragment>

            </header>
        </>
    )

}

export default Header;