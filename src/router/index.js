import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
