import * as React from 'react'
import { Grid } from '@mui/material';

import '../styles/classCompany.css'

const ClassCompany = ({ company }) => {

    const data = company[0];
    console.log(data)

    return (
        <>
                <Grid container>
                    <Grid container sm={6} xs={12} justifyContent='center'>
                        {data.students.map((students, index) => (
                            <Grid key={index} item sm={6} xs={12} sx={{p:2}}>
                                <p className='studentItem'>{students}</p>
                            </Grid>
                        ))}
                    </Grid>

                    {/* turn into an image slider */}
                    <Grid container sm={6} xs={12} justifyContent='center'>
                        {data.images.map((img, index) => (
                            <img className='companyImg' src={img} key={index} />
                        ))}
                    </Grid>
                </Grid>
        </>
    )
}

export default ClassCompany;