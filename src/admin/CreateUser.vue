<template>
<div>
    <app-breadcrumbs class="admin-background"></app-breadcrumbs>
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
                <p>* Pregunta de seguridad:</p>
                <input v-model="myUser.question">
                <p v-if="validar && (myUser.question == undefined|| myUser.question.trim()=='')"
                 v-bind:class="{ 'error': (myUser.question == undefined|| myUser.question.trim()=='')}" >* El campo pregunta es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>* Respuesta de seguridad:</p>
                <input v-model="myUser.answer">
                <p v-if="validar && (myUser.answer == undefined|| myUser.answer.trim()=='')"
                 v-bind:class="{ 'error': (myUser.answer == undefined|| myUser.answer.trim()=='')}" >* El campo respuesta es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>* Correo electronico:</p>
                <input type="email" v-model="myUser.mail">
                <p v-if="validar && (myUser.mail == undefined|| myUser.mail.trim()=='')"
                 v-bind:class="{ 'error': (myUser.mail == undefined|| myUser.mail.trim()=='')}" >* El campo correo es obligatorio</p>
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
</div>
</template>

<script>

 import { userService } from '../_services/user.service';
import { userProjectService } from '../_services/userProject.service';
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
        question:"",
        answer:"",
        mail:"",
        projectId:this.$route.params.id,
        token:"",
        deleted:false,
        rol:"user"},
       }
    },
    methods:{
        validate:function(){
           if(this.myUser.username == undefined||
            this.myUser.username.trim() == ""||
            this.myUser.password == undefined||
            this.myUser.password.trim() == ""||
            this.myUser.firstname == undefined||
            this.myUser.firstname.trim() == ""||
            this.myUser.lastname == undefined||
            this.myUser.lastname.trim() == ""||
            this.myUser.question == undefined||
            this.myUser.question.trim() == ""||
            this.myUser.answer == undefined||
            this.myUser.answer.trim() == ""||
            this.myUser.mail == undefined||
            this.myUser.mail.trim() == ""||
            this.myUser.rol == undefined||
            this.myUser.rol.trim() == "") {
                return false;
           }else{
                return true;
           }
        },
        cancelar:function () {
            this.$router.go(-1);  
        },
        createUser:function () {
            if(this.validate()){
                this.userCreated = true;
                this.validar = false;
                userService.register(this.myUser).then(user=>{
                    var userProj = {
                            user: user.id,
                            project:user.projectId
                        }
                        userProjectService.createUserProject(userProj);
                   this.$router.go(-1);  
                })
                
            }else{
                this.validar =true;
            }
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
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    width: 50% !important;
}
.button:hover {
  background-color: var(--admin-color);
  border-bottom: 4px solid var(--admin-color);
  color: #fff;
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
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    width: 50% !important;
}
.button-cancelar:hover {
  background-color: #D52525;
  border-bottom: 4px solid #D52525;
  color: #fff;
}
.buttons{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 auto;
    padding: 2%;
    width: 80%;
}
.container-task-data{
    background-color: white;
    border: 2px solid var(--admin-color);
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin: 0 auto;
    margin-top: 20px;
    width: 50%;
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
    color: var(--admin-color);
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 5px;
    text-align: center;
    vertical-align: middle;
}
.form-task-data{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
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
    border: 2px solid var(--admin-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
.item-text-data > div >p{
    margin-top: 7px;
}
.item-textarea-data{  
    margin: 0 auto;
    margin-top: 10px;
    width: 95%;

}
.item-textarea-data > div{
    border: 2px solid var(--admin-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
}
.dateini{
    margin-right: 10px;
}
input, select, textarea{
    border: 2px solid var(--admin-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
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
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
    }
}
</style>