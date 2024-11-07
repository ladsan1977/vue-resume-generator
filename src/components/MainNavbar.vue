<template>
  <nav class="bg-indigo-500">
    <div class="container mx-auto px-4">
      <div class="flex space-x-4 py-3">
        <router-link
          to="/"
          class="text-white hover:text-indigo-100 transition-colors"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="text-white hover:text-indigo-100 transition-colors"
        >
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>
