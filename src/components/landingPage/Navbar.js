import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../../logo.png';
import Swal from 'sweetalert2';
import {useAuth0} from '@auth0/auth0-react';
import {BsFillPersonFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';

const AppNavbar = () => {
    const {logout, isAuthenticated} = useAuth0();
    const logoutFunc = () => {
        Swal.fire({
            title: 'Are you sure you want to leave?',
            text: 'If you leave, you can not see our special offers.',
            showCancelButton: true,
            confirmButtonColor: '#69696b',
            cancelButtonColor: '#9c867b',
            confirmButtonText: 'Log out!',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire('Log out success!', 'success');
            }
        });
    };

    return (
        <Navbar className='navBar' variant='dark' fixed='top'>
            <Navbar.Brand as={Link} to='/'>
                <Link className='link' to='/'>
                    <img
                        src={logo}
                        width='55'
                        height='55'
                        alt='React Bootstrap logo'
                    />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link
                        style={{color: '#dfd8d5'}}
                        as={Link}
                        className='nav'
                        to='/recipes'
                    >
                        Recipes
                    </Nav.Link>

                    <NavDropdown title='Ideas' id='basic-nav-dropdown'>
                        <Nav.Link
                            style={{color: '#81766f'}}
                            as={Link}
                            className='nav'
                            to='/dating'
                        >
                            Dating
                        </Nav.Link>
                        <Nav.Link
                            style={{color: '#81766f'}}
                            as={Link}
                            className='nav'
                            to='/todo'
                        >
                            Todo
                        </Nav.Link>

                    </NavDropdown>

                    <Nav.Link
                        style={{color: '#dfd8d5'}}
                        as={Link}
                        className='nav'
                        to='/expenses'
                    >
                        Expenses
                    </Nav.Link>
                </Nav>
                <Nav>
                    {!isAuthenticated ? (
                        <Nav.Link
                            as={Link}
                            to='/Auth'
                            className='nav'
                            style={{textDecoration: 'none'}}
                        >
                            <BsFillPersonFill size={43} color='#f7f0ea' />
                        </Nav.Link>
                    ) : (
                        <Nav.Link
                            as={Link}
                            to='/'
                            className='nav'
                            style={{textDecoration: 'none'}}
                        >
                            <BiLogOutCircle
                                onClick={logoutFunc}
                                size={43}
                                color='
                                #f7f0ea'
                            />
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
