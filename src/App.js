import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [city, setCity] = useState("Kanpur");

  const [currentdata, setcurrentdata] = useState({
    img: "",
    temp: "",
    locationtime: "",
    humidity: ""
  });
  const [forecastdate, setForecastDate] = useState([{
    datechild1: "",
    sunrise1: "",
    sunset1: "",
    maxtemp1: "",
    mintemp1: ""
  }, {
    datechild2: "",
    sunrise2: "",
    sunset2: "",
    maxtemp2: "",
    mintemp2: ""
  }])
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8e2f7f4e03msh458739182fec963p1f17d9jsn77c8a4fe7d3f',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  useEffect(() => {
    const fetchdata = () => {
      fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, options)
        .then(
          response => response.json()
        ).then(
          response => {
            setcurrentdata({
              img: `${response.current.condition.icon}`,
              temp: `${response.current.temp_c}`,
              locationtime: `${response.location.localtime}`,
              humidity: `${response.current.humidity}`
            })
            setForecastDate([{
              datechild1: `${response.forecast.forecastday[1].date}`,
              sunrise1: `${response.forecast.forecastday[1].astro.sunrise}`,
              sunset1: `${response.forecast.forecastday[1].astro.sunset}`,
              maxtemp1: `${response.forecast.forecastday[1].day.maxtemp_c}`,
              mintemp1: `${response.forecast.forecastday[1].day.mintemp_c}`
            }, {
              datechild2: `${response.forecast.forecastday[2].date}`,
              sunrise2: `${response.forecast.forecastday[2].astro.sunrise}`,
              sunset2: `${response.forecast.forecastday[2].astro.sunset}`,
              maxtemp2: `${response.forecast.forecastday[2].day.maxtemp_c}`,
              mintemp2: `${response.forecast.forecastday[2].day.mintemp_c}`
            }
            ])
          }

        ).catch(
          err => console.error(err)
        );
    }
    fetchdata();
  }, [city])
  const changecity = (e) => {
    setCity(e.target.value);
    if (e.target.value === "") {
      setCity("kanpur")
    }
  }

  return (
    <div className="App" >

      <div className='card'>
        <h2 >Weather App</h2>
        <input id='input' type='text' placeholder='Enter city' onChange={changecity}></input>
        <div className='display_temp'>
          <b>{currentdata.locationtime}</b>
          <img id="img" src={currentdata.img}></img>
          <div className='temphumid'>
            <b>
              Temp<br />{currentdata.temp}&deg;C
            </b>
            <b>
              Humidity<br />{currentdata.humidity}
            </b>
          </div>
          <b>{city}</b>
        </div>
      </div>
      <div className='card'>
        <h2>Forecast</h2>
        <div className='forecastchild'>
          <b>{forecastdate[0].datechild1}</b>
          <div className='tempsun'>
            <div>
              <b>
                Sunrise<br />{forecastdate[0].sunrise1}
              </b>
              <b>
                Max-Temp<br />{forecastdate[0].maxtemp1}&deg;C
              </b>
            </div>
            <div>
              <b>
                Sunset<br />{forecastdate[0].sunset1}
              </b>
              <b>
                Min-Temp<br />{forecastdate[0].mintemp1}&deg;C
              </b>
            </div>
          </div>
        </div>
        <div className='forecastchild'>
          <b>{forecastdate[1].datechild2}</b>
          <div className='tempsun'>
            <div>
              <b>
                Sunrise<br />{forecastdate[1].sunrise2}
              </b>
              <b>
                Max-Temp<br />{forecastdate[1].maxtemp2}&deg;C
              </b>
            </div>
            <div>
              <b>
                Sunset<br />{forecastdate[1].sunset2}
              </b>
              <b>
                Min-Temp<br />{forecastdate[1].mintemp2}&deg;C
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
