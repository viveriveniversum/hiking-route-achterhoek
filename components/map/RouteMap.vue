<template>
  <LMap
    style="height: 350px"
    :zoom="zoom"
    :center="center"
    :use-global-leaflet="false"
  >
    <!-- Tile layer -->
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    />
    <!-- Markers -->
    <LMarker
      v-for="(point, index) in selectedPoints"
      :key="index"
      :lat-lng="point"
    />
    <!-- Polyline for route -->
    <LPolyline :lat-lngs="route" v-if="route.length" />
  </LMap>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouteStore } from "@/stores/routes";
import { storeToRefs } from "pinia";

const routeStore = useRouteStore();
const { selectedRoute, routes } = storeToRefs(routeStore);

// Center point and zoom level
const center = ref([51.867094010160336, 6.485649003772237]);
const zoom = ref(13);

// Route data
const route = ref([]);

// Update center and points dynamically based on the selected route
const selectedPoints = ref([]);

const fetchRoute = (points) => {
  const apiKey = import.meta.env.VITE_ROUTE_API_KEY;
  const url =
    "https://api.openrouteservice.org/v2/directions/foot-walking/geojson";

  const request = new XMLHttpRequest();

  request.open("POST", url);

  request.setRequestHeader(
    "Accept",
    "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8"
  );
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", apiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        try {
          const data = JSON.parse(this.responseText);
          // Extract the route geometry
          route.value = data.features[0].geometry.coordinates.map(
            ([lng, lat]) => [lat, lng]
          );
        } catch (error) {
          console.error("Error parsing response:", error);
        }
      } else {
        console.error("Error fetching route:", this.status, this.responseText);
      }
    }
  };

  const body = JSON.stringify({
    coordinates: points.map(([lat, lng]) => [lng, lat]), // Reverse lat/lng to lng/lat
  });

  request.send(body);
};

// Watch for changes in selectedRoute
watch(selectedRoute, (newRoute) => {
  if (newRoute && routes.value[newRoute]) {
    const { center: newCenter, points } = routes.value[newRoute];
    center.value = newCenter; // Update map center
    selectedPoints.value = points; // Update markers
    fetchRoute(points); // Fetch the route
  }
});

// Fetch initial route on mount
onMounted(() => {
  if (routes.value[selectedRoute.value]) {
    const { center: initialCenter, points } = routes.value[selectedRoute.value];
    center.value = initialCenter;
    selectedPoints.value = points;
    fetchRoute(points);
  }
});
</script>

<style>
.map-wrapper {
  width: 100%;
  height: 100%;
}
</style>
