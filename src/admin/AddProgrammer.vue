<template>
    <div>
        <div class="task-container">
            <div class="mask" v-if="show" v-on:click="hideMenu();"></div>
            <drop @dragover="asignedUser(-1)"  class="unassigned-task"  v-if="haveData" >
                 <div class="title-task-data">
                    <p>Usuarios sin proyecto</p>
                </div>
                <div v-for="user in users" :key="user.id">
                    <drag @dragend="handleDrop"  :transfer-data="user" >
                         <user v-if="user.projectId == -1" :user="user" v-on:show-data="showMenu(user)"></user>  
                    </drag>
                </div>
            </drop>

            <div class="programmers">
                <div class="programmers-item" >
                    <div class="programmers-item-title">
                        {{project.name}}
                    </div>
                    <drop @dragover="asignedUser(project.id)" class="programmers-item-task">
                        <div v-for="user in users" :key="user.id">
                            <drag @dragend="handleDrop"  :transfer-data="user" >
                                 <user v-if="user.projectId == project.id" :user="user" v-on:show-data="showMenu(user)"></user>
                            </drag>
                        </div>
                    </drop>
                </div>
            </div>
                
            <transition name="slide-fade">
                <userdetail v-if="show" :myUser="userSelected"></userdetail>  
            </transition>  
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
 import { userService} from '../_services/user.service';
export default {
    data(){
       return{ 
        users:[],
        project:{},
        show:false,
        currentUser: JSON.parse(localStorage.getItem('user')),
        userSelected:{},
        haveData: false,
        selectProject:this.$route.params.id,
       }
    },
    created () {
        this.getUsers();
        this.getProjects();
    },
    methods: {
         getUsers: function () {
          userService.getAll().then(
            userss=>{
                    this.users = userss;
                    this.haveData = true;
            }
       );
        },
         getProjects: function () {
           projectService.getAll().then(
            projectss=>{
                projectss.forEach(element => {
                    if(element.id == this.selectProject){
                        this.project = element;
                    }
                });
            }
       );
        },
        showMenu: function (user) {
            this.show = true;
            this.userSelected = user;
        },
        hideMenu: function () {
            if(this.show)
            this.show = false;
        },
        handleDrop(data, event) {
                data.projectId = this.projectAsignedId;
                data.rol = 'user'
                userService.update(data);
        },
        asignedUser: function (id) {
            this.projectAsignedId = id;
        }
    }
};
</script>
<style scoped>
.task-container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.unassigned-task{
    background-color: #333399;
    border: 2px solid white;
    border-radius: 1rem;
    margin-right: 10px;
    width: 20%;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.programmers{
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    margin-right: 10px;
    padding: 1rem;
    width: 80%;
}
.programmers-item{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 50px;
    width: 300px;
}
.programmers-item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.programmers-item-title{
    background-color: #333399;
    border-bottom: 1px solid white;
    color: white;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    padding: 0.3rem;
    text-align: center;
}
.programmers-item-task{
    height: 90%;
    background-color: #333399;
}
.mask{
    background-color: #3D3A3F;
    height: 100%;
    opacity: 0.8;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 5;
}
.notification{
    margin-left: 40%;
}
.slide-fade-enter-active {
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
 
}
</style>