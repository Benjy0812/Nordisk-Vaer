import { getLocation, fetchWeather } from './api.js'
import { getCordsFromLocation } from './state.js'
import { capitalizeFirstLetter, displayCurrentWeather, setupTempToggle } from './ui.js'

async function getWeather() {
  // Get the location name from users location input
  const locationName = document.getElementById('location-input').value.trim()
  if (!locationName) {
    alert('Please enter a location')
    return
  }
  document.getElementById('location-title').textContent =
    capitalizeFirstLetter(locationName)

  try {
    // Fetch latitude and longitude from users location input
    const locationCoordinates = await getLocation(locationName)
    if (!locationCoordinates.length) {
      alert('Location not found')
      return
    }
    // Fetch weather data with latitude and longitude and display weather
    const { lat, lon } = getCordsFromLocation(locationCoordinates)
    const weatherData = await fetchWeather(lat, lon)
    displayCurrentWeather(weatherData)
    setupTempToggle()
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const fetchButton = document.getElementById('fetch-button')
fetchButton.addEventListener('click', () => getWeather())
