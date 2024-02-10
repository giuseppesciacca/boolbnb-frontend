import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import ApartmentsPage from "./views/ApartmentsPage.vue";
import SingleApartment from "./views/SingleApartmentview.vue";
import ErrorView from "./views/ErrorView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/apartments",
      name: "apartments",
      component: ApartmentsPage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/apartment/:slug",
      name: "single-apartment",
      component: SingleApartment,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: ErrorView,
    },
  ],
});

export { router };
