import { useState } from "react";
import axios from "axios"


export default function App() {
  const [msg,setMsg] = useState(null)
  const [lat,setLat] = useState(null)
  const [lng,setLng] = useState(null)
  async function locate(){
    try {
      navigator.geolocation.getCurrentPosition((position) => {setLat(position.coords.latitude), setLng(position.coords.longitude)});
    } catch (error) {
      setMsg(error) || setMsg("geolocation is not supported by the browser")
    }
  }
  

  async function response(){
    try {
      const request = await axios.get(`https://api.olamaps.io/places/v1/nearbysearch?layers=venue&types=restaurant&location=${lat}%2C${lng}&radius=6000&strictbounds=false&withCentroid=false&limit=1&api_key=SoAzKWcK3PzwIdBSBJ9psGevuIXpdVaUq43BiRQf`)
      const data = request.data.predictions;
      console.log(data)
      const listplaces = data.map(place => <li key={place.place_id}><h1>{place.description}</h1></li>);
      setMsg(listplaces)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
    <br />
    <button onClick={() => locate()}>click meee</button>
    <br />
    <h1>lat : {lat}</h1>
    <h1>lng : {lng}</h1>
    <button onClick={() => response()}>request</button>
    <p>{msg}</p>
    </>
  )
}