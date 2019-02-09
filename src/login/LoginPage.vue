<template>
    <div class="menu-login">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <p >Username</p>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <p class="helper helper1">email@domain.com</p>
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  border: solid 1px #ddd;
  border-radius: 0.5em;
  font-family: 'Source Sans Pro', sans-serif;
}
form input[type='email'], form input[type="text"], form input[type='password'] {
  display: block;
  margin: 0;
  padding: 0 1em 0;
  background-color: #f3fafd;
  border: solid 2px #217093;
  border-radius: 4px;
  -webkit-appearance: none;
  box-sizing: border-box;
  width: 100%;
  height: 65px;
  font-size: 1.55em;
  color: #353538;
  font-weight: 600;
  font-family: inherit;
  transition: box-shadow 0.2s linear, border-color 0.25s ease-out;
}
form input[type='email']:focus, form input[type="text"]:focus, form input[type='password']:focus {
  outline: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .1);
  border: solid 2px #4eb8dd;
}
form input[type='email'], form input[type="text"] {
  padding: 14px 1em 0px;
}
form button {
  display: block;
  margin: 0;
  margin-top: 10px;
  padding: 0.65em 1em 1em;
  background-color: #4eb8dd;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: none;
  width: 100%;
  height: 65px;
  font-size: 1.55em;
  color: #fff;
  font-weight: 600;
  font-family: inherit;
  transition: background-color 0.2s ease-out;
}
form button:hover, form button:active {
  background-color: #217093;
}
form p {
  margin: 10px 0 12px;
  display: block;
  font-size: 1.25em;
  color: #217093;
  font-weight: 700;
  font-family: inherit;
}
form  .helper {
  position: absolute;
  z-index: 1;
  font-family: inherit;
}
form  .helper1 {
  top: 35px;
  left: 15px;
  transform: translate(1.4em, 2.6em) scale(1);
  transform-origin: 0 0;
  color: #217093;
  font-size: 1.25em;
  font-weight: 400;
  opacity: 0.65;
  pointer-events: none;
  transition: transform 0.2s ease-out, opacity 0.2s linear;
}
form  .helper {
  /*input[type='email']:focus + .helper {*/
  transform: translate(1.4em, 2em) scale(0.65);
  opacity: 1;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            console.log(username);
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>