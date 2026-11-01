
async function getWeatherDetails() {

    try {

        let city = document.getElementById("cityInput").value.trim();
        console.log("Input value:", city);

        if (city === "") {
            alert("Please enter a city name");
            return;
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);

        if (!response.ok) {
            alert("City not found!");
            return;
        }
        console.log(response.status);



        const allDetails = await response.json()
        console.log(allDetails);

        document.getElementById("cityname").innerHTML = `${allDetails.name},${allDetails.sys.country}`
        document.getElementById("temperature").innerHTML = `${Math.round(allDetails.main.temp)}<span>°C</span>`
        document.getElementById("feels-like").innerHTML = `Feels like  ${Math.round(allDetails.main.feels_like)}<span>°C</span>`
        document.getElementById("weather-description").innerHTML = `${allDetails.weather[0].description} `
        document.getElementById("humidity").innerHTML = `${allDetails.main.humidity} %`
        document.getElementById("wind").innerHTML = `${allDetails.wind.speed} m/s`
        document.getElementById("pressure").innerHTML = `${allDetails.main.pressure} hpa`
        document.getElementById("visibility").innerHTML = `${allDetails.visibility / 1000} km`
        document.getElementById("cloud-cover").innerHTML = `${allDetails.clouds.all} %`
        document.getElementById("temp-range").innerHTML = `${Math.round(allDetails.main.temp_min)}<span>° </span>/ ${Math.round(allDetails.main.temp_max)}<span>° </span>`

        let dateTime = new Date(allDetails.dt * 1000);

        let date = dateTime.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

        let time = dateTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        document.getElementById("date").textContent = date;
        document.getElementById("time").textContent = time;

        let sunriseTime = new Date((allDetails.sys.sunrise + allDetails.timezone) * 1000);

        let sunsetTime = new Date((allDetails.sys.sunset + allDetails.timezone) * 1000);

        let sunrise = sunriseTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        });

        let sunset = sunsetTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        });

        document.getElementById("sunrise").textContent = sunrise;
        document.getElementById("sunset").textContent = sunset;


    } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again.");

    }

}
getWeatherDetails()