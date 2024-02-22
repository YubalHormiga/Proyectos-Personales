<template>
  <q-layout view="hHh lpR fFf" style="height: 1000px">
    <q-header class="text-grey-9 bg-grey-2">
      <q-toolbar>
        <q-toolbar-title class="text-center text-h3 q-mt-lg">
          <span><q-icon name="pets" size="xl" /> </span>
          CanineConnect
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs>
        <q-route-tab
          to="/"
          label="Nosotros"
          class="text-uppercase"
        />
        <q-route-tab
          :to="{ name: 'se-busca' }"
          label="Se Busca"
          class="text-uppercase"
        />
        <q-route-tab
          :to="{ name: 'favoritos' }"
          label="Favoritos"
          class="text-uppercase"
        />
      </q-tabs>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-4 text-grey-9">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
