<template>
  <q-page class="flex flex-center">
    <q-input filled v-model="height" label="Altura(en cm)" />
    <q-input v-model.number="age" type="number" filled style="max-width: 200px" label="Edat" />
    <q-input v-model.number="weight" type="number" filled style="max-width: 200px" label="Pes" />
    <q-select filled v-model="genderSelected" :options="gender" label="Standard" />
    <q-select filled v-model="sportSelected" :options="sport" label="Standard" />
    <q-btn color="secondary" label="Calcular Kcal" @click="dailyCalorieCalculator()" />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Les calories diaries que has de consumir son: {{dailyKl}}</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      height: "",
      age: "",
      weight: "",
      sport: [],
      sportSelected: "",
      gender: [],
      genderSelected: "",
      alert: false,
      dailyKl: 0
    };
  },
  methods: {
    dailyCalorieCalculator: function() {
      let dailyCalories = 0;
      let tmb = 10 * this.weight + 6.25 * this.height - 5 * this.age;
      console.log(this.genderSelected);
      console.log(this.sportSelected);
      switch (this.genderSelected) {
        case "dona":
          tmb += 5;
          break;
        case "home":
          tmb -= 161;
          break;
      }
      switch (this.sportSelected.value) {
        case "noExercise":
          dailyCalories = tmb * 1.2;
          break;
        case "lightExercise":
          dailyCalories = tmb * 1.375;
          break;
        case "moderatedExercise":
          dailyCalories = tmb * 1.55;
          break;
        case "hardExercise":
          dailyCalories = tmb * 1.725;
          break;
        case "proExercise":
          dailyCalories = tmb * 1.9;
          break;
      }
      this.dailyKl = Math.round(dailyCalories);
      this.alert = !this.alert;
    }
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push({ path: "/" });
    }
    this.gender = ["home", "dona"];
    this.sport = [
      { label: "poc o Cap Exercici", value: "noExercise" },
      { label: "Exercici lleuger", value: "lightExercise" },
      { label: "Exercici Moderat", value: "moderatedExercise" },
      { label: "Exercici fort", value: "hardExercise" },
      { label: "Exercici profecional", value: "proExercise" }
    ];
  }
};
</script>
