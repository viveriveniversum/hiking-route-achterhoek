import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const userData = ref(null);
  const userFavorites = ref([]);

  const isAuthenticated = computed(() => !!userData.value);

  const setUser = (user) => {
    userData.value = user;
  };

  const setFavorites = (favorites) => {
    userFavorites.value = favorites ?? [];
  };

  const logout = () => {
    userData.value = null;
    userFavorites.value = [];
  };

  return {
    userData,
    userFavorites,
    isAuthenticated,
    setUser,
    setFavorites,
    logout,
  };
});
