<template>
  <div>
    <label for="route-select">Select a Route:</label>
    <select
      id="route-select"
      v-model="selectedRoute"
      class="w-full p-2 border rounded"
    >
      <option v-for="(route, id) in routes" :key="id" :value="id">
        {{ route.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useRouteStore } from "@/stores/routes";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const routeStore = useRouteStore();
const { routes, selectedRoute } = storeToRefs(routeStore);

watch(selectedRoute, (newRoute) => {
  console.log(`Selected Route: ${newRoute}`);
});
</script>
