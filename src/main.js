import { fetchWeather, getLocation } from './api.js'
import { disableUi, enableUi, getCordsFromLocation } from './state.js'
import {
  capitalizeFirstLetter,
  displayCurrentWeather,
  setupTempToggle,
} from './ui.js'

async function getWeather() {
  // Get the location name from users location input
  const locationName = document.getElementById('location-input').value.trim()
  const errorCard = document.getElementById('error-card')
  const infoCard = document.getElementById('info-card')

  disableUi()
  const startedAt = Date.now()
  infoCard.textContent = 'Fetching weather'
  infoCard.hidden = false

  // If error card is visible hide
  errorCard.hidden = true
  // If weather is visible hide
  document.getElementById('weather-info').hidden = true

  try {
    if (!locationName) {
      infoCard.hidden = true
      errorCard.textContent = 'Skriv inn en lokasjon'
      errorCard.hidden = false
      return
    }

    // Fetch latitude and longitude from users location input
    const locationCoordinates = await getLocation(locationName)
    if (!locationCoordinates.length) {
      infoCard.hidden = true
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
    document.getElementById('initial-message').hidden = true
    infoCard.hidden = true
    document.getElementById('weather-info').hidden = false
  } catch (err) {
    console.error(err)
    infoCard.hidden = true
    errorCard.textContent = 'Noe gikk galt. Prøv igjen'
    errorCard.hidden = false
  } finally {
    const remaining = Math.max(0, 1000 - (Date.now() - startedAt))
    setTimeout(enableUi, remaining)
  }
}

document.getElementById('weather-form').addEventListener('submit', (event) => {
  event.preventDefault()
  void getWeather()
})
