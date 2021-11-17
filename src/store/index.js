import { createStore } from "vuex";
import { words } from "@/store/modules/words";

export default createStore({
  modules: {
    words,
  },
});
