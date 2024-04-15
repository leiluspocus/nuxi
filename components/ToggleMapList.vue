<script lang="ts">
  export default {
    data() {
      return {
        activeTab: 'map'
      }
    },
    methods: {
      displayMode(mode: string) {
        this.activeTab = mode
        this.$emit(`toggleDisplay`, mode)
      },
    },
}
</script>
<template>
  <div class="flex h-8 border-solid border border-green-800">
    <button class="hover:bg-slate-100 hover:text-black hover:cursor-pointer" :class="{'bg-green-800 text-slate-50': (activeTab === 'map')} " @click="displayMode('map')">Carte</button>
    <button class="hover:text-black border-l border-green-800 hover:cursor-pointer hover:bg-slate-100" :class="{'bg-green-800 text-slate-50': (activeTab === 'list')} "  @click="displayMode('list')">Liste</button>
  </div>
</template>

<style scoped>
  button {
    width: 100%;
  }

</style>
