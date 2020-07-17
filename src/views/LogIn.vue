<template>
  <div id="login">
    <h1>Log In</h1>

    <div id="google">
      <button @click="handleClickGetAuth" :disabled="!isInit">get auth code</button>
      <button @click="handleClickSignIn" v-if="!isSignIn" :disabled="!isInit">signIn</button>
      <button @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signOut</button>
    </div>
    <div id="facebook">
      <v-facebook-login v-model="model" app-id="225244491798274" @sdk-init="handleSdkInit" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VFacebookLogin from "vue-facebook-login-component";

export default {
  components: {
    VFacebookLogin
  },
  name: "test",
  data() {
    return {
      isInit: false,
      isSignIn: false,
      GoogleUser: {},
      FB: {},
      FBUser: "",
      model: {},
      scope: {}
    };
  },

  methods: {
    //facebook
    handleSdkInit({ FB, scope }) {
      this.FB = FB;
      this.scope = scope;
      this.getEmail();
    },
    getEmail() {
      FB.login(
        function(response) {
          if (response.authResponse) {
            console.log("Welcome!  Fetching your information.... ");
            FB.api("/me", function(response) {
              console.log(response.id);
            });
            console.log(response);
            // this.FBUser = response.id;
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        {
          scope: "email",
          return_scopes: true
        }
      );
    },
    //google
    handleClickGetAuth() {
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          // On success
          return this.$http.post("http://your-backend-server.com/auth/google", {
            code: authCode,
            redirect_uri: "postmessage"
          });
        })
        .then(response => {
          // And then
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          // On fail do something
        });
    },

    handleClickSignIn() {
      this.$gAuth
        .signIn()
        .then(user => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log("user", user);
          this.isSignIn = this.$gAuth.isAuthorized;
          this.GoogleUser = user;
        })
        .catch(error => {
          // On fail do something
        });
    },

    handleClickSignOut() {
      this.$gAuth
        .signOut()
        .then(() => {
          // On success do something
          this.isSignIn = this.$gAuth.isAuthorized;
        })
        .catch(error => {
          // On fail do something
        });
    }
  },
  mounted() {
    let that = this;
    let checkGauthLoad = setInterval(function() {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  }
};
</script>

<style scoped>
#login {
  padding-top: 100px;
  width: 100%;
  align-content: center;
  text-align: center;
}
.v-facebook-login {
  margin-left: 43.75%;
  margin-top: 5%;
  width: 12.5%;
}
#facebook {
  width: 100%;
}
</style>