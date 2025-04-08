<script setup>
  import Map from '../components/map.vue'
  import List from '../components/list.vue'

  definePageMeta({
    layout: 'default'
  })
  
  useSeoMeta({
    title: 'Où sortir avec mon bébé ?'
  });

  const store = useSpotsStore()
  const { gSpots } = store
  const { spots, nb, currentLocation } = storeToRefs(store)

  let showMap = ref(true)

  await useAsyncData('spots', gSpots)

  const toggleDisplay = (mode) => {
    showMap.value = mode === 'map'
  };

</script>
<template>
  <div>
    <toggle-map-list @toggleDisplay="toggleDisplay" />
    <component :is="showMap? Map : List" :spots="spots"></component>
  </div>
</template>
