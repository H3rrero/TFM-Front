<template>
    <div class="menu" >  
        <section>
            <header  v-bind:class="{ 'header-admin': user.rol == 'admin'}">
                <span v-on:click="back()" v-if="user.rol=='admin'" class="logo back" target="_blank"><i class="fas fa-arrow-circle-left"></i></span>
                <span v-if="user.rol!='admin'" class="logo" target="_blank">{{user.firstname+ " "+user.lastname}}</span>
                <span v-if="user.rol=='admin'" class="admin-console" target="_blank">Consola de administración</span>
                <label for="toggle-1" class="toggle-menu"><ul><li></li> <li></li> <li></li></ul></label>
                <input type="checkbox" id="toggle-1">
                <nav>
                    <ul class="ul-menu">
                        <li v-if="user.rol!='admin' && navOn" title="Diferentes diagramas del estado del proyecto" v-on:click="currentPage('states')" v-bind:class="{ 'active': this.states }">
                            <router-link to="/state">Estado del proyecto</router-link>
                        </li>
                        <li v-if="user.rol!='admin'  && navOn" title=" añadir tareas a un sprint" v-on:click="currentPage('phases')" v-bind:class="{ 'active': this.phases }">
                            <router-link to="/sprints">Gestionar fases</router-link>
                        </li>
                         <li v-if="user.rol!='admin'  && navOn" title="asignar o reasignar las tareas" v-on:click="currentPage('tasks')" v-bind:class="{ 'active': this.tasks }">
                            <router-link to="/tasks">Asignar tareas</router-link>
                        </li>
                        <li v-if="user.rol!='admin'  && navOn" title="ver kamban actual del proyecto" v-on:click="currentPage('kamban')" v-bind:class="{ 'active': this.kamban }">
                            <router-link to="/kanban/-1">Kamban</router-link>
                        </li>

                        <li>

                            <span v-on:click="endSession()">
                               <i class="fas fa-sign-out-alt"></i>
                            </span>
                        </li>
                    </ul>
                </nav>
            </header>
        </section>
    </div>
</template>

<style>
.admin-console{
    color: #333399; 
    font-size:24px; 
    font-weight:600; 
}
.header-admin{
    display: flex;
}
.header-admin > .admin-console{
    margin: 0 auto;
    padding:20px 0px;
}
.logo{
    color: #333399; 
    font-size:24px; 
    font-weight:600; 
    float:left;
    margin-left: 30px;
    padding:20px 0px;
    text-transform:uppercase; 
    }
.back{
    cursor: pointer;
}
nav{
    float:right;
    width:auto;
 }
.menu{
    background-color: white;
}
.ul-menu{
    display: flex;
    flex-direction: row;
}
.ul-menu > li {
    display: inline-block;
    font-size: 18px;
    padding: 25px 20px;
    transition: all 0.5s ease 0s;
}

header > a{
    color: #333399;
    text-decoration: none;
}
.active{
    background-color: #333399;
}
.active > a{
    color: white;
    
}
li > a{
    color: #333399;
    text-decoration: none;
}
li > span{
    cursor: pointer;
    font-size: 20px;
    margin-left: 7px;
}
li > a:hover{
    color:  #3399FF;
}

label {
    cursor:pointer; 
    display:inline-block; 
    float:right; 
    padding:8px 0px; 
}
.toggle-menu ul{
    display:table; 
    width:25px;
}
.toggle-menu ul li{
    background-color:#002e5b; 
    height:3px; 
    margin-bottom:4px;
    width:100%; 
}
.toggle-menu ul li:last-child{
    margin-bottom:0px;
}
input[type=checkbox],  label{display:none;}

@media only screen and (max-width: 1440px) {
    section{
        max-width:95%;
    }
}

@media only screen and (max-width: 980px) {
    header{
        padding:20px 0px;
        }
    input[type=checkbox] {
        background:none;
        left: -9999px; 
        position: absolute; 
        top: -9999px; 
    }
    input[type=checkbox]:fous{
        background:none;
    }
    label { 
        cursor:pointer; 
        display:inline-block; 
        padding:8px 0px; 
    }
    input[type=checkbox]:checked ~ nav {
        display:block;
    }
    li > a{
        color:white;
    }
    nav{
        background-color: #333399;
        color: white; 
        display:none; 
        position:absolute; 
        right: 0px; 
        top: 53px; 
        z-index: 80;
    }
    .ul-menu{
        display: flex;
        flex-direction: column;
        justify-content: right;
    }

}



@media only screen and (max-width: 568px) {
    h1{
        padding:25px 0px;
    }
    h1 span{
        display:block;
    }
}

@media only screen and (max-width: 480px) {
    section {
        max-width: 90%;
        }
}

@media only screen and (max-width: 360px) {
    label{
        padding:5px 0px;
    }
    .logo{
        font-size: 20px;
    }
    nav{
        top:47px;
    }
}
</style>


<script>
import { mapState, mapActions } from 'vuex'

export default {
     name: "navigator"
    ,
    data(){
       return{ 
       states: false,
       phases:false,
       tasks:false,
       kamban:true,
       checkUser:true,
       navOn:false,
       user:{}
       }
    },
   computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    mounted(){
        this.$root.$on('eventing', data => {
            console.log("eventing")
           this.navOn=true;
    });
    },
    created(){
    this.getUser();
    console.log("this.$router.path")
    console.log(this.$router.history.current.path.includes("userhome"));
    if(this.$router.history.current.path.includes("userhome")){
        this.navOn = false;
    }else{
        this.navOn=true;
    }

    },
    methods:{
        ...mapActions('account', ['login', 'logout']),
        endSession: function () {
          this.logout();  
          this.navOn=false;
          this.$router.push('/login');
        },
        getUser:function () {
          this.user =  JSON.parse(localStorage.getItem('user'))
        },
        back:function () {
          this.$router.go(-1);  
        },
        currentPage: function (page) {
           
          if(page == 'states'){
              this.states = true;
              this.phases = false;
              this.tasks = false;
              this.kamban = false;
          }
          else if(page == 'phases'){
               this.states = false;
              this.phases = true;
              this.tasks = false;
              this.kamban = false;
          }
          else if(page == 'tasks'){
               this.states = false;
              this.phases = false;
              this.tasks = true;
              this.kamban = false;
          }
          else if(page == 'kamban'){
               this.states = false;
              this.phases = false;
              this.tasks = false;
              this.kamban = true;
          }
       
        },
    }
};
</script>