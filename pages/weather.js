import Navbar from '@/components/Dashboard/Navbar';
import FlexDiv from '@/components/FlexDiv';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
// import { WiDaySunny } from 'weather-icons-react';

// /weather

const Weather = () => {
  // Takes the data from a API call
  let [ data, setData] = useState(() => getWeatherData());

  function UTCtoDate(timestamp) {
    let converted = new Date(timestamp);
    return converted.getHours() + ":" + converted.getSeconds();
  }
  
  async function callWeatherAPI(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const KEY = '1a63b31fa752648c49caa682197af3d8';

    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${KEY}&units=imperial`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response);
      }
      ).catch(err => console.error(err));
  }

  // Call the OpenWeatherMap API and render the information
  async function getWeatherData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback 
        callWeatherAPI,

        // Failure callback
        _ => { window.alert("Unable to retrieve location data. Please try again.") },

        // Timeout the request after 30 seconds
        { timeout: 30000 }
      );
    } else {
      window.alert("Unable to get your location. Please try again");
    }
  }
  
  return (
    <>
      <Navbar></Navbar>
      <GridDiv>
        <InfoWrapper style={{gridArea: "Icon"}}>
          <h2>{data.weather ? data.weather[0]?.main : "..."}</h2>
          <img  src={data.weather ? "https://openweathermap.org/payload/api/media/file/" + data.weather[0].icon + ".png" : "..."}></img>
        </InfoWrapper>
        <InfoWrapper style={{gridArea: "Description"}}>
          <h2>{data.weather ? data.weather[0]?.main : "..."}</h2>
        </InfoWrapper>
        <InfoWrapper style={{gridArea: "Facts"}}>
          <Header>Weather for {data?.name || "..."}</Header>
          <ul>
            <li><strong>Temperature: </strong>{data.main?.temp || "..."} F</li>
            <li><strong>Range: </strong>H: {data.main?.temp_max} F L: {data.main?.temp_min || "..."} F</li>
            <li><strong>Feels Like: </strong>{data.main?.feels_like || "..."} F</li>
            <li><strong>Humidity: </strong>{data.main?.humidity || "..."}%</li>
            <li><strong>Pressure: </strong>{data.main?.pressure || "..."} inHg</li>
            <li><strong>Wind: </strong> Winds of {data.wind?.speed || "..."} mph{data.wind?.gust ? ` and gusts up to ${data.wind?.gust}` : ""}</li>
          </ul>
          <br/>
          <ul>
            <li><strong>Sunrise: </strong>{data.sys?.sunrise ? UTCtoDate(data.sys.sunrise * 1000) : "..."}</li>
            <li><strong>Sunset: </strong>{data.sys?.sunset ? UTCtoDate(data.sys.sunset * 1000) : "..."}</li>
          </ul>
        </InfoWrapper>
      </GridDiv>
    </>
  )
}

const GridDiv = styled.div`
  width: 75%; 
  min-height: 80vh;
  margin: 4vh auto;
  display: grid;
  grid-template-areas: 
    "Icon        Facts"
    "Icon        Facts"
    "Description Facts"
    "Description Facts";
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto auto auto;
  row-gap: 3rem;
  column-gap: 2rem;;
`;
const Header = styled.h1`
  font-size: 26px;
  color: #8a37b0;
  margin-bottom: 0.7em;
`;

const InfoWrapper = styled(FlexDiv)`
  flex-direction: column;
  box-shadow: -3.5px 3.5px 0 3.5px #555;
  background: #f0f5f4;
  padding: 1.5rem;
  border: 1px solid black;
  border-radius: 4px;
  line-height: 1.5em;
  
  ul { width: 75%; }  
    
  li {
    list-style: none;
    padding: 0.8em 0.5em;

    &:not(:first-of-type) {
      border-top: 1px solid black;
    }
  }
`;

const Section = styled.div`
  width: 80%;
  min-height: 81vh;
  margin: 5vh auto;
  background: #f4f781;
  padding: 1.5rem;
  border-radius: 4px;
  border-top: none;
  border: 1px solid black;
`;



export default Weather;