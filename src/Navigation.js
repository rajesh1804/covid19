import React from 'react';
import './App.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation({touchControls}) {

  return (
    <div>
      <Navbar className='justify-content-between' bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <span role="img" aria-label="earth">🌎</span>
          Covid-19 Stats
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="India Stats" id="basic-nav-dropdown">
              <NavDropdown.Item href="/indiaStats">India Stats Home</NavDropdown.Item>
              <NavDropdown.Item href="/indiaStateStats">States Analysis</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export  {Navigation};
