import React,{useEffect, useState} from 'react';
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {

    const[searchValue,setSearchValue]=useState("Kathmandu");
    const[tempInfo,setTempInfo]=useState({});
    
    const getWeatherInfo = async()=>{ 
        try {
            let url = `
            https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=41f66091134ad762c47c455d035c492f`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const{name}=data;
            const{speed}=data.wind;
            const{country,sunset}=data.sys;

            const myNewWatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name ,
                country,
                speed,
                sunset,
            };
            setTempInfo(myNewWatherInfo);
        
        } catch (error) {
            console.log(error);
        }
      };
    useEffect(()=>{
        getWeatherInfo();
    },[]);
    return(
    <>
      <div className="wrap">
        <div className="search">
            <input type="search" 
            placeholder='Search...' 
            autoFocus 
            id='search' 
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
             />

            <button className="searchButton" type="button" onClick={getWeatherInfo}>
                Search
            </button>
        </div>
      </div>

      {/* //our temp card */}
        <Weathercard {...tempInfo}/>
    </>
  )
}

export default Temp
