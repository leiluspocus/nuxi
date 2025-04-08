<script setup lang="ts">
  import { useSpotsStore } from '../stores/spots'
  import 'leaflet/dist/leaflet.css';
  import { MapPinIcon } from '@heroicons/vue/24/outline'
  import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';

  const isLoadingGetCurrentPosition = ref(false)
  const toggleCurrentPosition: Function = (value: boolean) => {
      isLoadingGetCurrentPosition.value = value
  }

  const getCurrentLocation = () => {
      if ('geolocation' in navigator) {
        const store = useSpotsStore()
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
    <div>
      <div id="map">
        <l-map
          ref="map"
          :zoom="12"
          :center="[48.856613, 2.352222]"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
          />
        </l-map>
      </div>
      <div id="localisation">
        <button
          v-if="!isLoadingGetCurrentPosition"
          class="block rounded-full bg-green-800 hover:text-white focus:outline-none"
          @click="
            () => {
              toggleCurrentPosition(true)
              getCurrentLocation()
            }
          "
        >
          <map-pin-icon class="h-8 w-8 text-white block" aria-hidden="true" />
        </button>
        <span v-if="isLoadingGetCurrentPosition">En chargement ...</span>
      </div>
    </div>
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
