<script setup lang="ts">
import { useSpotsStore } from '../stores/spots'
import { type Spot } from '../types/Spot'
import { MapPinIcon } from '@heroicons/vue/24/outline'
// Import LMap et LTileLayer uniquement quand on est sûr d'être côté client
import { ref, onMounted } from 'vue'

const isLoadingGetCurrentPosition = ref(false)
const mapElement = ref(null)
const spots = ref([])
const store = useSpotsStore()

const toggleCurrentPosition = (value: boolean) => {
  isLoadingGetCurrentPosition.value = value
}

// Fonction qui sera appelée uniquement côté client
onMounted(async () => {
  if (process.client) {
    // Import dynamique de leaflet
    const L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')
    
    // Initialisation de la carte après que le DOM soit prêt
    const map = L.default.map('map').setView([48.856613, 2.352222], 12)
    
    L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map)
    
    // Initialiser les marqueurs si vous avez des spots
    if (store.spots && store.spots.length) {
      initializeMarkers(store.spots, L.default, map)
    }
  }
})

const initializeMarkers = (spots: Array<Spot>, L: any, map: any) => {
  const LeafIcon = L.Icon.extend({
    options: {
      iconUrl: '/location.svg',
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    }
  })
  
  const locationIcon = new LeafIcon()
  
  spots.forEach((spot: Spot) => {
    var marker = new L.Marker([spot.lat, spot.lng], { icon: locationIcon }).bindPopup(
      `<strong>${spot.name}</strong> <br /> ${spot.address} <br /> <a href="https://maps.google.com/?q=${spot.name}, ${spot.address}, ${spot.postal_code} ${spot.city}" target="_blank" rel="noopener">Y aller ?</a>`
    )
    marker.addTo(map)
  })
}

const getCurrentLocation = () => {
  if (process.client && 'geolocation' in navigator) {
    toggleCurrentPosition(true)
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude, accuracy } = position.coords
      store.storeLocation({ longitude, latitude, accuracy })
      console.log('Current position:', { longitude, latitude, accuracy })
      toggleCurrentPosition(false)
    })
    return true
  } else {
    return false
  }
}
</script>

<template>
  <ClientOnly>
    <div id="map"></div>
    <div id="localisation">
      <button
        v-if="!isLoadingGetCurrentPosition"
        class="block rounded-full bg-green-800 hover:text-white focus:outline-none"
        @click="getCurrentLocation"
      >
        <map-pin-icon class="h-8 w-8 text-white block" aria-hidden="true" />
      </button>
      <span v-if="isLoadingGetCurrentPosition">En chargement ...</span>
    </div>
  </ClientOnly>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
  position: relative;
}

#localisation {
  position: absolute;
  top: 175px;
  z-index: 1000;
  left: 13px;
}

#localisation span {
  background: #eee;
  padding: 2px;
}
</style>