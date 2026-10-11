// Extract latitude and longitude from the location data
export function getCordsFromLocation(location) {
  const { lat, lon } = location[0]
  return { lat: parseFloat(lat), lon: parseFloat(lon) }
}

export function disableUi() {
  document.getElementById('location-input').disabled = true
  document.getElementById('fetch-button').disabled = true
  document.getElementById('temp-toggle').disabled = true
}

export function enableUi() {
  document.getElementById('location-input').disabled = false
  document.getElementById('fetch-button').disabled = false
  document.getElementById('temp-toggle').disabled = false
}
