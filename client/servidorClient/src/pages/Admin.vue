<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="post in posts" :key="post.idPost">
          <q-item-section top>
            <q-item-label lines="2">
              <span class="text-weight-bolder">titol: {{post.title}}</span>
            </q-item-label>

            <q-item-label lines="1">
              <span class="text-weight-medium">Llengua original - {{post.langOriginal}}</span>
            </q-item-label>
            <q-item-label lines="1">
             <span class="text-weight-medium">Llengua traduida - {{post.langTranslate}}</span>
            </q-item-label>

          </q-item-section>
          <q-item-section rigth side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn  label="Esborrar" color="red" @click="deletePost(post.idPost)"></q-btn>
              <q-btn  label="Editar" color="primary" @click="updatePost(post.idPost)"></q-btn>
            </div>
          </q-item-section>
          
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return{
      alert:false,
      confirm:false,
      posts:[]
    }
  },
  methods: {
    getPosts: async function() {
      let fetchPosts = await this.$axios.get("http://localhost:8080/", {
        method: "GET",
        headers: new Headers({
          //'Authorization':'Bearer '+localStorage.getItem("token"),
          "Content-Type": "application/json"
        })
      });
      fetchPosts = fetchPosts.data;
      console.log("The posts!: ", fetchPosts);
      this.posts = fetchPosts;
    },
    updatePost:function(idPost){
      console.log("we update it")
      this.$router.push({path:'/Admin/postform',query:{idPost:idPost}})
    },
    deletePost: function(idPost){
            let data = {
        idPost:idPost,
      }
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
          }
        }
        this.$axios.get("http://localhost:8080//deletepost?id="+idPost,config );
    }
  },
  mounted() {
    let token = this.$route.query.token;
    let userEmail = this.$route.query.userEmail
    if((token != undefined || token != null) &&(userEmail != undefined || userEmail != null) ){
    console.log("our Token!: ", token);
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail",userEmail)
    }
    this.getPosts();
  }
};
</script>
