import { inject } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import { useAuthStore } from "../stores/authStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/informacion",
      name: "information",

      component: () => import("../views/Information/InformationView.vue"),
      children: [
        {
          path: "/",
          name: "care",

          component: () => import("../views/Information/CareTipsView.vue"),
        },
        {
          path: "/razas",
          name: "breeds",

          component: () => import("../views/Information/BreddsView.vue"),
        },
        {
          path: "/responsabilidad",
          name: "stewardship",

          component: () => import("../views/Information/StewardshipView.vue"),
        },
      ],
    },
    {
      path: "/adopcion",
      name: "adoption",
      component: () => import("../views/AdoptionView.vue"),
    },

    {
      path: "/recursos",
      name: "resources",
      component: () => import("../views/ResourcesView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/objetos",
      name: "lost-items",
      component: () => import("../views/FoundItems.vue"),
    },
    {
      path: "/objetos/encontrados",
      name: "found-items",
      component: () => import("../views/NewFoundItems.vue"),
    },
    {
      path: "/regalo",
      name: "gift",
      component: () => import("../views/DonationView.vue"),
    },
    {
      path: "/perros-perdidos",
      name: "lost-dogs",
      component: () => import("../views/LostDogsView.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/ChatView.vue"),
      // meta: { requireAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/ErrorNotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const toast = inject("toast");
  try {
    if (to.meta.requireAuth && !useAuthStore.isLoggedIn) {
      next({ name: "login" });
      toast.open({
        message: `Solo para usuarios registrados`,
        type: "info",
      });
    } else {
      next();
    }
  } catch (error) {
    toast.open({
      message: `Se ha producido un error ${error}`,
      type: "error",
    });
  }
});

export default router;
