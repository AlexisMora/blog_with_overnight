<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <h4>{{this.post.title}}</h4>
      </div>
      <div class="row">
      <div class="col-12">
        Original Lang<q-badge>{{this.post.langOriginal}}</q-badge>
        translated Lang<q-badge>{{this.post.langTranslate}}</q-badge>
      </div>
      <div class="col-12">
        <span>Author: {{post.author.firstName}}  {{post.author.lastName}}</span>
      </div>
      </div>
      

      <article class="col-12">
         {{ post.content }}
      </article>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "detailPost",
  data() {
    return {
      idPost: "",
      post: []
    };
  },
  methods: {
    getPostById: async function() {
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
      console.log("The post!: ", fetchPost);
      this.post = fetchPost;
    }
  },
  mounted() {
    this.idPost = this.$route.query.idPost;
    this.getPostById();
  }
};
</script>
