import { chargeStart } from "./chargeStart.js";

const d=document;
let unidad="F"
let currentInfo=null;
let tempData=null;

export function chargeWeather(info,id){
    if(!info){
        console.log("No hay info");
    }

    currentInfo=info;
    tempData={
        tempMin:info.today.tempMin,
        tempMax:info.today.tempMax,
        tempPromedio:info.today.tempPromedio,
        horas:info.today.horas.map(hour=>({
            hora:hour.hora,
            sensacionTermica:hour.sensacionTermica,
            temperatura:hour.temperatura,
            condiciones: hour.condiciones,  
            humedad: hour.humedad,
            probabilidadLluvia: hour.probabilidadLluvia,
            viento: hour.viento,
            icono: hour.icono
        })),
    }

    cargarDatos(id)
}

function cargarDatos(id){
    const $content=d.getElementById(id);
    $content.innerHTML= "";
    $content.innerHTML+= `
            <!-- Información general -->
            <div id="weather-container">
            <div class="weather-header">
                <h2>📍 ${currentInfo.city}</h2>
                <p class="timezone">🕐 Timezone: ${currentInfo.timezone}</p>
                <div class="today-summary">
                    <p>🌡️ Temperature: ${currentInfo.today.tempMin} ${unidad} - ${currentInfo.today.tempMax} ${unidad}</p>
                    <p>☁️ ${currentInfo.today.descripcion}</p>
                    <p>🌅 Sunrise: ${currentInfo.today.amanecer} | 🌇 Sunset: ${currentInfo.today.atardecer}</p>
                </div>
            </div>
            
            <!-- Scroll horizontal con las horas -->
            <div class="hours-section">
                <h3>📊 Hourly weather</h3>
                <div class="hours-container">
                    ${tempData.horas.map(hora => `
                        <div class="hour-card">
                            <div class="hour-time">${formatHour(hora.hora)}</div>
                            <div class="hour-icon">${getWeatherIcon(hora.icono)}</div>
                            <div class="hour-temp">${hora.temperatura} ${unidad}</div>
                            <div class="hour-feels">Sensation: ${Math.round(hora.sensacionTermica)} ${unidad}</div>
                            <div class="hour-condition">${hora.condiciones}</div>
                            <div class="hour-details">
                                <span>💧 ${hora.probabilidadLluvia}%</span>
                                <span>💨 ${Math.round(hora.viento)} mph</span>
                                <span>💦 ${Math.round(hora.humedad)}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="back-to-start">Go back</button>
            <button class="toggle-temp">Change temperature unit</button>
            </div>`
}

function formatHour(timeString) {
    // Convierte "00:00:00" a "12 AM", "13:00:00" a "1 PM"
    const [hour] = timeString.split(':');
    const hourNum = parseInt(hour);
    
    if (hourNum === 0) return "12 AM";
    if (hourNum === 12) return "12 PM";
    if (hourNum > 12) return `${hourNum - 12} PM`;
    return `${hourNum} AM`;
}

function FarenheitToCelsius(number){
    return Math.round((number-32)/1.8);
}

d.addEventListener("click",(e)=>{
    if(e.target.classList.contains("back-to-start")){
        chargeStart("content");
        return;
    }

    if(e.target.classList.contains("toggle-temp")){
        if(unidad==="F"){
            unidad="C";
            tempData.tempMin=FarenheitToCelsius(currentInfo.today.tempMin),
            tempData.tempMax=FarenheitToCelsius(currentInfo.today.tempMax),
            tempData.tempPromedio=FarenheitToCelsius(currentInfo.today.tempPromedio);
            tempData.horas.forEach(hour => {
                hour.sensacionTermica=FarenheitToCelsius(hour.sensacionTermica),
                hour.temperatura=FarenheitToCelsius(hour.temperatura)
            });
            cargarDatos("content");
            return;
        }
        if(unidad==="C"){
            unidad="F";
            tempData.tempMin=currentInfo.today.tempMin,
            tempData.tempMax=currentInfo.today.tempMax,
            tempData.tempPromedio=currentInfo.today.tempPromedio;
            tempData.horas=currentInfo.today.horas.map(hour=>({
                hora:hour.hora,
                sensacionTermica:hour.sensacionTermica,
                temperatura:hour.temperatura,
                condiciones: hour.condiciones,  
                humedad: hour.humedad,
                probabilidadLluvia: hour.probabilidadLluvia,
                viento: hour.viento,
                icono: hour.icono
            }))
            cargarDatos("content");
            return;
        }
    }
})

function getWeatherIcon(iconName) {
    const icons = {
        'rain': '🌧️',
        'cloudy': '☁️',
        'partly-cloudy-day': '⛅',
        'partly-cloudy-night': '🌙',
        'clear-day': '☀️',
        'clear-night': '🌙',
        'snow': '❄️',
        'wind': '💨',
        'fog': '🌫️'
    };
    return icons[iconName] || '🌤️';
}