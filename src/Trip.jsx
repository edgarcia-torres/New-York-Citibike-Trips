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
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Button, Card, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './App.css';


function Trip (){
    //-------------------VARIABLES------------------------
    let { id } = useParams();       
    const [trip, setTrip] = useState(null);//default value
    const [loading, setLoading] = useState(true);//default value
    const [userData, setUserData] = useState(null);
    //--------------------EVENTS------------------------- 

    const handleSubmit=(e)=>{//you get the event e as parameter
        e.preventDefault()//default is reloading the complete page 
        let data = JSON.stringify(userData);

        if(userData.bikeid === 0 ){userData.bikeid=trip.bikeid}
        if(userData.usertype === 'default' ){userData.usertype=trip.usertype}
        if(userData["birth year"] === 0 ){userData["birth year"] =trip["birth year"]}

        //fetch(`http://localhost:8080/api/trips/${id}` ,{ // RUN LOCAL
        fetch(`https://mighty-retreat-94522.herokuapp.com/api/trips/${id}` ,{
            method: "PUT",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                "bikeid":userData.bikeid,
                "usertype":userData.usertype,
                "birth year":userData["birth year"]
            })
            
        }).then(res =>{
            console.log(res)
            if(res.ok){
                console.log("PUT REQUEST SUCCESSFUL")
            }else{
                console.log("PUT REQUEST UNSUCCESSFUL")
                return res
            }
        }).then(res=>res.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error))
    }

    const handleChange=(e)=>{//received the event => based in input we act acondingly
        //destruction -e{target}  => we get target out of event   //we call this destruction
        const {name}=e.target
        let value = null
        value=e.target.value
        setUserData(userData=>{
            return{...userData, [name]:value}//this is how we pass the key, name is the key 
        })
    }

    //logic come here before the component would be rendered
    useEffect(()=>{
        //    https://mighty-retreat-94522.herokuapp.com/api/trips/572bb8222b288919b68abf5a
        //fetch(`http://localhost:8080/api/trips/${id}`) //RUN LOCAL 
        fetch(`https://mighty-retreat-94522.herokuapp.com/api/trips/${id}`)   
        .then((response) => {
            let res = response.json();
            return res;
        })
        .then((data) => {
            if(data.hasOwnProperty("_id")){
                setTrip(data)
                setLoading(false)
            }else{
                setTrip(null)
            }
        })
            },[loading])// changes(variables)


    useEffect(() => {
        setUserData({
            bikeid: 0,
            "birth year": 0, 
            usertype: 'default'
        });
    }, []);

    //--------RENDER THE COMPONENT---------
    if(trip!=null || loading === false){
        let tri = {};
        tri.start0 = trip["start station location"].coordinates[0];
        tri.start1 = trip["start station location"].coordinates[1];
        tri.end0   = trip["end station location"].coordinates[0];
        tri.end1   = trip["end station location"].coordinates[1];

        return (  <>
         <Card style={{ width: 'auto' }} className={trip.usertype}>
            <h2>Bike: {trip.bikeid} ({trip.usertype})</h2>
            <p>{trip["start station name"]} - {trip["end station name"]} </p>
        </Card>
        <br></br>
        <MapContainer style={{ "height": "400px" }} center={[tri.start1, tri.start0]} zoom={15}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[tri.start1, tri.start0]}>
                <Tooltip permanent direction='right'>Start: {trip["start station name"]}</Tooltip>
            </Marker>
            <Marker position={[tri.end1,  tri.end0]}>
                <Tooltip permanent direction='right'>End: {trip["end station name"]}</Tooltip>
            </Marker>
        </MapContainer>

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Bike ID</Form.Label>
                <Form.Control type="number" name="bikeid" onChange={handleChange} defaultValue={trip.bikeid}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Birth Year</Form.Label>
                <Form.Control type="number" name="birth year" onChange={handleChange} defaultValue={trip["birth year"]}/>
            </Form.Group>
            <div>
            {(trip.usertype)==="Subscriber"?(
        <>			
	        <Form.Check
                type="radio"
                label="Subscriber"
                name="usertype"
                value="Subscriber"
                id="subscriber"
                onChange={handleChange}
				defaultChecked={true}
            />
            <Form.Check
                type="radio"
                label="Customer"
                name="usertype"
                value="Customer"
                id="customer"
                onChange={handleChange}
            />
        </>
                        ):(
        <>
            <Form.Check
                 type="radio"
                label="Subscriber"
                name="usertype"
                value="Subscriber"
                id="subscriber"
                onChange={handleChange}
            />
            <Form.Check
                type="radio"
                label="Customer"
                name="usertype"
                value="Customer"
                id="customer"
                onChange={handleChange}
                defaultChecked={true}
            />
        </>
                    )}
                </div>
            <hr />
            <Link to="/Trips" className="btn btn-secondary float-right ml-1">Back to Trips</Link>
            <Button type="submit" className="float-right" >Update Trip User</Button>
        </Form>


        </> )
    }else{
        return(<>
        <Card style={{ width: 'auto' }} >

            <h2>
                ERROR - Unable to find trip with id: {id}
             </h2>


        </Card>

         </>
        )
    }


}

export default Trip;