<script setup lang="ts">
  const isLoadingGetCurrentPosition = ref(true)
</script>

<template>
<client-only>
  <div>
    {{ isLoadingGetCurrentPosition }}
    <LMap
      ref="map"
      :zoom="12"
      :center="[48.856613, 2.352222]"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
    </LMap>
    <div id="localisation">
      <button
        v-if="!isLoadingGetCurrentPosition"
        class="block rounded-full bg-green-800 hover:text-white focus:outline-none"
      >
        <MapPinIcon class="h-8 w-8 text-white block" aria-hidden="true" />
      </button>
      <span v-if="isLoadingGetCurrentPosition">En chargement ...</span>
    </div>
  </div>
  </client-only>
  <template #fallback>
    <!-- this will be rendered on server side -->
    <p>Loading map...</p>
  </template>
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
