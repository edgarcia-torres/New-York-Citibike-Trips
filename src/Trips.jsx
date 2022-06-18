/**********************************************************************************************
 ** WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. * 
 * 
 * Name: Edgar David Garcia Torres  Student ID: 104433206  Date: 19/05/2022
 * 
 * Heroku Link:
 * *******************************************************************************************/

import React, {useEffect, useState} from 'react'
import Bootstrap from 'bootstrap';
import {Card, Button, Badge} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Trip from './Trip';
import './App.css';


function Trips (){

    const navigate = useNavigate()
    const [trips, setTrips] = useState(null);//default value
    const [page, setPage] = useState(1);//default value


    const perPage = 10;

        useEffect(()=>{
    //logic come here before the component would be rendered
    //https://mighty-retreat-94522.herokuapp.com/api/trips?page=1&perPage=10
    //https://mighty-retreat-94522.herokuapp.com/api/trips/572bb8222b288919b68abf5a
    fetch(`https://mighty-retreat-94522.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`)   ///api/trips?page=1&perPage=5
    .then((response) => {
        let res = response.json();
        return res;
    })
    .then((myJson) => {
        setTrips(myJson)
    })
        },[page])// changes(variables)

    const handlePrevClick = () => {
        if(page>1){
            setPage(page - 1);
        }
    }
    const handleNextClick = () => {
        setPage(page + 1);
    }

    if(trips != null){
    return (
        <>
        <Card style={{ width: 'auto' }} className='center'>
            <div>
            <h2>Trip list</h2>
            <p>Full list of city bike trips</p>
            </div>
            <div>
             <Badge className="Subscriber" >Subscribers</Badge>
             <Badge className="Customer" >Customers</Badge>   
            </div>


        </Card>
        <br></br>

        <table className="table" >
                <thead id='tableHead'>

                    <tr>
                        <th>Bike Id</th>
                        <th>Start Station</th>
                        <th>End Station</th>
                        <th>Duration (Minutes)</th>
                    </tr>

                </thead>
                <tbody id="trips-table">
                {trips.map((trip) => 
                <>
                    {(trip.usertype)==="Subscriber"?(
                        <tr  className = "Subscriber"   onClick={() =>{ navigate(`/trip/${trip._id}`)}}>
                            <td >{trip.bikeid}</td>
                            <td>{trip["start station name"] }</td>
                            <td>{trip["end station name"] }</td>
                            <td>{(trip.tripduration/ 60).toFixed(2)}</td>
                        </tr>   
                        ):(
                        <tr className = "Customer"   onClick={() => { navigate(`/trip/${trip._id}`)}}>
                            <td >{trip.bikeid}</td>
                            <td>{trip["start station name"] }</td>
                            <td>{trip["end station name"] }</td>
                            <td>{(trip.tripduration/ 60).toFixed(2)}</td>
                        </tr>
                    )}
                    </>
                )}
                </tbody>
        </table>
        <nav aria-label="Page navigation" style={{  padding: '10px' }}>
                <Button onClick={handlePrevClick}  style={{ background: 'rgb(1, 27, 46)' }}>
                  &laquo;
                </Button>

              <Badge  ><h5>Page: {page}</h5></Badge>

                <Button onClick={handleNextClick} style={{ background: 'rgb(1, 27, 46)' }}>
                  &raquo;
                </Button>
          </nav>   
        </>
     );
    }else{
        return(
            <p>
               LOADING TRIPS... please wait.
            </p>
        )
    }
}

export default Trips;