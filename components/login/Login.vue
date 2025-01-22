// components/login/Login.vue
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
const { isAuthenticated } = storeToRefs(userStore);
const userName = ref("");

const handleLoginSuccess = async (response) => {
  const { credential } = response;

  try {
    // Send credential to our backend
    const { data } = await useFetch("/api/auth/google", {
      method: "POST",
      body: { credential },
    });

    if (data.value) {
      userStore.setUser(data.value.user);
      userName.value = data.value.user.name;
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
