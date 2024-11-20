import { useState } from "react";
import axios from "axios"




export default function App() {
  const [msg,setMsg] = useState(null)
  const [lat,setLat] = useState(null)
  const [lng,setLng] = useState(null)
  const [status, setStatus] = useState(null)
  const [accuracy, setAccuracy] = useState(null)
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  function locate(){
    navigator.geolocation.getCurrentPosition((position) => {setLat(position.coords.latitude); setLng(position.coords.longitude); setAccuracy(position.coords.accuracy); setIsLocationLoading(false)}, (err) => {setMsg(err)});  
    if (Math.round(accuracy) > 50 ) {
      alert("Very low accuracy")
    }
  }
  

  async function response(){
    try {
      const request = await axios.get(`https://api.olamaps.io/places/v1/nearbysearch?layers=venue&types=restaurant&location=${lat}%2C${lng}&radius=6000&strictbounds=false&withCentroid=false&limit=5&api_key=${import.meta.env.VITE_API_KEY}`);
      const data = request.data.predictions;
      console.log(request);
      const listplaces = data.map(place => <li key={place.place_id} className="flex flex-col border-2 rounded-xl p-2"><h1 className="text-xl text-transparent font-semibold w-fit bg-gradient-to-r from-cyan-400 to-sky-500  bg-clip-text ">{place.structured_formatting.main_text}</h1><h2>{place.structured_formatting.secondary_text}</h2></li>);
      setMsg(listplaces);
      setStatus(request.data.status)
    } catch (error) {
      setMsg(error.response.data.info_messages[0])
    } finally{
      setIsResponseLoading(false)
    }
  }



  return (
    <>
    <div className="flex flex-col items-center border-2 p-3 rounded-xl">
      <h1 className="text-2xl font-bold">whereTOeat</h1>
      <br />
      <button onClick={() => {locate() && setIsLocationLoading(!isLocationLoading)}} className="border-2 rounded-xl p-2 m-1 bg-gradient-to-r from-cyan-400 to-sky-500 hover:scale-105">
        {isLocationLoading ? "Getting location..." : "Get Location"}
      </button>
      <h1>latitude :{lat}</h1>
      <h1>longitude : {lng}</h1>
    </div>
    
    <div className="flex flex-col p-3">
      <button onClick={() => response() && setIsResponseLoading(!isResponseLoading)} className="border-2 rounded-xl p-2 m-1 bg-gradient-to-r from-cyan-400 to-sky-500 hover:scale-105">{isResponseLoading ? "Loading restaurants..." : "Get restaurants"}</button>
      <div className="flex flex-col gap-3">
        {msg}
      </div>
      
    </div>
    <footer><h1>Status: {status}</h1></footer>
    <footer><h1>Accuracy: {accuracy}</h1></footer>
    </>
  )
}