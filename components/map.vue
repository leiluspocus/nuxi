<script setup lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { MapPinIcon } from '@heroicons/vue/24/outline'
  import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';

  const isLoadingGetCurrentPosition = ref(true)
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
}

#localisation {
  position: absolute;
  top: 110px;
  z-index: 1000;
  left: 13px;
}

#localisation span {
  background: #eee;
  padding: 2px;
}
</style>
