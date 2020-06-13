<template>
  <q-page class="flex flex-center">
    <q-select
      outlined
      v-model="originalCode"
      :options="languages"
      option-value="code"
      option-label="name"
      label="Idioma Original"
    />
    <br />
    <q-input square filled v-model="ogTitle" label="Titol" @input="translate(ogTitle,'title')" />
    <q-input
      square
      filled
      v-model="ogContent"
      label="Texte"
      type="textarea"
      @input="translate(ogContent,'content')"
    />

    <q-select
      outlined
      v-model="translateCode"
      :options="languages"
      option-value="code"
      option-label="name"
      label="Idioma a Traducir"
    />
    <q-input filled v-model="translatedTitle" hint="Readonly" readonly label="Titol Traduit" />
    <q-input
      filled
      v-model="translatedContent"
      hint="Readonly"
      readonly
      label="Texte Traduit"
      type="textarea"
    />
    <div v-if="isCreatePost == false">
      <q-btn color="primary" label="Guardar" @click="savePost()" />
    </div>
    <div v-else>
      <q-btn color="primary" label="Publicar" @click="createPost()" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      idPost: "",
      post: [],
      languages: [],
      originalCode: "",
      translateCode: "",
      ogTitle: "",
      ogContent: "",
      translatedTitle: "",
      translatedContent: "",
      isCreatePost: true //if true it means we create it, otherwise we are updating a post
    };
  },
  methods: {
    getPost: async function() {
      let fetchPost = await this.$axios.get(
        "http://localhost:8080//getPost?id=" + this.idPost,
        {
          method: "GET",
          headers: new Headers({
            //'Authorization':'Bearer '+localStorage.getItem("token"),
            "Content-Type": "application/json"
          })
        }
      );
      fetchPost = fetchPost.data;
      console.log("THis post!:", fetchPost);
      //Now lets Add to the variables
      this.post = fetchPost.data;
      this.idPost = fetchPost.idPost;
      //Now we translate the text:
      this.originalCode = fetchPost.langOriginal;
      this.translateCode = fetchPost.langTranslate;

      this.translatedTitle = fetchPost.title;
      this.translatedContent = fetchPost.content;
      
      this.ogContent =  await this.translateMetod(fetchPost.content,fetchPost.langTranslate,fetchPost.langOriginal);
      this.ogTitle = await this.translateMetod(fetchPost.title,fetchPost.langTranslate,fetchPost.langOriginal);
    },
    getLanguages: async function() {
      let idiomasResponse = await this.$axios.post(
        "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",
        {
          params: {
            MethodName: "languages",
            params: ""
          }
        }
      );

      let idiomasData = await idiomasResponse;
      this.languages = idiomasData.data;
      console.log(this.idiomas);
    },
    translateMetod: async function(texto,sourceLang,targetLang) {
      console.log("codigos de lenguaje: ",sourceLang,targetLang)
      let traduccionResponse = await this.$axios.post(
        "http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",
        {
          MethodName: "translate",
          params: {
            source: sourceLang,
            target: targetLang,
            text: texto
          }
        }
      );
      return traduccionResponse.data;
    },
    translate: async function(texto, piece) {
      //Piece would be if the title or content
      console.log("Codigos: ",this.originalCode,this.translateCode) 
      let originalLang =""
      let translateLang = "" //Ho se, no es elegant
      if(this.originalCode.code == undefined){
        originalLang =this.originalCode
      }else{
        originalLang =this.originalCode.code
      }
      if(this.translateCode.code == undefined){
        translateLang = this.translateCode
      }else{
        originalLang =this.originalCode.code
      }
      let traduccionResponse = await this.translateMetod(texto,originalLang,this.translateCode);
      if (piece == "title") {
        this.translatedTitle = traduccionResponse;
      }
      if (piece == "content") {
        this.translatedContent = traduccionResponse;
      }
    },
    savePost: function() {
      let originalLang =""
      let translateLang = "" //Ho se, no es elegant
      if(this.originalCode.code == undefined){
        originalLang =this.originalCode
      }else{
        originalLang =this.originalCode.code
      }
      if(this.translateCode.code == undefined){
        translateLang = this.translateCode
      }else{
        originalLang =this.originalCode.code
      }
      let data = {
        idPost: this.idPost,
        title: this.translatedTitle,
        content: this.translatedContent,
        lang_original: originalLang,
        lang_translate: translateLang,
        email: localStorage.getItem("userEmail")
      };
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };

      this.$axios.put("http://localhost:8080//postForm", data, config);
    },
    createPost: function() {
      let data = {
        idPost: this.idPost,
        title: this.translatedTitle,
        content: this.translatedContent,
        lang_original: this.originalCode.code,
        lang_translate: this.translateCode.code,
        email: localStorage.getItem("userEmail")
      };
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      };
      this.$axios.post("http://localhost:8080//postForm", data, config);
    }
  },
  async created() {},
  async mounted() {
    this.idPost = this.$route.query.idPost;
    await this.getLanguages();
    if (this.idPost != undefined || this.idPost != null) {
      console.log("The post id!: ", this.idPost);
      await this.getPost();
      this.isCreatePost = false;
    }
  }
};
</script>
