<template>
  <div>
    <div v-if="loading">Loading routes...</div>
    <div v-else>
      <LMap
        style="height: 350px"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <LMarker
          v-for="(point, index) in selectedPoints"
          :key="index"
          :lat-lng="point"
        />
        <LPolyline :lat-lngs="route" v-if="route.length" color="green" />
        <!-- Achterhoek Green :D -->
      </LMap>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouteStore } from "@/stores/routes";
import { storeToRefs } from "pinia";

const loading = ref(true);
const routeStore = useRouteStore();
const { selectedRoute, routes } = storeToRefs(routeStore);

const fetchRoute = async (points) => {
  try {
    const response = await fetch(import.meta.env.VITE_ORS_URL, {
      method: "POST",
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        "Content-Type": "application/json",
        Authorization: import.meta.env.VITE_ROUTE_API_KEY,
      },
      body: JSON.stringify({
        coordinates: points.map(([lat, lng]) => [lng, lat]),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // ORS uses reverse lon/lat
    route.value = data.features[0].geometry.coordinates.map(([lng, lat]) => [
      lat,
      lng,
    ]);
  } catch (error) {
    console.error("Error fetching route:", error);
  }
};

// Initializing the map, dummy points & routes
const initializeData = async () => {
  try {
    const [{ data: routesData }, { data: pointsData }] = await Promise.all([
      useFetch("/api/routes"),
      useFetch("/api/points"),
    ]);

    if (pointsData.value && routesData.value) {
      routeStore.setPoints(pointsData.value);
      routeStore.setRoutesFromDB(routesData.value);
    }
    loading.value = false;
  } catch (error) {
    console.error("Error loading initial data:", error);
    loading.value = false;
  }
};

const center = ref([51.867094010160336, 6.485649003772237]);
const zoom = ref(13);
const route = ref([]);

const selectedPoints = ref([]);

watch(
  selectedRoute,
  (newRoute) => {
    if (newRoute && routes.value[newRoute]) {
      const { center: newCenter, points } = routes.value[newRoute];
      center.value = newCenter;
      selectedPoints.value = points;
      fetchRoute(points);
    }
  },
  { immediate: true } // necessary for inital load
);

onMounted(async () => {
  await initializeData();

  if (routes.value[selectedRoute.value]) {
    const { center: initialCenter, points } = routes.value[selectedRoute.value];
    center.value = initialCenter;
    selectedPoints.value = points;
    fetchRoute(points);
  }
});
</script>
