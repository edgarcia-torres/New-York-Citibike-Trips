/**********************************************************************************************
 ** WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. * 
 * 
 * Name: Edgar David Garcia Torres  Student ID: 104433206  Date: 17/06/2022

 * *******************************************************************************************/

import React from 'react';
import './App.css';

import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


import Trips from './Trips'
import Trip from './Trip'
import About from './About'
import NotFound from './NotFound'


function App() {


  return (
    <>
      <Navbar bg="dark" expand="lg" className="navbar navbar-dark " text="white">
        <LinkContainer to="/">
          <Navbar.Brand className="white" text="white">New York Citibike Trips</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/trips">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path='/' element={<Trips />} />
              <Route path='/Trips' element={<Trips />} />
              <Route path='/Trip/:id' element={<Trip />} />
              <Route path='/About' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <br /><br />

    </>
  )
}

export default App;
