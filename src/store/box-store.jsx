import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const boxStore = (set) => ({
  // TODO Section 1 String & Number
  fname: "Sansaboon",
  lname: "ounnart",
  value: 0,
  setName: (newValue) => set({ fname: newValue }),
  incNum: () => set((state) => ({ value: state.value + 1 })),
  decNum: () => set((state) => ({ value: state.value - 1 })),

  // TODO Section 2 Array
  arr: ['JS', 'React', 'NodeJS'],
  addArr: (newValue) => set((state) => ({
    arr: [...state.arr, newValue]
  })),

  // TODO Section 3 Array_obj
  arr2: [
    { id: 1, title: 'Work 1' },
    { id: 2, title: 'Work 2' }
  ],
  addArr2: (newValue) => set((state) => ({
    arr2: [...state.arr2, { id: Date.now(), title: newValue }]
  })),
  delArr2: (id) => set((state) => ({
    arr2: state.arr2.filter((item) => item.id !== id)
  })),

  // TODO Section 4
  data: [],
  isLoading: false,
  error: false,
  errorMsg: '',
  getData: async () => {
    try {
      set({ isLoading: true, error: false, errorMsg: '' });
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      set({ isLoading: false, data: res.data });
    } catch (err) {
      set({ isLoading: false, error: true, errorMsg: err.message });
    }
  }
});

const usePersist = {
  name: 'box-store', // The name for the storage key
  getStorage: () => localStorage, // Use localStorage
  partialize: (state) => ({
    arr: state.arr,
    arr2: state.arr2
  }) // Persist only the arrays arr and arr2
};

const useStore = create(persist(boxStore, usePersist));

export default useStore;
