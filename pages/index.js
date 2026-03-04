import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Dashboard/Navbar'
import FlexDiv from '@/components/FlexDiv'

const index = () => {
    return (
        <>
        <Navbar></Navbar>
        <FlexDiv style={{minHeight: 100 + "vh"}}>
            <h1>Hello! If you are here, then you are not logged in</h1> 
        </FlexDiv>
        </>
    );
}

export default index;