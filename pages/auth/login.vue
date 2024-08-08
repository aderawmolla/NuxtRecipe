<template>
  <v-dialog v-model="localIsActive" max-width="500">
    <v-card>
      <div
        class="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800"
      >
        <div class="mb-8 text-center">
          <h1 class="my-3 text-4xl font-bold">Sign in</h1>
          <p class="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-12">
          <div class="space-y-4">
            <div>
              <label for="username" class="block mb-2 text-sm">Username</label>
              <input
                v-model="username"
                type="text"
                name="username"
                id="username"
                :error-messages="usernameError"
                required
                placeholder="john"
                class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>

            <div>
              <div class="flex justify-between mb-2">
                <label for="password" class="text-sm">Password</label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  class="text-xs hover:underline dark:text-gray-600"
                  >Forgot password?</a
                >
              </div>
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                :error-messages="passwordError"
                required
                placeholder="*****"
                class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
          </div>
          
          <v-progress-circular v-if="loading" :size="50" color="amber" indeterminate></v-progress-circular>
          <div class="space-y-2">
            <div>
              <button
                type="submit"
                class="w-full px-8 py-3 bg-yellow-400 font-semibold rounded-md dark:bg-orange-600 dark:text-gray-50"
              >
                Sign in
              </button>
            </div>
            

            <p class="px-6 mb-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet?
              <a
                rel="noopener noreferrer"
                href="#"
                class="hover:underline dark:text-orange-600"
                >Sign up</a
              >.
            </p>
            <v-alert @click="close" v-if="authError" type="error">{{ authError }}</v-alert>
            <v-alert  v-if="loginSuccess" type="success" @click="close">Login Successful</v-alert>
          </div>
        </form>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="bg-yellow-200" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDialogStore } from "../../stores/dialogue";
import { useAuth } from "../../composables/userAuth";

const dialogStore = useDialogStore();

const localIsActive = ref(dialogStore.isActive);
const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const authError = ref("");
const loading = ref(false);

const loginSuccess = ref(false);

const { login, error } = useAuth();
 const close = () => {
  authError.value = "";
  loginSuccess.value = false;
};
const handleSubmit = async () => {
  usernameError.value = "";
  passwordError.value = "";
  authError.value = "";
  loginSuccess.value = false;
  loading.value = true;

  if (!username.value) {
    usernameError.value = "Username is required";
  }
  if (!password.value) {
    passwordError.value = "Password is required";
  }
  if (usernameError.value || passwordError.value) {
    loading.value = false;
    return;
  }

  const result = await login(username.value, password.value);
  loading.value = false;

  if (!result.success) {
    authError.value = error.value;
  } else {
    loginSuccess.value = true;
  }
};

watch(localIsActive, (newValue) => {
  if (!newValue) {
    dialogStore.setDialogInactive();
    resetForm();
  }
});

const closeDialog = () => {
  dialogStore.setDialogInactive();
  resetForm();
};

const resetForm = () => {
  username.value = "";
  password.value = "";
  usernameError.value = "";
  passwordError.value = "";
  authError.value = "";
  loginSuccess.value = false;
};

watch(
  () => dialogStore.isActive,
  (newValue) => {
    localIsActive.value = newValue;
  }
);
</script>
