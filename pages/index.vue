<script setup>
   const store = useSpotsStore()
    const { gSpots } = store
    const { spots, nb, currentLocation } = storeToRefs(store)

    let showMap = ref(true)

    gSpots()

    const toggleDisplay = (mode) => {
      showMap.value = mode === 'map'
    };

</script>
<template>
  <div>
    <header>
      <HeaderNavigation />
      {{ nb }}
    </header>
    <div class="content">
      <toggle-map-list @toggleDisplay="toggleDisplay" />
      <map :spots="spots" v-if="showMap" />
      <list :spots="spots" v-if="!showMap" />
    </div>
  </div>
</template>
