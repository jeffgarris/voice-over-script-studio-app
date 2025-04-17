import { defineStore } from "pinia";

export const useMessageBarStore = defineStore("messageBar", {
  state: () => ({
    show: false,
    duration: 3000,
  }),
  actions: {
    showMessageBar(message: string, status: string) {
      console.log("Store - message = ", message);
      console.log("Status = ", status);
      this.show = status === "success";
    },
  },
});
