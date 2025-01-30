const apiKey = "546492f2998a588b63f8fa268a18a87f";
const city = "Delhi";
const locations = ["Anand Vihar", "RK Puram", "Punjabi Bagh", "Dwarka", "ITO", "Ashok Vihar"];

async function fetchAQI() {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=28.7041&lon=77.1025&appid=${546492f2998a588b63f8fa268a18a87f}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.list && data.list.length > 0) {
            const aqi = data.list[0].main.aqi;
            document.getElementById("aqi").textContent = aqi;
            updateStatus(aqi);
            fetchTopLocations();
        } else {
            document.getElementById("aqi").textContent = "Data not available";
        }
    } catch (error) {
        console.error("Error fetching AQI data:", error);
        document.getElementById("aqi").textContent = "Error loading data";
    }
}

function updateStatus(aqi) {
    let statusText = "";
    if (aqi === 1) {
        statusText = "Good";
        document.body.style.backgroundColor = "#90EE90";
    } else if (aqi === 2) {
        statusText = "Fair";
        document.body.style.backgroundColor = "#FFD700";
    } else if (aqi === 3) {
        statusText = "Moderate";
        document.body.style.backgroundColor = "#FFA500";
    } else if (aqi === 4) {
        statusText = "Poor";
        document.body.style.backgroundColor = "#FF4500";
        alert("Warning: High pollution levels!");
    } else {
        statusText = "Very Poor";
        document.body.style.backgroundColor = "#8B0000";
        alert("Severe Pollution Alert! Avoid outdoor activities.");
    }
    document.getElementById("status").textContent = statusText;
}

async function fetchTopLocations() {
    const listElement = document.getElementById("pollution-list");
    listElement.innerHTML = "";

    for (let loc of locations) {
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=28.7041&lon=77.1025&appid=${546492f2998a588b63f8fa268a18a87f}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.list && data.list.length > 0) {
                const aqi = data.list[0].main.aqi;
                const listItem = document.createElement("li");
                listItem.textContent = `${loc}: AQI ${aqi}`;
                listItem.className = getAQIClass(aqi);
                listElement.appendChild(listItem);
            }
        } catch (error) {
            console.error(`Error fetching AQI data for ${loc}:`, error);
        }
    }
}

function getAQIClass(aqi) {
    if (aqi === 1) return "good";
    if (aqi === 2) return "fair";
    if (aqi === 3) return "moderate";
    if (aqi === 4) return "poor";
    return "very-poor";
}

fetchAQI();
setInterval(fetchAQI, 60000);