<template>
    <div class="max-w-6xl mx-auto p-6  bg-white rounded-lg shadow-lg">
      <!-- Recipe Image Carousel -->
     <!-- Container for image and overlay content -->
<div class="relative mb-6 w-auto h-auto">
  <!-- Image -->
  <img
    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
    class="w-full h-64 object-cover rounded-lg"
    draggable="false"
  />

  <!-- Overlay Content -->
  <div class="absolute top-0 left-5 right-50 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
    <!-- Author and Related Info -->
    <div class="text-white">
      <h3 class="text-lg font-bold mb-2">Recipe Title</h3>
      <p class="text-sm mb-1">Author: John Doe</p>
      <p class="text-sm">Related Info: Quick and easy recipe for a delicious meal!</p>
    </div>
  </div>
</div>
  
      <!-- Recipe Title and Description -->
<div class="mb-8 text-center">
  <!-- Recipe Title -->
  <h1 class="text-5xl font-extrabold text-gray-900 mb-3">
    {{ recipe.title }}
  </h1>
  
  <!-- Recipe Description -->
  <p class="text-lg text-gray-600 mb-6 px-4 sm:px-6 md:px-8 lg:px-12">
    {{ recipe.description }}
  </p>
  
  <!-- Information Icons -->
  <div class="flex justify-center space-x-6 text-gray-700 mb-6">
    <div class="flex items-center space-x-2">
      <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
      <span class="text-xl font-medium">{{ recipe.cookingTime }} mins</span>
    </div>
    <div class="flex items-center space-x-2">
      <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12l5 5L20 7"></path>
      </svg>
      <span class="text-xl font-medium">{{ recipe.servings }} servings</span>
    </div>
    <div class="flex items-center space-x-2">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.83 18.36l1.66-2.88a1 1 0 00-.83-1.5H2.34a1 1 0 00-.83 1.5l1.66 2.88M15.71 3.25a1.36 1.36 0 00-1.18-.75H9.47a1.36 1.36 0 00-1.18.75L4.68 10h14.64l-3.61-6.75z"></path>
      </svg>
      <span class="text-xl font-medium">{{ recipe.difficulty }}</span>
    </div>
  </div>
</div>

  
      <!-- Instructions Section -->
      <div class="mb-8">
  <h2 class="text-3xl font-bold mb-4 text-gray-800">Instructions</h2>
  <ol class="list-decimal list-inside space-y-4 pl-4">
    <li v-for="(step, index) in recipe.instructions" :key="index" class="flex items-start space-x-2">
      <!-- Optional: Add a checkmark icon or other marker -->
      <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-lg text-gray-700">{{ step }}</span>
    </li>
  </ol>
</div>

  
      <!-- Ingredients Section -->
<div class="mb-8">
  <h2 class="text-3xl font-bold mb-4 text-gray-800">Ingredients</h2>
  <ul class="list-disc list-inside space-y-3 pl-5">
    <li v-for="ingredient in recipe.ingredients" :key="ingredient" class="flex items-start space-x-2">
      <!-- Optional: Add an ingredient icon or marker -->
      <svg class="w-5 h-5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v4M12 12h.01M4 6a8 8 0 0116 0 8 8 0 01-16 0z"></path>
      </svg>
      <span class="text-lg text-gray-700">{{ ingredient }}</span>
    </li>
  </ul>
</div>

  
      <!-- Related Recipes -->
      <div class="mb-8">
  <!-- Related Recipes Title -->
  <h2 class="text-3xl font-bold text-gray-900 mb-6">Related Recipes</h2>
  
  <!-- Related Recipes Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="related in relatedRecipes"
      :key="related.id"
      class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <!-- Recipe Image -->
      <img
        :src="related.image"
        alt="Related Recipe"
        class="rounded-lg mb-3 w-full h-48 object-cover border border-gray-200"
      />
      
      <!-- Recipe Title -->
      <h3 class="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-300">
        {{ related.title }}
      </h3>
    </div>
  </div>
</div>






      
  
     <!-- Additional Information -->
<div class="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
  <!-- Heading -->
  <h2 class="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
    Additional Information
  </h2>
  
  <!-- Content -->
  <p class="text-gray-800 leading-relaxed">
    {{ recipe.additionalInfo }}
  </p>
</div>

    </div>
  </template>
  
  <script setup>
  
  const recipe = ref({
    title: 'Delicious Recipe',
    description: 'A short description of the recipe that gives an overview of the dish.',
    images: [
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'
    ],
    cookingTime: 30, // in minutes
    servings: 4,
    difficulty: 'Intermediate',
    rating: 4.5,
    ingredients: [
      '1 cup of flour',
      '2 eggs',
      '1/2 cup of sugar',
      '1/4 cup of butter',
      '1 tsp of baking powder'
    ],
    instructions: [
      'Preheat the oven to 350°F (175°C).',
      'Mix the flour, sugar, and baking powder in a bowl.',
      'Add the eggs and melted butter, and mix until smooth.',
      'Pour the mixture into a greased baking dish.',
      'Bake for 25-30 minutes, or until golden brown.'
    ],
    additionalInfo: 'This recipe is perfect for a quick and delicious treat. Enjoy with a cup of coffee or tea.'
  });
  
  const relatedRecipes = ref([
    {
      id: 1,
      title: 'Another Tasty Recipe',
      image: 'https://via.placeholder.com/300x200?text=Related+Recipe+1'
    },
    {
      id: 2,
      title: 'Yummy Dish',
      image: 'https://via.placeholder.com/300x200?text=Related+Recipe+2'
    },
    {
      id: 3,
      title: 'Delicious Treat',
      image: 'https://via.placeholder.com/300x200?text=Related+Recipe+3'
    },
    {
      id: 4,
      title: 'Delicious Treat',
      image: 'https://via.placeholder.com/300x200?text=Related+Recipe+3'
    }
  ]);
  </script>
  
  <style scoped>
  .carousel .slide img {
    display: block;
    width: 100%;
    height: auto;
  }
  </style>
  