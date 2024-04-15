<script>
export default {
  props: {
    spots: Array
  },
  setup(props) {
    const spots = props.spots
  }
}
</script>
<template>
  <div class="content">
    <ul class="flex flex-col flex-wrap sm:flex-row">
      <li :key="id" v-for="item in spots">
        <div class="bg-green-100 mt-2 px-8 pt-4 pb-4 ml-2 mr-2 rounded-md dark:text-black">
          <h2 class="font-bold">{{ item.name }}</h2>
          <p>{{ item.address }}</p>
          <p>{{ item.postal_code }} {{ item.city }}</p>
          <a
            :href="`https://maps.google.com/?q=${item.name}, ${item.address}, ${item.postal_code} ${item.city}`"
            target="_blank"
            rel="noopener"
            >Y aller ?</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>
