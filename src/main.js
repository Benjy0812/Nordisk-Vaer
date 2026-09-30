import { getLocation, fetchWeather } from './api.js'
import { getCordsFromLocation } from './state.js'
import {
  capitalizeFirstLetter,
  displayCurrentWeather,
  setupTempToggle,
} from './ui.js'

async function getWeather() {
  // Get the location name from users location input
  const locationName = document.getElementById('location-input').value.trim()
  const errorCard = document.getElementById('search-error')

  if (!locationName) {
    errorCard.textContent = 'Skriv inn en lokasjon'
    errorCard.hidden = false
    return
  }

  errorCard.hidden = true
  document.getElementById('weather-info').hidden = true

  try {
    // Fetch latitude and longitude from users location input
    const locationCoordinates = await getLocation(locationName)
    if (!locationCoordinates.length) {
      errorCard.textContent = 'Fant ikke denne lokasjonen'
      errorCard.hidden = false
      return
    }

    // Fetch weather data with latitude and longitude and display weather
    const { lat, lon } = getCordsFromLocation(locationCoordinates)
    const weatherData = await fetchWeather(lat, lon)
    document.getElementById('location-title').textContent =
      capitalizeFirstLetter(locationName)
    displayCurrentWeather(weatherData)
    setupTempToggle()
    document.getElementById('weather-info').hidden = false
  } catch (err) {
    console.error(err)
    errorCard.textContent = 'Noe gikk galt. Prøv igjen'
    errorCard.hidden = false
  }
}

document.getElementById('weather-form').addEventListener('submit', (event) => {
  event.preventDefault()
  void getWeather()
})
