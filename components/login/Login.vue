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
import axios from "axios";

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

// from https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions
const decodeJwtResponse = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
</script>
