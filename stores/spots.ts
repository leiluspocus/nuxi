import { defineStore } from 'pinia'
import { getSpots } from '../api/spots'
import { type GeolocationCoordinates } from '../types/GeolocationCoordinates'

/*export const useSpotsStore = defineStore('spots', {
  state: () => ({ spots: [] as Spot[], nb: Number, currentLocation: {} as GeolocationCoordinates }),
  getters: {},
  actions: {
    async init() {
      this.spots = await getSpots()
      this.nb = 42
      return this.spots;
    },
    storeLocation(position: GeolocationCoordinates) {
      this.currentLocation = position
    }
  }
})*/


export const useSpotsStore = defineStore('appStore', () => {
  const spots = ref([])
  const nb = ref(2)
  let currentLocation = ref ({})

  async function gSpots() {
    nb.value = 42
    spots.value = await getSpots()
    console.log(spots.value)
  }

  function storeLocation(position: GeolocationCoordinates) {
    currentLocation.value = position
  }
  return { spots, nb, currentLocation, gSpots, storeLocation }
})
