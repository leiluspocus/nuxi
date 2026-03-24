import { defineStore } from 'pinia'
import { type GeolocationCoordinates } from '../types/GeolocationCoordinates'

export const useSpotsStore = defineStore('appStore', () => {
  const spots = ref([])
  const nb = ref(2)
  let currentLocation = ref ({})

  async function gSpots() {
    nb.value = 42
    spots.value = await $fetch('/api/spots')
  }

  function storeLocation(position: GeolocationCoordinates) {
    currentLocation.value = position
  }
  return { spots, nb, currentLocation, gSpots, storeLocation }
})
