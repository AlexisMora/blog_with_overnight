<template>
  <q-page class="flex flex-center">
<div v-for="post in posts" :key="post.idPost" class="flex row">
    <q-card class="my-card flex col-12">
      <q-card-section>
        <div class="text-h6">{{post.title}}</div>
        <div class="text-subtitle2">by {{post.author.firstName}}  {{post.author.lastName}}</div>
        <div class="text-subtitle2">{{post.date}}</div>
      <q-badge color="blue"> Original Lang: {{post.langOriginal}}</q-badge>
      <q-badge color="blue"> Translated Lang: {{post.langTranslate}}</q-badge>
      </q-card-section>
    
      <q-card-section>
        {{ post.content }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat @click="detailPost(post.idPost)">Veure mes</q-btn>
      </q-card-actions>
    </q-card>
</div>
  </q-page>
</template>

<script>
export default {
  name: "Posts",
  data(){
    return {
      posts:[]
    }
  },
  methods:{
    getPosts:async function(){
      let fetchPosts = await this.$axios.get('http://localhost:8080/',{
        method:'GET',
        headers:new Headers({
          //'Authorization':'Bearer '+localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
        
      })
      fetchPosts = fetchPosts.data
      console.log("The posts!: ",fetchPosts)
      this.posts= fetchPosts
    },
    detailPost: function(idPost){
      this.$router.push({path:'detailPost',query:{idPost:idPost}})
    }
  },
  mounted() {
    this.getPosts()
  }
};
</script>
