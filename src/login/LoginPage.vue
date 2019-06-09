<template>
    <div class="menu-login">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <p >Username</p>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <p class="helper helper1">email@domain.com</p>
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                 <div v-show="removed" class="invalid-feedback">Usuario deshabilitado</div>
                 <div v-show="loginErrorB" class="invalid-feedback">{{loginError}}</div>
            </div>
            <div class="form-group">
                <p >Password</p>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.loggingIn">Login</button>
                <router-link to="/forgottenpass" class="btn btn-link">¿Has olvidado la contraseña?</router-link>
            </div>
        </form>
    </div>
</template>

<style>
.menu-login{
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:horizontal;
    -webkit-box-direction:normal;
        -ms-flex-direction:row;
            flex-direction:row; 
    -webkit-box-pack: center; 
        -ms-flex-pack: center; 
            justify-content: center;
}
form {
  background-color: #fff;
  border: solid 1px #ddd;
  border-radius: 0.5em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  display: block;
  font-family: 'Source Sans Pro', sans-serif;
  left: 50%;
  max-width: 400px;
  margin: 0;
  padding: 2.25em;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  width: 100%;
}
form input[type='email'], form input[type="text"], form input[type='password'] {
  background-color: #f3fafd;
  border: solid 2px #217093;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  color: #353538;
  display: block;
  font-family: inherit;
  font-size: 1.55em;
  font-weight: 600;
  height: 65px;
  margin: 0;
  padding: 0 1em 0;
  -webkit-transition: border-color 0.25s ease-out, -webkit-box-shadow 0.2s linear;
  transition: border-color 0.25s ease-out, -webkit-box-shadow 0.2s linear;
  -o-transition: box-shadow 0.2s linear, border-color 0.25s ease-out;
  transition: box-shadow 0.2s linear, border-color 0.25s ease-out;
  transition: box-shadow 0.2s linear, border-color 0.25s ease-out, -webkit-box-shadow 0.2s linear;
  width: 100%;
  -webkit-appearance: none;
}
form input[type='email']:focus, form input[type="text"]:focus, form input[type='password']:focus {
  border: solid 2px #4eb8dd;
  -webkit-box-shadow: 0px 2px 10px rgba(0, 0, 0, .1);
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
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-box-shadow: none;
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
  -webkit-transition: background-color 0.2s ease-out;
  -o-transition: background-color 0.2s ease-out;
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
  -webkit-transform: translate(1.4em, 2.6em) scale(1);
      -ms-transform: translate(1.4em, 2.6em) scale(1);
          transform: translate(1.4em, 2.6em) scale(1);
  -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transition: opacity 0.2s linear, -webkit-transform 0.2s ease-out;
  transition: opacity 0.2s linear, -webkit-transform 0.2s ease-out;
  -o-transition: transform 0.2s ease-out, opacity 0.2s linear;
  transition: transform 0.2s ease-out, opacity 0.2s linear;
  transition: transform 0.2s ease-out, opacity 0.2s linear, -webkit-transform 0.2s ease-out;
}
form  .helper {
  opacity: 1;
  -webkit-transform: translate(1.4em, 2em) scale(0.65);
      -ms-transform: translate(1.4em, 2em) scale(0.65);
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
            loginError:'',
            loginErrorB:false,
        }
    },
    updated(){
      if( JSON.parse(localStorage.getItem('user'))!=undefined){
        if( JSON.parse(localStorage.getItem('user')).deleted){
          this.removed = true;
          localStorage.removeItem('loginError');
        }else{
          this.removed = false;
        }
      }
       if( JSON.parse(localStorage.getItem('loginError'))!=undefined){
        this.loginError =  JSON.parse(localStorage.getItem('loginError')).error;
        this.loginErrorB = true;
      }else{
        this.loginErrorB = false;
        this.loginError = '';
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