<template>
    <div>
        <div class="user-container">
            <div class="users">
                <div class="users-item" v-for="user in users" :key="user.id">
                   <div class="users-item-title"  v-bind:class="{ 'users-item-title-admin': user.rol == 'manager','users-item-title-normal': user.rol != 'manager'}">
                        <p >{{user.username}}</p>
                        <div>
                            <span v-on:click="deleteUser(user)" title="abrir diagrama de BurnDown" >
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </div>
                    <div  class="users-body"  v-bind:class="{ 'users-body-admin': user.rol == 'manager','users-body-normal': user.rol != 'manager'}">
                        <div class="information">
                            <div class="icon">
                                <span style="font-size: 1em;">
                                    <i class="far fa-user-circle"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>{{user.firstname + " " + user.lastname}}</p>
                            </div>
                        </div>
                        <div class="information second">
                            <div class="icon">
                                <span style="font-size: 1em;">
                                   <i class="fas fa-sitemap"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>{{user.rol}}</p>
                            </div>
                        </div>
                        <div class="information second">
                            <div class="icon">
                                <span style="font-size: 1em;">
                                   <i class="fas fa-project-diagram"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>{{nameProject}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="users-item" title="Añadir un nuevo usuario al proyecto" >
                    <button class="addPhase" v-on:click="openNewUser()">+</button>
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
        users:[],
        selectProject:this.$route.params.id,
        nameProject:this.$route.params.name,
       }
    },
    created () {
        this.getUsersActive();
    },
    methods: {
       getUsersActive: function () {
           this.users = [];
          userService.getAll().then(
            userss=>{
            userss.forEach(element => {
                if(!element.deleted && element.rol!='admin' && element.projectId == this.selectProject){
                    this.users.push(element);
                }
            });
            }
       );
        },
        getUsersInActive: function () {
           this.users = [];
          userService.getAll().then(
            userss=>{
            userss.forEach(element => {
                if(element.deleted && element.rol!='admin'){
                    this.users.push(element);
                }
            });
            }
       );
        },
         openNewUser:function (id) {
            this.$router.push('/createuser/'+this.selectProject);
        },
        deleteUser:function (user) {
            user.deleted = true;
            userService.update(user);
            this.getUsersActive();
            this.$router.go();
        },
        showDeleteUser:function (user) {
            this.getUsersInActive();
            this.$router.go();
        },
    }
};
</script>
<style scoped>
.information{
    color: white;
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.second{
     margin-top: 10px;
}
.name{
    display: flex;
    flex-direction: column;
    font-size: 1em;
    justify-content: center;
    margin-left: 10px;
}
.user-container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.users{
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
    width: 100%;
}
.users-item{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 60px;
    width: 300px;
}

.users-item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.users-item-title{
    border-bottom: 1px solid white;
    color: white;
    display: flex;
    flex-direction: row;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    justify-content: space-between;
    padding: 0.3rem;
    text-align: center;
}
.users-item-title-admin{
 background-color: #138A00;
}
.users-body-admin{
 background-color: #138A00;
}
.users-item-title-normal{
 background-color: #333399;
}
.users-body-normal{
 background-color: #333399;
}
.users-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.users-body{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding-bottom: 10px;
    text-align: center;
}
.addPhase{
    background-color: #333399;
    color: white;
    cursor:pointer;
    font-size: 80px;
    height: 100%;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
</style>