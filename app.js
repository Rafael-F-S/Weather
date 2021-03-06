window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/3c02258c0fe4ed8dd1a1d2eeaf3a7a2f/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //set DOM elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Celsius formula
                let celsius = (temperature - 32) * (0.55555);

                //setIcons
                setIcons(icon, document.querySelector(".icon"));

                //Change temperature to celsius/fareheit
                temperatureSection.addEventListener("click", () =>{
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.round(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
    
});