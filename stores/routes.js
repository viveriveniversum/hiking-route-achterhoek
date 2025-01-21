// stores/routes.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteStore = defineStore("routes", () => {
  // Available routes
  const routes = ref({
    Dinxperlo: {
      center: [51.861217, 6.486893],
      points: [
        [51.860764, 6.485223],
        [51.862542, 6.489167],
        [51.864324, 6.488324],
      ],
    },
    Ulft: {
      center: [51.890223, 6.376982],
      points: [
        [51.891234, 6.375132],
        [51.892543, 6.380234],
        [51.887653, 6.379234],
      ],
    },
    Aalten: {
      center: [51.926235, 6.580284],
      points: [
        [51.924522, 6.578121],
        [51.928124, 6.583452],
        [51.930212, 6.577893],
      ],
    },
  });

  // Selected route
  const selectedRoute = ref("Dinxperlo");

  // Computed property: get current route details
  const currentRoute = () => routes.value[selectedRoute.value];

  return {
    routes,
    selectedRoute,
    currentRoute,
  };
});
