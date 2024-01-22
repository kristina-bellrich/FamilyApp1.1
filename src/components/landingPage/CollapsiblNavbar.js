import React, {useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CollapsibleNavbar = () => {
    const [isCollapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };

    return (
        <Navbar.Collapse
            className={`justify-content-end ${isCollapsed ? 'collapse' : ''}`}
        >
            <Nav>
                <Nav.Link as={Link} to='/'>
                    Home
                </Nav.Link>
                <Nav.Link as={Link} to='/recipes'>
                    Recipes
                </Nav.Link>
                <Nav.Link as={Link} to='/dating'>
                    Dating
                </Nav.Link>
                <Nav.Link as={Link} to='/todo'>
                    Todo
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    );
};

export default CollapsibleNavbar;
