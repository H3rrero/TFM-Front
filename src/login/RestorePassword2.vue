<template>
    <div class="container-task-data" > 
        <div class="title-task-data">
            <p>Introduce tu respuesta a la pregunta de seguridad</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p class="question">{{data.question}}</p>
               </div>
             <div class="item-task-data">
                <p>* Respuesta:</p>
                <input v-model="myData.answer">
                <p v-if="validar && (myData.answer == undefined||myData.answer.trim()=='')"
                 v-bind:class="{ 'error': (myData.answer == undefined|| myData.answer.trim()=='')}" >* El campo respuesta es obligatorio</p>
            </div>      
            <div class="item-task-data">
                <p v-if="!validData" v-bind:class="{ 'error':!validData}">Alguno de los datos es incorrecto</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="createUser()">Confirmar</a>
                
            </div>
        </div>
    </div>
</template>

<script>

import { userService} from '../_services/user.service';
export default {
    props: {
        data: Object
    },
    data(){
       return{ 
       validar : false,
       validData:true,
       myData:{
        answer:""
        },
       }
    },
    methods:{
        validate:function(){
           if(this.myData.answer == undefined||
            this.myData.answer.trim() == ""
            ) {
                return false;
           }else{
                return true;
           }
        },
        createUser:function () {
            if(this.validate()){
                userService.checkAnswer(this.data.user,this.myData.answer).then(data =>{
                    if(data.result){
                        this.$emit('answer-correct');
                    }else{
                        this.validar =true;
                        this.validData = false;
                    }
                });
                this.validData = true;
                this.validar = false;
                //this.$router.go(-1);  
            }else{
                this.validar =true;
                 this.validData = false;
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
.question{
    margin-bottom: 2rem;
}
.button:before {
  background-color: rgba(255, 255, 255, 0.5);
  content: "";
  height: 100%;
  display: block;
  left: -4.5em;
  position: absolute;
  top: 0;
  -webkit-transform: skewX(-45deg) translateX(0);
      -ms-transform: skewX(-45deg) translateX(0);
          transform: skewX(-45deg) translateX(0);
  -webkit-transition: none;
  -o-transition: none;
  transition: none;
  width: 3em;
}
.button:hover {
  background-color: #2194e0;
  border-bottom: 4px solid var(--admin-color);
  color: #fff;
}
.button:hover:before {
  -webkit-transform: skewX(-45deg) translateX(13.5em);
      -ms-transform: skewX(-45deg) translateX(13.5em);
          transform: skewX(-45deg) translateX(13.5em);
  -webkit-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
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
    text-align: center;
    margin-bottom: 5px;
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
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

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