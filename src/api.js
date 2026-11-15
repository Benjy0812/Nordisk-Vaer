async function fetchJson(url, errorMessage) {
  let response
  try {
    response = await fetch(url)
  } catch {
    throw new Error('NetworkError')
  }
  if (!response.ok) throw new Error(errorMessage)
  return await response.json()
}

// Fetch latitude and longitude from the Nominatim API based on users location
export async function getLocation(place) {
  return fetchJson(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1&email=developer.cause102@passmail.net`,
    'Failed to get location',
  )
}

// Fetch weather data from MET API with latitude and longitude from nominatim API
export async function fetchWeather(lat, lon) {
  return fetchJson(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
    'Failed to fetch weather',
  )
}
