import { useSpotsStore } from '../stores/spots'

function getCurrentLocation(): boolean {
  if ('geolocation' in navigator) {
    const store = useSpotsStore()
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude, accuracy } = position.coords
      store.storeLocation({ longitude, latitude, accuracy })
    })
    return true
  } else {
    return false
  }
}

export { getCurrentLocation }
