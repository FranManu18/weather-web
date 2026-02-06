const d=document;

export function chargeStart(id){
    const $content=d.getElementById(id);
    $content.innerHTML=`
        <form class="city-form">
            <input 
                type="text"
                id="city-input"
                class="input"
                placeholder="Enter a city... (ej: Londres, París, Tokyo)"
                required
                autocomplete="off"
            >
            <input type="date"
                id="date-input"
    class="input"
    required
    autocomplete="off">
            <button type="submit">
                <span>Search weather</span>
            </button>
        </form>`
}