import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { navScroll } from '../helper';

function Home(props) {    
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
}
navScroll();
export default Home;