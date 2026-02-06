import { getWeather } from "./weather.js";
import { chargeWeather } from "./chargeWeather.js";
import { chargeStart } from "./chargeStart.js";
import "./styles.css";

const d=document;
function putInfo(){
    const $content=d.querySelector(".content");
    const $form=d.querySelector("form");
    $form.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const inputCity=d.getElementById("city-input");
        const inputDate=d.getElementById("date-input");
        const info= await getWeather(inputCity.value,inputDate.value);
        if(!info){
            alert('Ciudad ingresada invalida / Fecha inalcanzable');
            return;
        }
        $content.innerHTML = "";
        chargeWeather(info,"content");
    })
}
d.addEventListener("DOMContentLoaded",()=>{
    chargeStart("content");
    putInfo();
})