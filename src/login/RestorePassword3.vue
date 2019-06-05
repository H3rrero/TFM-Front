<template>
    <div class="container-task-data" > 
        <div class="title-task-data">
            <p>Tu contraseña ha sido actualizada</p>
        </div>
        <div class="form-task-data">
            <p>Se te ha mandado un correo con a nueva contraseña</p>
            <button class="button" v-on:click="backLogin()">Volver al login</button>
        </div>
    </div>
</template>

<script>

import { userService} from '../_services/user.service';
export default {
    
    methods:{
        backLogin:function () {
            this.$router.push(`/login`);
        }
    }
};
</script>
<style scoped>
.button {
    border: 2px solid var(--admin-color);
    border-radius: 0.3em;
    color: var(--admin-color);
    display: inline-block;
    font-size: 17px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.75em 2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    width: 50% !important;
}

.button:before {
  background-color: rgba(255, 255, 255, 0.5);
  content: "";
  height: 100%;
  display: block;
  left: -4.5em;
  position: absolute;
  top: 0;
  transform: skewX(-45deg) translateX(0);
  transition: none;
  width: 3em;
}
.button:hover {
  background-color: #2194e0;
  border-bottom: 4px solid var(--admin-color);
  color: #fff;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.container-task-data{
    background-color: white;
    border: 2px solid var(--admin-color);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 20px;
    padding-bottom: 2rem;
    width: 50%;
}

.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: var(--admin-color);
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 5px;
    text-align: center;
    vertical-align: middle;
}
.form-task-data{
    display: flex;
    flex-direction: column;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
    margin: 0 auto;
    margin-bottom: 20px;
    margin-top: 20px;
}

@media only screen and (max-width: 980px) {
    .container-task-data{
        width: 100%;
    }
}
</style>