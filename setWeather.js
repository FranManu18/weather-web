export function weatherSet() {
  const text = document.querySelector(".description"),
    temp = document.querySelector(".temp"),
    humidity = document.querySelector(".humidity"),
    date = document.querySelector(".date"),
    img = document.querySelector("img");

  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  async function getWeather(city, hour) {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Sumar 1 ya que los meses empiezan desde 0
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const fechaFormateada = `${año}-${mes}-${dia}`;
    if (hour < 24) {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${fechaFormateada}T${hour}:00:00?key=VFZUDPUADRHXDZNUD9SR2MTNA`
      );
      if (!response.ok) {
        text.textContent = "No se ingreso una ciudad valida";
      } else {
        const weatherData = await response.json();
        date.textContent = `${fechaFormateada}- ${hour}:00`;
        const tempF = weatherData.days[0].hours[hour].temp;
        const tempC = fahrenheitToCelsius(tempF).toFixed(1);
        temp.innerHTML = `La temperatura va a ser de ${tempF}°F (${tempC}°C)`;
        humidity.innerHTML = `Humedad: ${weatherData.days[0].hours[hour].humidity}`;
        text.textContent = weatherData.days[0].hours[hour].conditions;
      }
    } else {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=VFZUDPUADRHXDZNUD9SR2MTNA`
      );
      if (!response.ok) {
        date.innerHTML = "";
        temp.innerHTML = "";
        text.innerHTML = "";
        text.textContent = "No se ingreso una ciudad valida";
      } else {
        const weatherData = await response.json();
        date.textContent = `${fechaFormateada}- General`;
        const tempF = weatherData.days[0].temp;
        const tempC = fahrenheitToCelsius(tempF).toFixed(1);
        temp.innerHTML = `La temperatura va a ser de ${tempF}°F (${tempC}°C)`;
        const tempMaxF = weatherData.days[0].tempmax;
        const tempMaxC = fahrenheitToCelsius(tempMaxF).toFixed(1);
        const tempMinF = weatherData.days[0].tempmin;
        const tempMinC = fahrenheitToCelsius(tempMinF).toFixed(1);
        text.innerHTML = `<div>${weatherData.days[0].description}</div><div>Max:${tempMaxF}°F (${tempMaxC}°C) min:${tempMinF}°F (${tempMinC}°C)</div>`;
      }
    }
  }

  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    const hour = document.getElementById("time").value;
    if (city && hour) {
      getWeather(city, hour);
    } else if (city && !hour) {
      getWeather(city, 24);
    } else {
      text.textContent = "No se ingreso una ciudad";
    }
  });
}
