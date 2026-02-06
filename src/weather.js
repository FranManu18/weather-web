const d=document;

export async function getWeather(city,date){
    try{
        const response=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=VFZUDPUADRHXDZNUD9SR2MTNA`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data=await response.json();
         if (data.message) {
            throw new Error(data.message);
        }
        const todayData=data.days[0];
        const hoursInfo=todayData.hours.map(hour=>({
            hora: hour.datetime,        
            temperatura: hour.temp,      
            sensacionTermica: hour.feelslike,
            condiciones: hour.conditions,  
            humedad: hour.humidity,
            probabilidadLluvia: hour.precipprob,
            viento: hour.windspeed,
            icono: hour.icon
        }));
        const weatherInfo={
            city: data.address,
            description: data.description,
            timezone: data.timezone,
            today:{
                fecha:todayData.datetime,
                tempMax: todayData.tempmax,
                tempMin: todayData.tempmin,
                tempPromedio: todayData.temp,
                descripcion: todayData.description,
                condiciones: todayData.conditions,
                humedad: todayData.humidity,
                probabilidadLluvia: todayData.precipprob,
                horas:hoursInfo,
                amanecer:todayData.sunrise,
                atardecer:todayData.sunset
            }
        };
        return weatherInfo;
    }catch(error){
        console.error("❌ Error completo:", error);
    }
}
