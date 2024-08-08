<template>
<NuxtLink to="/auth/login">
    <button class="bg-green-500 w-20 mb-4 text-white p-4 rounded hover:bg-green-300">Login</button>
</NuxtLink>

<button class="bg-green-500 w-20 text-white p-4 rounded hover:bg-green-300">Signup</button>


    <div class="flex flex-row space-x-5 flex-wrap space-y-5">
        <recipe-card v-for="product in products" :key="product.id" :product="product" />

    </div>

</template>
<script setup lang="ts">
const products = 
[
{ id: 0, name: 'Shirt' },
{ id: 1, name: 'Jacket' },
{ id: 2, name: 'Shoes' },
{ id: 3, name: 'Trouser' },
{ id: 4, name: 'Others' }
]

</script>