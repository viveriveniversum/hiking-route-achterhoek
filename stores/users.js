import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const userData = ref(null);
  const userFavorites = ref([]);

  const isAuthenticated = computed(() => !!userData.value);

  const setUser = (user) => {
    userData.value = user.user;
  };

  const setFavorites = (favorites) => {
    userFavorites.value = favorites ?? [];
  };

  const toggleFavorite = async (routeId) => {
    if (!userData.value) return null;

    try {
      const response = await fetch(
        `/api/users/${userData.value.id}/toggle-favorite`,
        {
          method: "POST",
          body: JSON.stringify({ routeId: routeId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.favorites) {
        userFavorites.value = data.favorites;
      }

      return data;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  };

  const getUser = async (userId) => {
    if (!userId) return;
    try {
      const response = await fetch(`/api/users/${userId}/get-user`);

      const data = await response.json();

      if (data) {
        setUser(data);
        setFavorites(data.favorites);
      }

      return data;
    } catch (error) {
      console.error("Error getting user from db:", error);
      throw error;
    }
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
    toggleFavorite,
    getUser,
    logout,
  };
});
