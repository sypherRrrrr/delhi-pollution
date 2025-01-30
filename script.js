const apiKey = "546492f2998a588b63f8fa268a18a87f";
const locations = [
    { name: "Anand Vihar", lat: 28.6492, lon: 77.3027 },
    { name: "RK Puram", lat: 28.5665, lon: 77.1734 },
    { name: "Punjabi Bagh", lat: 28.6723, lon: 77.1310 },
    { name: "Dwarka", lat: 28.6139, lon: 77.2090 },
    { name: "ITO", lat: 28.6255, lon: 77.2167 },
    { name: "Ashok Vihar", lat: 28.7041, lon: 77.1025 }
];

async function fetchAQI() {
    const listElement = document.getElementById("pollution-list");
    listElement.innerHTML = "";
    
    for (let loc of locations) {
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${loc.lat}&lon=${loc.lon}&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.list.length > 0) {
                const aqi = data.list[0].main.aqi;
                const listItem = document.createElement("li");
                listItem.textContent = `${loc.name}: AQI ${aqi}`;
                listItem.className = getAQIClass(aqi);
                listElement.appendChild(listItem);
            }
        } catch (error) {
            console.error(`Error fetching AQI data for ${loc.name}:`, error);
        }
    }
}

function getAQIClass(aqi) {
    if (aqi === 1) return "good";
    if (aqi === 2) return "fair";
    if (aqi === 3) return "moderate";
    if (aqi === 4) return "poor";
    if (aqi === 5) return "very-poor";
    return "hazardous";
}

document.addEventListener("DOMContentLoaded", fetchAQI);
setInterval(fetchAQI, 60000);

