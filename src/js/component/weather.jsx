import React, {useState, useEffect} from "react";


const Weather = () => {

    const [temperature, setTemperature] = useState(" ");
    const [wind, setWind] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [city, setCity] = useState(" ");
    
    useEffect(() => {
      getTempFromApi();

    },[]);
    
    const getTempFromApi = () => {
        fetch("https://goweather.herokuapp.com/weather/"+city)
        .then(response => {
        if (!response.ok) {
            throw Error (response.statusText);
        }
        //Read the response as json
        return response.json();
       })
       
       .then(responseAsJson => {
            console.log ("Temperature", responseAsJson.temperature);
            setTemperature(responseAsJson.temperature);
            console.log ("Wind", responseAsJson.wind);
            setWind(responseAsJson.wind);
            console.log ("Description", responseAsJson.description);
            setDescription(responseAsJson.description);
       })
       .catch(error => {
            console.error("Looks like there was a problem: \n", error);
       });
    };
    
    // check if the input was typed
    const checkCity = () => {
        if(city===" ") { 
            alert("Insert a city name please!...")
        } else {
           getTempFromApi();  
        }
    }

    return (
        <div className="text-center">
            <input 
                defaultvalue={city} 
                onChange={(e) => setCity(e.target.value)}
                placeholder="insert a city"
            />
            <div>
               <h1>{city}</h1> 
            </div>
            <button type="submit" onClick={checkCity}
            >Get Temperature</button> 
            <div>
                <p>Temperature:{temperature}</p>
            </div>
            <div>
               <p>Wind:{wind}</p>
            </div>
            <div>
                <p>Description:{description}</p>
            </div>
        </div>
    )
}

export default Weather;
