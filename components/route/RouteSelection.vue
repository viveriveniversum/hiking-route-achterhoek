<template>
  <div>
    <label for="route-select">Select a Route:</label>
    <select
      id="route-select"
      v-model="selectedRoute"
      class="w-full p-2 border rounded"
    >
      <option v-for="(details, name) in routes" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useRouteStore } from "@/stores/routes";
import { storeToRefs } from "pinia";

const routeStore = useRouteStore();
// Use storeToRefs to maintain reactivity
const { routes, selectedRoute } = storeToRefs(routeStore);

// Watch for route changes and log (optional, for debugging)
watch(selectedRoute, (newRoute) => {
  console.log(`Selected Route: ${newRoute}`);
});
</script>
