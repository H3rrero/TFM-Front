<template>
    <div class="container-task-data" > 
        <div class="title-task-data">
            <p>Introduce tus datos</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Nombre de usuario:</p>
                <input v-model="myData.user">
                <p v-if="validar && (myData.user == undefined|| myData.user.trim()=='')"
                 v-bind:class="{ 'error': (myData.user == undefined|| myData.user.trim()=='')}" >* El campo usuario es obligatorio</p>
            </div>
             <div class="item-task-data">
                <p>* Dirección de correo:</p>
                <input v-model="myData.mail">
                <p v-if="validar && (myData.mail == undefined|| myData.mail.trim()=='')"
                 v-bind:class="{ 'error': (myData.mail == undefined|| myData.mail.trim()=='')}" >* El campo correo es obligatorio</p>
            </div>      
            <div class="item-task-data">
                <p v-if="!validData" v-bind:class="{ 'error':!validData}">Alguno de los datos es incorrecto</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="createUser()">Continuar</a>
                
            </div>
        </div>
    </div>
</template>

<script>

import { userService} from '../_services/user.service';
export default {
    data(){
       return{ 
       validar : false,
       validData:true,
       myData:{
        user:"",
        mail:""
        },
       }
    },
    methods:{
        validate:function(){
           if(this.myData.user == undefined||
            this.myData.user.trim() == ""||
            this.myData.mail == undefined||
            this.myData.mail.trim() == ""
            ) {
                return false;
           }else{
                return true;
           }
        },
        createUser:function () {
            if(this.validate()){
                userService.getByUserAndMail(this.myData.user, this.myData.mail).then(data =>{
                    if(data.result){
                        this.validData = true;
                        this.validar = false;
                        this.$emit('check-user',{user:this.myData.user, question:data.question});
                    }else{
                        this.validar =true;
                    }
                });  
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
    border: 2px solid var(--admin-color);
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
    margin: 0 auto;
    margin-top: 10px;
    width: 95%;

}
.item-textarea-data > div{
    border: 2px solid var(--admin-color);
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
    border: 2px solid var(--admin-color);
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