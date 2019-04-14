<template>
    <div>
        <div class="user-container">
            <div class="mask" v-if="show" v-on:click="hideMenu();"></div>
            <div class="users">
                <div  class="user" v-for="user in users" :key="user.id">
                      <div class="user-title" v-bind:class="{ 'manager': user.rol == 'manager' }" v-on:click="selectUser(user)">
                            <p>{{user.firstname + " "+ user.lastname}}</p>
                        </div>
                </div>
            </div>
            <transition name="slide-fade">
                <userdetail v-if="show" :myUser="userSelected"></userdetail>  
            </transition> 
        </div>
    </div>
</template>

<script>

 import { userService } from '../_services/user.service';
export default {
    data(){
       return{ 
        users:[],
        userSelected:{},
        show:false,
       }
    },
    created () {
        this.getUsers();
    },
    methods: {
      getUsers: function () {
          userService.getAll().then(
            userss=>{
             this.users = userss;
            }
       );
        },
        selectUser:function (user) {
            this.userSelected = user;
            this.show = true;
        },
         hideMenu: function () {
            if(this.show)
            this.show = false;
        },
    }
};
</script>
<style scoped>
.user-container{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.users{
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: 10px;
    margin-left: 10px;
    padding: 1rem;
}
.manager{
     background-color: #138A00;
    border: 3px solid #138A00;
    border-radius: 1rem;
}
.user{
    background-color: #333399;
    border-radius: 1rem;
    color: #333399;
    cursor: pointer;
    margin-top: 8px;
    margin-right: 10px;
    text-align: center;
    width: 24%;
}

.user-title{
    padding: 2%;
    color: white;
}
.users-title{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
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
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
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