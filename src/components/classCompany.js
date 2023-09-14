import * as React from 'react'
import '../styles/classCompany.css'

const ClassCompany = ({ company }) => {

    const data = company[0];
    console.log(data)

    return (
        <>
            <div>
                <h3>Roster:</h3>
                <>
                    {data.students.map((students) => (
                        <p>{students}</p>
                    ))}
                </>

                <>
                {data.images.map((img) => (
                    <img className='companyImg' src={img} />
                ))}
                </>
            </div>

        </>
    )
}

export default ClassCompany;