//index.js

const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Fetch alerts
async function fetchWeatherAlerts(state) {
  try {
    // Input validation
    if (!state || state.length !== 2) {
      throw new Error("Please enter a valid 2-letter state code.");
    }

    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts.");
    }

    const data = await response.json();
    console.log(data);

    // Display alerts
    displayAlerts(data, state);

    clearError();

    clearInput();

  } catch (error) {
    displayError(error.message);
  }
}

function displayAlerts(data, state) {
  const alertsContainer = document.getElementById("alerts");
  alertsContainer.innerHTML = ""; 

  const alerts = data.features;

  
  const summary = document.createElement("h2");
  summary.textContent = `Current watches, warnings, and advisories for ${state.toUpperCase()}: ${alerts.length}`;
  alertsContainer.appendChild(summary);
  if (alerts.length === 0) {
    const noAlerts = document.createElement("p");
    noAlerts.textContent = "No active alerts for this state.";
    alertsContainer.appendChild(noAlerts);
    return;

  }
  const list = document.createElement("ul");

  alerts.forEach(alert => {
    const listItem = document.createElement("li");
    listItem.textContent = alert.properties.headline;
    list.appendChild(listItem);
  });

  alertsContainer.appendChild(list);
}
function displayError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}
function clearError() {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
}
function clearInput() {
  const input = document.getElementById("state-input");
  input.value = "";
}

document.getElementById("fetch-btn").addEventListener("click", () => {
  const state = document.getElementById("state-input").value.trim().toUpperCase();
  fetchWeatherAlerts(state);

});