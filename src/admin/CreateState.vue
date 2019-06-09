<template>
<div>
    <app-breadcrumbs class="admin-background"></app-breadcrumbs>
    <div class="container-task-data" > 
        <div class="title-task-data">
            <p>Introduce los datos del estado</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Nombre del estado:</p>
                <input v-model="myState.name">
                <p v-if="validar && (myState.name == undefined|| myState.name.trim()=='')"
                 v-bind:class="{ 'error': (myState.name == undefined|| myState.name.trim()=='')}" >* El campo nombre es obligatorio</p>
            </div>  
            <div class="item-button-data">
                <a class="button" v-on:click="createState()">Añadir projecto</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { stateService } from '../_services/states.service';
export default {
    data(){
       return{ 
       validar : false,
       myState:{
        name:"",
        projectId:this.$route.params.id,
        order:this.$route.params.order,
        },
       }
    },
    methods:{
        validate:function(){
           if(this.myState.name == undefined||
            this.myState.name.trim() == ""
            ) {
                return false;
           }else{
                return true;
           }
        },
        createState:function () {
            if(this.validate()){
                this.validar = false;
                stateService.createState(this.myState);
                this.$router.go(-1);  
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