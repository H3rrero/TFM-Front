<template>
    <div class="menu-login">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <p >Username</p>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <p class="helper helper1">email@domain.com</p>
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                 <div v-show="removed" class="invalid-feedback">Usuario deshabilitado</div>
            </div>
            <div class="form-group">
                <p >Password</p>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.loggingIn">Login</button>
                <!--<router-link to="/register" class="btn btn-link">Register</router-link>-->
            </div>
        </form>
    </div>
</template>

<style>
.menu-login{
    display:flex;
    flex-direction:row; 
    justify-content: center;
}
form {
  background-color: #fff;
  border: solid 1px #ddd;
  border-radius: 0.5em;
  box-sizing: border-box;
  display: block;
  font-family: 'Source Sans Pro', sans-serif;
  left: 50%;
  max-width: 400px;
  margin: 0;
  padding: 2.25em;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
form input[type='email'], form input[type="text"], form input[type='password'] {
  background-color: #f3fafd;
  border: solid 2px #217093;
  border-radius: 4px;
  box-sizing: border-box;
  color: #353538;
  display: block;
  font-family: inherit;
  font-size: 1.55em;
  font-weight: 600;
  height: 65px;
  margin: 0;
  padding: 0 1em 0;
  transition: box-shadow 0.2s linear, border-color 0.25s ease-out;
  width: 100%;
  -webkit-appearance: none;
}
form input[type='email']:focus, form input[type="text"]:focus, form input[type='password']:focus {
  border: solid 2px #4eb8dd;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .1);
  outline: none;
}
form input[type='email'], form input[type="text"] {
  padding: 14px 1em 0px;
}
form button {
  background-color: #4eb8dd;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: none;
  color: #fff;
  display: block;
  font-size: 1.55em;
  font-weight: 600;
  font-family: inherit;
  height: 65px;
  margin: 0;
  margin-top: 10px;
  padding: 0.65em 1em 1em;
  transition: background-color 0.2s ease-out;
  width: 100%;
}
form button:hover, form button:active {
  background-color: #217093;
}
form p {
  color: #217093;
  display: block;
  font-size: 1.25em;
  font-weight: 700;
  font-family: inherit;
  margin: 10px 0 12px;
}
form  .helper {
  font-family: inherit;
  position: absolute;
  z-index: 1;
}
form  .helper1 {
  color: #217093;
  font-size: 1.25em;
  font-weight: 400;
  left: 15px;
  opacity: 0.65;
  pointer-events: none;
  top: 35px;
  transform: translate(1.4em, 2.6em) scale(1);
  transform-origin: 0 0;
  transition: transform 0.2s ease-out, opacity 0.2s linear;
}
form  .helper {
  opacity: 1;
  transform: translate(1.4em, 2em) scale(0.65);
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false,
            removed:false,
        }
    },
    updated(){
      console.log( JSON.parse(localStorage.getItem('user')));
      if( JSON.parse(localStorage.getItem('user'))!=undefined){
        if( JSON.parse(localStorage.getItem('user')).deleted){
          this.removed = true;
        }else{
          this.removed = false;
        }
      }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>