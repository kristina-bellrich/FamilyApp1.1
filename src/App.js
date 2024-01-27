import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ToDo from './components/todo/Todo';
import Home from './components/landingPage/Home';
import Recipies from './components/recipies/Recipies';
import Dating from './components/dating/Dating';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppNavbar from './components/landingPage/Navbar';
import LoginButton from './components/auth/LoginButton';
import {useAuth0} from '@auth0/auth0-react';
import Budget from './components/budget/Budget';

export const testContext = React.createContext();

function App() {
    const {isAuthenticated} = useAuth0();

    return (
        <div>
            <Router>
                <AppNavbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/recipes' element={<Recipies />} />
                    <Route path='/dating' element={<Dating />} />
                    <Route path='/todo' element={<ToDo />} />
                    <Route path='/expenses' element={<Budget />} />
                    {!isAuthenticated ? (
                        <Route path='/Auth' element={<LoginButton />} />
                    ) : (
                        <Route path='/' />
                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
