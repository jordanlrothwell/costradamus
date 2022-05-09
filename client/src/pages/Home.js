// homepage 
import React from 'react';
import { Link } from 'react-router-dom';
import Board from '../components/Board/Board';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/profile">Profile</Link>
            <Board />
        </div>
        
    );
}

export default Home;