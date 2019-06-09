<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>{{this.myUser.firstname + " " + this.myUser.lastname}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Usuario:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{myUser.username}}</p>
                    </div>
                </div>
            </div>
             <div class="item-task-data">
                <p>Proyecto:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{project}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p>* Rol:</p>
                <select  v-model="myUser.rol" >
                    <option value="manager">Jefe de proyecto</option>
                    <option value="user">Programador</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>{{result}}</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="updateUser()">Actualizar usuario</a>
                
            </div>
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
  import { userService} from '../_services/user.service';
export default {
    props: {
   myUser: Object
  },
    data(){
       return{ 
       project:"No tiene proyecto asignado",
       result:""
       }
    },
    created () {
        this.getProject();
    },
    methods:{
        getProject: function () {
           projectService.getAll().then(
            projectss=>{
            projectss.forEach(element => {
                if(element.id == this.myUser.projectId){
                    this.project = element.name;
                }
            });
            }
       );
        },
        updateUser() {
                userService.update(this.myUser).then(user =>{
                    this.result = "El usuario se ha actualizado correctamente.";
                });
        },
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
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin:0;
    overflow: auto;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: var(--admin-color);
    line-height: 50px;
    text-align: center;
    font-weight: 700;
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
.item-button-data{  
    margin: 0 auto;
    margin-top: 40px;
    width: 95%;
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
.left{
    margin-left: 5px;
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
        width: 80%;
    }
}
</style>