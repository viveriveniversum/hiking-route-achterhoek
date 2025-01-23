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

    <div v-if="isAuthenticated" class="mt-4">
      <label for="fav-checkbox" class="mt-2">Favorite</label>
      <input
        id="fav-checkbox"
        type="checkbox"
        :checked="isFavorite"
        @change="handleFavoriteToggle"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouteStore } from "@/stores/routes";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";

const routeStore = useRouteStore();
const userStore = useUserStore();

const { routes, selectedRoute } = storeToRefs(routeStore);
const { userFavorites, isAuthenticated } = storeToRefs(userStore);

watch(selectedRoute, (newRoute) => {
  console.log(`Selected Route: ${newRoute}`);
});

const isFavorite = computed(() => {
  if (!selectedRoute.value) return false;
  return userFavorites.value.includes(selectedRoute.value);
});

const handleFavoriteToggle = async () => {
  const selectedRouteId = selectedRoute.value;
  if (!selectedRoute.value) return;

  try {
    await userStore.toggleFavorite(selectedRoute.value);
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
  }
};
</script>
