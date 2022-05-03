<template>
  <div class="post-view" v-if="currentblog">
      <div class="container quillWrapper">
          <h2>{{ this.currentblog[0].blogTitle }}</h2>
          <h4>Posted on: {{new Date(this.currentblog[0].blogDate).toLocaleString('en-us',{dateStyle:"long"})}}</h4>
          <img :src="this.currentblog[0].blogCoverPhoto" alt="" >
      </div>
      <div class="post-content ql-editor" v-html="this.currentblog[0].blogHTML"></div>
  </div>
</template>


<script>
export default {
    name:"Viewblog",
    data() {
        return{
             currentblog: null
    };
        },
       

    async mounted(){
        this.currentblog = await this.$store.state.blogPosts.filter((post) => { return post.blogID === this.$route.params.blogid;});

    },

}
</script >

<style lang="scss">
.post-view{
    h4{
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }
}
</style>