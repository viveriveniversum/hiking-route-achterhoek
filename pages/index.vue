<template>
  <Login />
  <div class="grid grid-cols-[300px_1fr] h-screen">
    <aside class="border-r border-gray-200 p-4">
      <RouteSelection />
    </aside>
    <main class="relative">
      <RouteMap />
    </main>
  </div>
</template>

<script setup lang="ts">
import RouteMap from "~/components/map/RouteMap.vue";
import RouteSelection from "~/components/route/RouteSelection.vue";
import Login from "~/components/login/Login.vue";
</script>
