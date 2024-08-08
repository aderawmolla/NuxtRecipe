<template>
  <div class="bg-gray-200 py-10">
    <form id="recipe-form" v-on:submit.prevent="handleSubmit">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div class="container mx-auto px-4 py-8">
          <!-- Recipe Title and Description -->
          <div class="mb-8">
            <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Recipe Details
            </h2>

            <!-- Title Input -->
            <div class="mb-6">
              <label
                for="title"
                class="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                >Recipe Title</label
              >
              <input
                type="text"
                id="title"
                name="title"
                v-model="form.title"
                required
                class="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-700"
                placeholder="Salad and Grain"
              />
            </div>

            <!-- Description Input -->
            <div class="mb-6">
              <label
                for="description"
                class="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                v-model="form.description"
                required
                class="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-700"
                placeholder="Let the world know about this recipe"
                rows="4"
              ></textarea>
              <p class="text-xs text-gray-500 dark:text-gray-400 text-right">
                Character Limit: 200
              </p>
            </div>
          </div>

          <!-- Ingredients Section -->
          <div class="mb-8">
            <label
              for="ingredients"
              class="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
              >Ingredients</label
            >
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Enter one ingredient per line. Include the quantity (e.g., cups,
              tablespoons) and any special preparation.
            </p>
            <div
              v-for="(ingredient, index) in form.ingredients"
              :key="index"
              class="flex items-center mb-3"
            >
              <input
                v-model="form.ingredients[index]"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-700"
                placeholder="E.g., 2 cups flour"
              />
              <button
                type="button"
                @click="removeIngredient(index)"
                class="ml-2 text-red-600 hover:text-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <button
              type="button"
              @click="addIngredient"
              class="btn px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100"
            >
              <i class="mr-2 fa-solid fa-plus"></i>Add Ingredient
            </button>
          </div>

          <!-- Preparation Time Section -->
          <fieldset class="bg-gray-50 p-6 rounded-md shadow-sm mb-8">
            <legend class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Preparation Time
            </legend>
            <div class="flex items-center">
              <input
                v-model.number="form.preparationTime.value"
                type="number"
                placeholder="0"
                class="w-16 border-2 border-gray-300 rounded-md p-2 text-gray-900"
              />
              <select
                v-model="form.preparationTime.unit"
                class="ml-2 border-2 border-gray-300 rounded-md p-2 text-gray-900"
              >
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
          </fieldset>

         
    <v-select
    v-model="form.selectedCategories"
    :items="categories"
    hint="Pick your favorite states"
    label="Select"
    multiple
    persistent-hint
  ></v-select>
           

          <fieldset class="bg-gray-50 p-6 rounded-md shadow-sm mb-8">
            <legend class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Upload Images
            </legend>
            <input
              type="file"
              multiple
              @change="handleImageUpload"
              class="w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-gray-600 bg-gray-50 hover:bg-gray-100 transition duration-200"
            />
            <div class="mt-4 flex flex-wrap gap-4">
              <div
                v-for="(image, index) in previewImages"
                :key="index"
                class="relative w-32 h-32 bg-gray-100 border border-gray-200 rounded-md shadow-sm overflow-hidden"
              >
                <img :src="image" class="w-full h-full object-cover" />
                <button
                  @click="removeImage(index)"
                  class="absolute top-0 right-0 m-1 text-red-600 hover:text-red-800 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </fieldset>
          <!-- Submit Button -->
          <button
            type="submit"
            class="btn px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100 mt-8"
          >
            <i class="mr-2 fa-solid fa-check"></i>Submit Recipe
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Carousel from "primevue/carousel";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        ingredients: [""],
        preparationTime: {
          value: 0,
          unit: "minutes",
        },
        selectedCategories: [],
      },
      previewImages: [],
      categories: ["Breakfast", "Lunch", "Dinner"], // Predefined categories
      newCategory: null,
      countries: [
        {
          name: "United States",
          value: "US",
        },
        {
          name: "Canada",
          value: "CA",
          disabled: true,
        },
        {
          name: "Mexico",
          value: "MX",
        },
      ],
      country: "",
    };
  },
  methods: {
    addIngredient() {
      this.form.ingredients.push("");
    },
    addCategory() {
      if (this.newCategory && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory);
        this.newCategory = ""; // Clear input after adding
      }
    },
    removeIngredient(index) {
      this.form.ingredients.splice(index, 1);
    },
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      // Add new images to existing previews
      this.previewImages = [
        ...this.previewImages,
        ...files.map((file) => URL.createObjectURL(file)),
      ];
    },
    removeImage(index) {
      this.previewImages.splice(index, 1);
    },
    handleSubmit() {
      // Form submission logic
      console.log(this.form);
    },
  },
};
</script>

<style>
.btn:hover {
  border: 2px solid #d54215;
  background: #d54215;
  color: #fff;
}
.btn {
  background: #fff;
  color: #d54215;
  border: 2px solid #d54215;
}
.time {
  width: 72px;
  border: 1px solid rgba(0, 0, 0, 0.65);
}
.select {
  margin-left: 16px;
}
</style>
