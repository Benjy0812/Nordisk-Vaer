// Fetch latitude and longitude from the Nominatim API based on users location
export async function getLocation(place) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1&email=developer.cause102@passmail.net`,
  )
  if (!response.ok) throw new Error('Failed to get location')
  return await response.json()
}

// Fetch weather data from MET API with latitude and longitude from nominatim API
export async function fetchWeather(lat, lon) {
  const response = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
  )
  if (!response.ok) throw new Error('Failed to fetch weather')
  return await response.json()
}
