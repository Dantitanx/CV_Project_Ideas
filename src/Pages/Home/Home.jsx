import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Navbar from '../../components/Navbar/Navbar';
import { polo_hosszu_kesz } from '../../Images';

const Home = () => {
    return (
        <div className="home">
            <header className="header">
                <div className="logo">
                    <span>SHOPPER</span>
                </div>
                <Navbar/>
            </header>

            <main className="hero">
                <div className="hero-content">
                    <p className="hero-subtitle">NEW ARRIVALS ONLY</p>
                    <h1 className="hero-title">
                        new <span role="img" aria-label="wave">👋</span> collections for everyone
                    </h1>
                    <Link to="/latest-collection" className="hero-button">Latest Collection →</Link>
                </div>
                <div className="hero-image">
                    <img src={polo_hosszu_kesz} alt="Model" />
                </div>
            </main>
        </div>
    );
};

export default Home;
