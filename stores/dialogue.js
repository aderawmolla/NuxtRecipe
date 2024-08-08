import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDialogStore = defineStore('dialogStore', () => {
  const isActive = ref(true);

  const setDialogActive = (value) => {
    isActive.value= value;
  };

  const setDialogInactive = () => {
    isActive.value= false;
    console.log(`the value of isActive now is`,isActive.value)
  };

  return { isActive, setDialogActive, setDialogInactive };
});


