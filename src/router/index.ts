import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WordCounter from "@/views/WordCounter.vue";
import ScriptGenerator from "@/views/ScriptGenerator.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "WordCounter",
    component: WordCounter,
  },
  {
    path: "/voice-over-script-generator",
    name: "ScriptGenerator",
    component: ScriptGenerator,
  },
  {
    path: "/:pathMatch(.*)*", // This will match all routes
    name: "NotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
