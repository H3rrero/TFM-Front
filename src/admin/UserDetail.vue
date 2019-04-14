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
                <p>Rol:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{myUser.rol}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
export default {
    props: {
   myUser: Object
  },
    data(){
       return{ 
       project:"No tiene proyecto asignado",
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
    }
};
</script>
<style scoped>
.container-task-data{
    background-color: #eee;
    display: flex;
    height: 100%;
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
    color: #333399;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
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
.left{
    margin-left: 5px;
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
        width: 80%;
    }
}
</style>