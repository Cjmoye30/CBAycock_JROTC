import * as React from 'react'
import { Grid } from '@mui/material';


import '../styles/classCompany.css'
import Carousel from 'react-material-ui-carousel';

const ClassCompany = ({ company }) => {

    const data = company[0];
    console.log(data)

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid container sm={6} xs={12} justifyContent='center'>
                    {data.students.map((students, index) => (
                        <Grid key={index} xs={6} sx={{ p: 2 }}>
                            <p className='studentItem'>{students}</p>
                        </Grid>
                    ))}
                </Grid>

                {/* turn into an image slider */}
                <Grid container sm={4} xs={12} justifyContent='center' alignItems='center'>
                    <Carousel
                        className='carouselContainer'
                        indicators
                        navButtonsAlwaysVisible
                        animation='slide'
                        duration={1000}
                    >
                        {data.images.map((img, index) => (
                            <img className='companyImg' src={img} key={index} />
                        ))}
                    </Carousel>
                </Grid>
            </Grid>
        </>
    )
}

export default ClassCompany;