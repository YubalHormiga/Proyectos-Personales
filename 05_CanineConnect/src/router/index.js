import { inject } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/Home/HomeView.vue";
import { useAuthStore } from "@/stores/authStore";

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
      path: "/admin",
      name: "admin",

      component: () => import("../views/Admin/AdminView.vue"),
      meta: { requiresAdmin: true }, // Añadido
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
      component: () => import("../views/Adoption/AdoptionView.vue"),
    },
    {
      path: "/adopcion/agregar",
      name: "add-adoption",
      component: () => import("../views/Adoption/ReportAdoptionView.vue"),
    },
    {
      path: "/adopcion/listado",
      name: "adoption-list",
      component: () => import("../views/Adoption/ListDogsAdoption.vue"),
    },
    {
      path: "/adopcion/editar/:id",
      name: "edit-adoption",
      component: () => import("../views/Adoption/EditAdoptionDogVIew.vue"),
    },
    {
      path: "/adopcion/informacion/:id",
      name: "dog-information",
      component: () => import("../views/Adoption/DogInformationView.vue"),
    },

    {
      path: "/recursos",
      name: "resources",
      component: () => import("../views/ResourcesView.vue"),
    },
    {
      path: "/historias-inspiradoras",
      name: "inspiring-stories",
      component: () =>
        import("../views/InspiringStories/InspiringStoriesView.vue"),
    },
    {
      path: "/historias-inspiradoras/agregar",
      name: "add-inspiring-story",
      component: () =>
        import("../views/InspiringStories/ReportInspireStoryView.vue"),
    },
    {
      path: "/objetos",
      name: "lost-items",
      component: () => import("../views/Items/LostAndFoundView.vue"),
    },
    {
      path: "/objetos/encontrados",
      name: "found-items",
      component: () => import("../views/Items/ReportFoundItemView.vue"),
    },
    {
      path: "/objetos/editar/:id",
      name: "edit-item-found",
      component: () => import("../views/Items/EditFoundItemView.vue"),
    },
    {
      path: "/donar",
      name: "donate",
      component: () => import("../views/DonationView.vue"),
    },
    {
      path: "/sebusca",
      name: "lost-dogs",
      component: () => import("../views/LostDogs/LostAndFoundDogsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/sebusca/encontrados",
      name: "found-dogs",
      component: () => import("../views/LostDogs/ReportDogFoundView.vue"),
    },
    {
      path: "/sebusca/editar/:id",
      name: "edit-lostDog-found",
      component: () => import("../views/LostDogs/EditFoundDogView.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/Chat/Chat.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: () => import("../views/PrivacyPolicyView.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/ErrorNotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const toast = inject("toast");
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth || requiresAdmin) {
    try {
      await athenticateUser();
      if (requiresAdmin && !authStore.isAdmin) {
        toast.open({
          message: "Acceso denegado: solo para administradores.",
          type: "error",
        });
        next({ name: "home" }); // Redirigir a home si no es administrador
      } else {
        next();
      }
    } catch (error) {
      toast.open({
        message: "Solo para usuarios registrados.",
        type: "error",
      });
      next({ name: "login" }); // Redirigir a login si no está autenticado
    }
  } else {
    next();
  }
});

function athenticateUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve();
      } else {
        reject();
      }
    });
  });
}
export default router;
