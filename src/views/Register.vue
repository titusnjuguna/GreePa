<template>
  <div class="form-wrap">
      <h2>Create an Account</h2>
      <form  class="register">
          <p class="login-register">
              Already have an account
              <router-link class="router-link" :to="{name:'Register'}"> Login </router-link>
          </p>
          <div class="inputs">
              <div class="input">
                  <input type="text" placeholder="First name" v-model="firstname">
                  <user class="icon"/>
              </div>
              <div class="input">
                  <input type="text" placeholder="Last name" v-model="lastname">
                  <user class="icon"/>
              </div>
              <div class="input">
                  <input type="text" placeholder="Username" v-model="username">
                  <user class="icon"/>
              </div>
              <div class="input">
                  <input type="text" placeholder="Email" v-model="email">
                  <email class="icon"/>
              </div>
              <div class="input">
                  <input type="password" placeholder="Password" v-model="password">
                  <lock class="icon"/>
              </div>
          </div>
          <div v-show="error" class="error">{{this.errMsg}}</div>
          
        <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    
    
      </form>
      <div class="background"></div>


  </div>
</template>

<script>
import user from "../assets/Icons/user-alt-light.svg"
import email from "../assets/Icons/envelope-regular.svg"
import lock from "../assets/Icons/lock-alt-solid.svg"
import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"

export default {
  name:"Register",
  components:{
    user,email,lock
  },
  data(){
    return{
        firstname: "",
        lastname:  "",
        username:  "",
        email:     "",
        password:  "",
        err: null,
        errMsg:""
    }
  
  },
  methods:{
    async register(){
      if(
        this.firstname !== ""&&
        this.lastname  !== ""&&
        this.username !==""&&
        this.email !=="" &&
        this.password !==""

      ){
        this.err==false;
        this.errMsg=="";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const database = db.collection("users").doc(result.user.uid);
        await database.set({
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,

        });
        this.$router.push({name: "Home"});

        return;

      }
      this.err == true;
      this.errMsg == "Please fill the field";
      return;
    }
  }

};
</script>

<style lang="scss">
.register {
  h2 {
    max-width: 350px;
  }
}

</style>