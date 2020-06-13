<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Majorcan Recipes
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/Admin/home" label="Home" />
        <q-route-tab to="/Admin/postform" label="Create Post" />
        <q-route-tab to="/Admin/calculator" label="Kcal calculator" />
        <q-route-tab to="/Admin/mealcalculator" label="Meal calculator" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted(){
    console.log("Entramos en layout privado")
  }
  
}
</script>