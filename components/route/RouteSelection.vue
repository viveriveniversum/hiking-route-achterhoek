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

    <div v-if="selectedRoute" class="mt-4">
      <label for="fav-checkbox" class="mt-2">Favorite</label>
      <input
        id="fav-checkbox"
        type="checkbox"
        v-model="routes[selectedRoute].isFav"
        @change="toggleFav"
      />
    </div>
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

const toggleFav = async () => {
  const selectedRouteId = selectedRoute.value;
  if (!selectedRouteId) return;

  const isFav = routes.value[selectedRouteId]?.isFav;

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/routes/${selectedRouteId}/toggle-fav`,
      {
        method: "POST",
        body: JSON.stringify({ isFav }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Response:", await response.json());
  } catch (error) {
    console.error(error);
  }
};
</script>
