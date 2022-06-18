import React from "react";
import Bootstrap from 'bootstrap';
import {Card, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function NotFound (){

    const navigate = useNavigate()

    function handleGoClick() { navigate("/") }

    return (
        <div className='container'>

        <Card style={{ width: '30rem' }} className='center'>
        <Card.Img variant="top" src="./me.jpg" />
        <Card.Body>
            <Card.Title>Edgar Garcia</Card.Title>
            <Card.Text>
            Hi, this app is part of my web programming for apps and services course taken in Seneca College.
            The function of this app is to access information from a Mongo database through an API that publishes 
            the information in JSON format. 
            <br/> <br/>
            This App also allows the user to change information about the displayed elements through the 
             <a href="https://mighty-retreat-94522.herokuapp.com/api/trips?page=1&perPage=10"> API </a> published using Heroku.
           
            </Card.Text>
            <Button variant="primary"  onClick={handleGoClick}>Go back</Button>
        </Card.Body>
        </Card>
             
        </div>
    )
}

export default NotFound;