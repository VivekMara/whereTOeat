import { useState } from "react";
import axios from "axios"


export default function App() {
  const [msg,setMsg] = useState(null)
  const [lat,setLat] = useState(null)
  const [lng,setLng] = useState(null)
  const [status, setStatus] = useState(null)

  
  function locate(){
    navigator.geolocation.getCurrentPosition((position) => {setLat(position.coords.latitude), setLng(position.coords.longitude)}, (err) => {setMsg(err)});
  }
  

  async function response(){
    try {
      const request = await axios.get(`https://api.olamaps.io/places/v1/nearbysearch?layers=venue&types=restaurants&location=${lat}%2C${lng}&radius=6000&strictbounds=false&withCentroid=false&limit=5&api_key=${import.meta.env.VITE_API_KEY}`);
      const data = request.data.predictions;
      console.log(request.data);
      const listplaces = data.map(place => <li key={place.place_id} className="flex flex-col border-2 rounded-xl p-2"><h1 className="text-xl text-transparent font-semibold w-fit bg-gradient-to-r from-cyan-400 to-sky-500 hover:scale-105 bg-clip-text ">{place.structured_formatting.main_text}</h1><h2>{place.structured_formatting.secondary_text}</h2></li>);
      setMsg(listplaces);
      setStatus(request.data.status)
    } catch (error) {
      setMsg(error.response.data.info_messages[0])
    }
  }


  return (
    <>
    <div className="flex flex-col items-center border-2 p-3 rounded-xl">
      <h1 className="text-2xl font-bold">whatTOeat</h1>
      <br />
      <button onClick={() => {locate()}} className="border-2 rounded-xl p-2 m-1 bg-gradient-to-r from-cyan-400 to-sky-500 hover:scale-105">Get location</button>
      <h1>latitude : {lat}</h1>
      <h1>longitude : {lng}</h1>
    </div>
    
    <div className="flex flex-col p-3">
      <button onClick={() => response()} className="border-2 rounded-xl p-2 m-1 bg-gradient-to-r from-cyan-400 to-sky-500 hover:scale-105">Get restaurants</button>
      <div className="flex flex-col gap-3">{msg}</div>
      
    </div>
    <footer><h1>{status}</h1></footer>
    </>
  )
}