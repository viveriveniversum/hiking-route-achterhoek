<template>
  <GoogleSignInButton
    v-if="!isLoggedIn"
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
  <div v-else="isLoggedIn">
    <p>Welkom, {{ userName }}</p>
    <button class="logout-btn" @click="logout">Logout</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";
import { decodeJwtResponse } from "~/utils/auth";

const isLoggedIn = ref(false);
const userCredential = ref(null);
const userName = ref("");
// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  userCredential.value = credential;
  const decodedToken = decodeJwtResponse(credential);
  userName.value = decodedToken.name || decodedToken.email;
  isLoggedIn.value = true;
};

const logout = () => {
  isLoggedIn.value = false;
  userCredential.value = null;
  console.log("Logged out");
};
// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
