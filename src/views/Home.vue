<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost v-for="(post,index) in blogPostsFeed" :key="index" :post="post" /> 
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View Recent Post </h3>
        <div class="blog-cards">
          <BlogCards v-for="(post,index) in blogPostsCards" :key="index" :post="post" />
        </div>
      </div>
    </div>
    <div class="container">
      <div v-if="!user" class="updates">
        <h2>Never miss a post. Register for your free account today! </h2>
        <router-link  class="router-button" to="#"> Register To Greepa <Arrow class="arrow arrow-light"/> </router-link>


      </div>
    </div>
    
    
  </div>
</template>

<script>
/* importing components  */
import Arrow from '../assets/Icons/arrow-right-light.svg'
import BlogPost from '@/components/BlogPost.vue';
import BlogCards from '@/components/BlogCards.vue';
export default {
  name: "Home",
  components: {BlogPost,BlogCards,Arrow},
  data(){
    return{
      welcomeScreen: {
        title: "Welcome!",
        blogPost:"Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      
      
      }
        
  },
  computed:{
     blogPostsFeed(){
      return this.$store.getters.blogPostsFeed
      
    },
    blogPostsCards(){
      return this.$store.getters.blogPostsCards
      
    },
    
    user(){
    return this.$store.state.user;
  }

  }
};
</script>
<style lang="scss" scoped>
.blog-card-wrap{
  h3{
    font-size:28px ;
    font-weight: 300;
    margin-bottom: 32px;
  }
}
.container {
  .updates {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}

</style>
