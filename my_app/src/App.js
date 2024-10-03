// src/App.js
import React from 'react';
import Signup from './components/signup';
import Login from './components/login';

function App() {
    return (
        <div>
            <h1>My Application</h1>
            <Signup />
            <Login />
        </div>
    );
}

export default App;
