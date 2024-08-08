


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

