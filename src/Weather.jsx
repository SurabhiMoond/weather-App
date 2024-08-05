import { Box, Button, Card, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LuCloudSun } from "react-icons/lu";
import { LuCloudHail } from "react-icons/lu";

export const Weather = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const apiKey = "a3525937ee2111327e0e67adb29bef15";

  const fetchWeather = async () => {
    if (!input) {
      setError("City name is required");
      return;
    }
   try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      console.log(res);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("Failed to fetch weather data");
    }
  };
  useEffect(() => {
    ref.current.focus();
    fetchWeather();
  }, []);

  const handleWeather = () => {
    fetchWeather();
  };

return (
  <>
    <Heading style={{ fontSize: "25px", paddingBottom: "10px" }}> Today Weather </Heading>
    <Card h={300} bg={"#fbf8f8"} rounded={"10"} p={10}>
      <Box w={300}>
        <Input type="text" ref={ref} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter city name" />
        {error && <Text color="red.500">{error}</Text>}
        <Button bg={"#f2e9e9"} mt={"3"} mb={"5"} onClick={handleWeather}>Get Weather</Button>
        {weather && (
           <>
            <Heading style={{ fontSize: "20px" }}>{weather.name}</Heading>
            <Text>Temp is {weather.main.temp}°C</Text>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              {weather.weather[0].main === "Clouds" && (<span style={{display:'flex', marginTop:'10px'}}>Feel likes Cloudy &nbsp;<LuCloudSun /></span>)}
              {weather.weather[0].main === "Drizzle" && (<span style={{display:'flex', marginTop:'10px'}}>Feel likes Rainy &nbsp; <LuCloudHail style={{fontSize:'20px'}}/></span>)}
            </div>
          </>
        )}
      </Box>
    </Card>
  </>
);
};
