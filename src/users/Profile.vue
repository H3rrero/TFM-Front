<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>Perfil</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Nombre:</p>
                <div class="item-text-data">
                    <div>
                        <p>{{user.firstname + " "+ user.lastname}}</p>
                    </div>
                </div>
            </div>
           <div class="item-task-data">
                <p>Usuario:</p>
                <div class="item-text-data">
                    <div>
                        <p>{{user.username}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p>Rol:</p>
                <div class="item-text-data">
                    <div>
                        <p>{{user.rol}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data" v-if="showPass">
                <p>Contraseña actual:</p>
                 <div class="item-password">
                    <input v-model="currentPassword" type="password">
                </div>
            </div>
            <div class="item-task-data" v-if="showPass">
                <p>Nueva contraseña:</p>
                <div class="item-password">
                    <input v-model="password" type="password">
                </div>
            </div>
            <div class="item-task-data" v-if="showPass">
                <p>Repite la nueva contraseña:</p>
                <div class="item-password">
                    <input v-model="confirmPasswrod" type="password">
                </div>
            </div>
            <div class="item-task-data " v-bind:class="{ 'error': error,'correct':success }">
                <p >{{result}}</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="changePassword()">Cambiar contraseña</a>
            </div>
        </div>
    </div>
</template>

<script>

import { userService } from '../_services/user.service';
export default {
    data(){
       return{ 
       user: JSON.parse(localStorage.getItem('user')),
       error:false,
       success:true,
       result:"",
       currentPassword:"",
       password:"",
       confirmPasswrod:"",
       showPass:false
       }
    },
    methods:{
        changePassword:function () {
            if(this.showPass){
                if(this.currentPassword != this.user.password || this.password != this.confirmPasswrod){
                    this.result="Alguno de los datos no es correcto";
                    this.error=true;
                    this.success=false;
                }
                if(this.currentPassword == this.user.password && this.password == this.confirmPasswrod){
                    this.user.password = this.password;
                    userService.update(this.user).then(user=>{
                       this.result="La contraseña se ha actualizado.";
                        this.error=false;
                        this.success=true;
                        this.showPass=false;
                    });
                }
            }else{
                this.showPass=true;
            }
        }
      
    }
};
</script>
<style scoped>

.button {
    border: 2px solid var(--man-color);
    border-radius: 1.3em;
    color: var(--man-color);
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
  border-bottom: 4px solid var(--man-color);
  color: #fff;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.container-task-data{
    background-color: white;
    border: 2px solid var(--man-color);
    border-radius: 1rem;
    display: flex;
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
    color: var(--man-color);
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
.item-text-data{  
    margin: 0 auto;
    width: 95%;

}
.item-text-data > div{
    background-color: #eee;
    border: 2px solid var(--man-color);
    border-radius: 5px;
    box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
.item-text-data > div >p{
    margin-top: 7px;
}
.item-button-data{  
    margin: 0 auto;
    width: 80%;
}
.item-password{
    margin: 0 auto;
}
.item-textarea-data{  
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

}
.item-textarea-data > div{
    border: 2px solid var(--man-color);
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
   width: 80%;
}
.item-task-data > p{
    margin: 0 auto;
}
.dates{
    display: flex;
    flex-direction: row;
}
.dateini{
    margin-right: 10px;
}
input, select, textarea{
    border: 2px solid var(--man-color);
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