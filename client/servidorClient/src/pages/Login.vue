<template>
  <q-page class="flex flex-center">
    <q-input color="purple-12" v-model="username" label="Nom d'usuari">
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
    </q-input>
    <!-- Formulari de autentificacio en local  -->
    <div>
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn color="secondary" icon="fingerprint" label="Inicia Sessio" @click="loginLocal()" />
    </div>
    <!--  -->

    <template>
      <!-- Boto de google -->
      <button v-google-signin-button="clientId" class="google-signin-button">Continue with Google</button>
    </template>
  </q-page>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
export default {
  directives: {
    GoogleSignInButton
  },
  name: "PageIndex",
  data() {
    return {
      clientId:
        "456348531371-6b75so7kns8a7c9snrgdqm7db9ulipfj.apps.googleusercontent.com",
      username: "",
      password: "",
      isPwd: true
    };
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      console.log("logeado con exito!");
      window.location.replace("http://localhost:3000/auth/google");
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    async loginLocal() {
      console.log("Usuari: ", this.username, "Contrasenya: ", this.password);
      let data = {
        usuari: this.username,
        contrasenya: this.password
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const fetchLoginLocal = await this.$axios.post(
        "http://localhost:3000/auth/login",
        data,
        config
      );
      console.log(fetchLoginLocal.data)
      let token = fetchLoginLocal.data.token
      let userEmail = fetchLoginLocal.data.email
      this.$router.push({path:'/Admin/home/?token='+token+"&userEmail="+userEmail})
    }
  }
};
</script>

<style scoped>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>