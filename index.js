
// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Get DOM elements
const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

// Add click event listener
fetchButton.addEventListener('click', () => {
  const stateAbbr = stateInput.value.trim();

  // Clear error message
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');

  // Clear previous alerts
  alertsDisplay.innerHTML = '';

  // Fetch weather data
  fetch(weatherApi + stateAbbr)
    .then(response => response.json())
    .then(data => {
      // Extract title and alert count
      const title = data.title;
      const alertCount = data.features.length;

      // Display summary
      const summary = document.createElement('h2');
      summary.textContent =` ${title}: ${alertCount};`
      alertsDisplay.appendChild(summary);

      // Display alert headlines
      const list = document.createElement('ul');
      data.features.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert.properties.headline;
        list.appendChild(li);
      });
      alertsDisplay.appendChild(list);

      // Clear input
      stateInput.value = '';
    })
    .catch(error => {
      // Display error message
      errorMessage.textContent = error.message;
      errorMessage.classList.remove('hidden');
    });
});

