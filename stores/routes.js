import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useRouteStore = defineStore("routes", () => {
  const routes = ref({});
  const selectedRoute = ref("");
  const points = ref(new Map()); // Store points in a Map for efficient lookup

  const setPoints = (pointsData) => {
    pointsData.forEach((point) => {
      points.value.set(point.id, point);
    });
  };

  // Transform MongoDB data to the format the map expects
  const setRoutesFromDB = (dbRoutes) => {
    const transformedRoutes = {};

    dbRoutes.forEach((route) => {
      const routePoints = route.routePoints
        .sort((a, b) => a.order - b.order)
        .map((routePoint) => {
          const point = points.value.get(routePoint.pointId);
          if (point) {
            return [point.coordinates.latitude, point.coordinates.longitude];
          }
          return null;
        })
        .filter((point) => point !== null); // Remove any points that weren't found

      transformedRoutes[route.id] = {
        center: route.center,
        points: routePoints,
        name: route.name,
        description: route.description,
        estimatedDistance: route.estimatedDistance,
        isFav: route.isFav,
      };
    });

    routes.value = transformedRoutes;
    if (!selectedRoute.value && Object.keys(transformedRoutes).length > 0) {
      selectedRoute.value = Object.keys(transformedRoutes)[0];
    }
  };

  const currentRoute = computed(() => routes.value[selectedRoute.value]);

  return {
    routes,
    selectedRoute,
    currentRoute,
    setRoutesFromDB,
    setPoints,
  };
});
