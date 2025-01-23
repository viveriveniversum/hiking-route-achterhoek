<template>
  <GoogleSignInButton
    v-if="!isAuthenticated"
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
  <div v-else>
    <p>Welcome, {{ userName }}</p>
    <button class="logout-btn" @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { GoogleSignInButton } from "vue3-google-signin";
import { useUserStore } from "~/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isAuthenticated, userData, userFavorites } = storeToRefs(userStore);
const userName = ref("");

const handleLoginSuccess = async (response) => {
  const { credential } = response;

  try {
    const { data } = await useFetch("/api/auth/google", {
      method: "POST",
      body: { credential },
    });

    if (data.value) {
      const userDb = await userStore.getUser(data.value.user.id);
      userData.value = userDb.user;
      userFavorites.value = userDb.user.favorites;
      userName.value = userDb.user.name;
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const handleLoginError = (error) => {
  console.error("Login failed:", error);
};

const handleLogout = () => {
  userStore.logout();
  userName.value = "";
};
</script>
