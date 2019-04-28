<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>Introduce los datos del usuario</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Nombre de usuario:</p>
                <input v-model="myUser.username">
                <p v-if="validar && (myUser.username == undefined|| myUser.username.trim()=='')"
                 v-bind:class="{ 'error': (myUser.username == undefined|| myUser.username.trim()=='')}" >* El campo nombre es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>* Contraseña:</p>
                <input type="password" v-model="myUser.password">
                <p v-if="validar && (myUser.password == undefined|| myUser.password.trim()=='')"
                 v-bind:class="{ 'error': (myUser.password == undefined|| myUser.password.trim()=='')}" >* El campo contraseña es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>* Nombre:</p>
                <input v-model="myUser.firstname">
                <p v-if="validar && (myUser.firstname == undefined|| myUser.firstname.trim()=='')"
                 v-bind:class="{ 'error': (myUser.firstname == undefined|| myUser.firstname.trim()=='')}" >* El campo nombre es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>* Apellidos:</p>
                <input v-model="myUser.lastname">
                <p v-if="validar && (myUser.lastname == undefined|| myUser.lastname.trim()=='')"
                 v-bind:class="{ 'error': (myUser.lastname == undefined|| myUser.lastname.trim()=='')}" >* El campo apellidos es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p v-if="userCreated" v-bind:class="{ 'correct':userCreated}">El usuario se ha añadido correctamente</p>
            </div>
            <div class="buttons">
                <div class="item-button-data">
                    <a class="button" v-on:click="createUser()">Añadir usuario</a>
                </div>
                <div class="item-button-data">
                    <a class="button-cancelar" v-on:click="cancelar()">Cancelar</a>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

 import { userService } from '../_services/user.service';
export default {
    data(){
       return{ 
       validar : false,
       userCreated:false,
       myUser:{
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        projectId:parseInt(this.$route.params.id),
        token:"",
        deleted:false,
        rol:"user"},
       }
    },
    methods:{
        validate:function(){
            console.log(this.myUser);
           if(this.myUser.username == undefined||
            this.myUser.username.trim() == ""||
            this.myUser.password == undefined||
            this.myUser.password.trim() == ""||
            this.myUser.firstname == undefined||
            this.myUser.firstname.trim() == ""||
            this.myUser.lastname == undefined||
            this.myUser.lastname.trim() == ""||
            this.myUser.rol == undefined||
            this.myUser.rol.trim() == "") {
                return false;
           }else{
                return true;
           }
        },
        cancelar:function () {
            this.$router.push('/usersproject');  
        },
        createUser:function () {
            if(this.validate()){
                console.log("bieeen");
                this.userCreated = true;
                this.validar = false;
                userService.register(this.myUser).then(user=>{
                    this.$router.push('/usersproject');  
                })
                
            }else{
                this.validar =true;
                console.log("maaaaallll");
            }
        }
    }
};
</script>
<style scoped>

.button {
    border: 2px solid #333399;
    border-radius: 0.3em;
    color: #333399;
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
  border-bottom: 4px solid #333399;
  color: #fff;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.button-cancelar {
    border: 2px solid #D52525;
    border-radius: 0.3em;
    color: #D52525;
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
.button-cancelar:before {
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
.button-cancelar:hover {
  background-color: #D52525;
  border-bottom: 4px solid #D52525;
  color: #fff;
}
.button-cancelar:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.buttons{
    display: flex;
    margin: 0 auto;
    padding: 2%;
    width: 80%;
}
.container-task-data{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    margin-top: 20px;
}
.error{
    color: red;
    margin-bottom: 10px;
}
.correct{
    color: green;
    margin-bottom: 10px;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: #333399;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
        margin-bottom: 5px;
}
.form-task-data{
    display: flex;
    flex-direction: column;
}
.item-task-data{  
    margin-top: 10px;
    margin: 0 auto;
    width: 95%;
}
.item-button-data{  
    margin: 0 auto;
    margin-top: 40px;
    width: 95%;
}
.item-text-data{  
    margin: 0 auto;
    width: 95%;

}
.item-text-data > div{
    border: 2px solid #333399;
    border-radius: 5px;
    box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
.item-text-data > div >p{
    margin-top: 7px;
}
.item-textarea-data{  
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

}
.item-textarea-data > div{
    border: 2px solid #333399;
    border-radius: 5px;
    box-sizing: border-box;
    height: 100%;
    margin: 10px 0;
    padding: 0 15px;
}
.item-textarea-data > div >p{
    margin-top: 7px;
}
.item-task-data *{
   width: 100%;
}
.dates{
    display: flex;
    flex-direction: row;
}
.dateini{
    margin-right: 10px;
}
input, select, textarea{
    border: 2px solid #333399;
    border-radius: 5px;
    box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
@media only screen and (max-width: 980px) {
    .container-task-data{
        width: 100%;
    }
    .dates{
        display: flex;
        flex-direction: column;
    }
}
</style>