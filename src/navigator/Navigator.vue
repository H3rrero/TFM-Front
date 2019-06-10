<template>
    <div class="menu" >  
        <section>
            <header  v-bind:class="{ 'header-admin': user.rol == 'admin'}">
                <span v-on:click="back()" v-if="user.rol=='admin'" class="logo back admin" target="_blank"><i class="fas fa-arrow-circle-left"></i></span>
                <span v-if="user.rol!='admin'" class="logo"  v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}" target="_blank" v-on:click="profile()">{{user.firstname+ " "+user.lastname}}</span>
                <span v-if="user.rol=='admin'" class="admin-console  admin-color" target="_blank">Consola de administración</span>
                <label for="toggle-1" class="toggle-menu"><ul><li></li> <li></li> <li></li></ul></label>
                <input type="checkbox" id="toggle-1">
                <nav>
                    <ul class="ul-menu">
                        <li v-if="user.rol!='admin' && navOn" title="Diferentes diagramas del estado del proyecto" v-on:click="currentPage('states')" v-bind:class="{ 'active': this.states,'user-background': (user.rol=='user' && this.states),'man-background': (user.rol=='manager' && this.states)}">
                           <p v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}"> Estado del proyecto</p>
                        </li>
                        <li v-if="user.rol=='manager'  && navOn" title=" añadir tareas a un sprint" v-on:click="currentPage('phases')" v-bind:class="{ 'active': this.phases,'user-background': (user.rol=='user' && this.phases),'man-background': (user.rol=='manager' && this.phases)}">
                           <p  v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}"> Gestionar fases</p>
                        </li>
                         <li v-if="user.rol!='admin'  && navOn" title="asignar o reasignar las tareas" v-on:click="currentPage('tasks')" v-bind:class="{ 'active': this.tasks,'user-background': (user.rol=='user' && this.tasks),'man-background': (user.rol=='manager' && this.tasks)}">
                           <p  v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}">Asignar tareas</p> 
                        </li>
                        <li v-if="user.rol!='admin'  && navOn" title="ver kamban actual del proyecto" v-on:click="currentPage('kamban')" v-bind:class="{ 'active': this.kamban,'user-background': (user.rol=='user' && this.kamban),'man-background': (user.rol=='manager' && this.kamban) }">
                          <p  v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}">Kamban</p> 
                        </li>
                        <li v-if="user.rol=='manager'  && navOn" title="Habilitar o deshabilitar usuarios" v-on:click="currentPage('usuarios')" v-bind:class="{ 'active': this.usuarios,'user-background': (user.rol=='user' && this.usuarios),'man-background': (user.rol=='manager' && this.usuarios)}">
                          <p  v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}">Usuarios</p> 
                        </li>
                        <li v-if="user.rol=='manager'  && navOn" title="Datos del proyecto" v-on:click="currentPage('project')" v-bind:class="{ 'active': this.project,'user-background': (user.rol=='user' && this.project),'man-background': (user.rol=='manager' && this.project)}">
                          <p  v-bind:class="{'user-color': user.rol=='user','man-color': user.rol=='manager'}">Proyecto</p> 
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
    font-size:24px; 
    font-weight:600; 
}
.header-admin{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.header-admin > .admin-console{
    margin: 0 auto;
    padding:20px 0px;
}
.logo{
    cursor: pointer;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
}
.ul-menu > li {
    display: inline-block;
    font-size: 18px;
    padding: 25px 20px;
    -webkit-transition: all 0.5s ease 0s;
    -o-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;
}

header > p{
    text-decoration: none;
}
.active > p{
    color: white;
    
}
li > p{
    color: var(--man-color);
    text-decoration: none;
    cursor: pointer;
}
li > span{
    cursor: pointer;
    font-size: 20px;
    margin-left: 7px;
}
li > p:hover{
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
    li > p{
        color:white;
    }
    nav{
        background-color: white;
        color: var(--man-color); 
        display:none; 
        position:absolute; 
        right: 0px; 
        top: 53px; 
        z-index: 80;
    }
    .ul-menu{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: right;
            -ms-flex-pack: right;
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
  import { userProjectService } from '../_services/userProject.service';
export default {
     name: "navigator"
    ,
    data(){
       return{ 
       states: false,
       phases:false,
       tasks:false,
       kamban:true,
       usuarios:false,
       project:false,
       checkUser:true,
       navOn:false,
       projectData:"",
       selectProject:{},
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
            this.projectData = data;
           this.navOn=true;
    });
    },
    created(){
    this.getUser();
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
            if(JSON.parse(localStorage.getItem('user')) != null)
                this.user =  JSON.parse(localStorage.getItem('user'));
        },
        back:function () {
          this.$router.go(-1);  
        },
        profile:function () {
         this.$router.push('/profile');
        },
        currentPage: function (page) {
           if(this.projectData.id == undefined){
            userProjectService.getProjectByUser(this.user.id).then(projects =>{
                projects.forEach(element => {
                   if(element.id == "proyecto prueba") 
                    this.currentPage2(page, element.id,element.name);
                });
                
            })
        }else{
            this.currentPage2(page, this.projectData.id,this.projectData.name);
        }
         
       
        },
        currentPage2: function (page,project,name) {
             if(page == 'states'){
              this.states = true;
              this.phases = false;
              this.tasks = false;
              this.kamban = false;
              this.usuarios = false;
              this.project = false;
              this.$router.push(`/state/${project}`);
          }
          else if(page == 'phases'){
               this.states = false;
              this.phases = true;
              this.tasks = false;
              this.kamban = false;
              this.usuarios = false;
              this.project = false;
               this.$router.push(`/sprints/${project}`);
          }
          else if(page == 'tasks'){
               this.states = false;
              this.phases = false;
              this.tasks = true;
              this.kamban = false;
              this.usuarios = false;
              this.project = false;
               this.$router.push(`/tasks/${project}`);
          }
          else if(page == 'kamban'){
               this.states = false;
              this.phases = false;
              this.tasks = false;
              this.kamban = true;
              this.usuarios = false;
              this.project = false;
               this.$router.push(`/kanban/${project}`);
          }
          else if(page == 'usuarios'){
               this.states = false;
              this.phases = false;
              this.tasks = false;
              this.kamban = false;
              this.usuarios = true;
            this.project = false;
            this.$router.push(`/disableusers/${project}/${name}`);
          }
          else if(page == 'project'){
               this.states = false;
              this.phases = false;
              this.tasks = false;
              this.kamban = false;
              this.usuarios = false;
              this.project = true;
               this.$router.push(`/projectdata/${project}`);
          }
        }
    }
};
</script>