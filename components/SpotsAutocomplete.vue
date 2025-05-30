<script setup>
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'
import { ref, defineProps, reactive } from 'vue'

const props = defineProps({
  newProposal: Object
})

defineEmits(['valueSelected'])
const runtimeConfig = useRuntimeConfig();

const autoloaderInProgress = ref(false)
const suggestions = ref([])
const inputFocused = ref(false)

const fetchSuggestions = async (e) => {
  suggestions.value = []
  inputFocused.value = true
  if (!autoloaderInProgress.value) {
    autoloaderInProgress.value = true
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        e.target.value
      )}&type=amenity&filter=countrycode:fr&limit=5&apiKey=${
        runtimeConfig.public.AUTOCOMPLETE_KEY
      }`,
      { limit: 5 }
    )
    const data = await response.json()
    const { features } = data
    for (const item of features) {
      suggestions.value = [...suggestions.value, item.properties]
    }
    autoloaderInProgress.value = false
  }
}
</script>
<template>
  <input
    type="text"
    name="street-address"
    id="autocomplete"
    autocomplete="off"
    placeholder="Tapez le nom et/ou l'adresse ..."
    v-model="newProposal.formatted"
    @input="fetchSuggestions"
    @blur="inputFocused = false"
    @focus="inputFocused = true"
    class="autocomplete-container block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
  />

  <div v-show="inputFocused && suggestions.length === 0 && autoloaderInProgress" class="autocomplete-items">Recherche en cours...</div>
  <div v-show="inputFocused && suggestions.length === 0 && !autoloaderInProgress" class="autocomplete-items">Aucun résultat trouvé</div>
  <div v-show="suggestions.length > 0" class="autocomplete-items">
    <div
      :key="index"
      v-for="(item, index) in suggestions"
      :data-lat="item.lat"
      :data-lon="item.lon"
      class="dark:text-black m-2"
      @click="
        () => {
          suggestions = []
          $emit('valueSelected', item)
        }
      "
    >
      {{ item.formatted }}
    </div>
  </div>
</template>
<style>
.autocomplete-container {
  position: relative;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.3);
  margin-left: 18px;
  margin-right: 18px;
  margin-top: 8px;
  border-top: none;
  background-color: #fff;

  z-index: 99;
  /*top: calc(100% + 2px);*/
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
}

.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
