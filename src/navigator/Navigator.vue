<template>
    <div class="menu" v-if="account.status.loggedIn">  
        <section>
            <header>
                <a  class="logo" target="_blank">Organizador</a>
                <label for="toggle-1" class="toggle-menu"><ul><li></li> <li></li> <li></li></ul></label>
                <input type="checkbox" id="toggle-1">
                <nav>
                    <ul class="ul-menu">
                        <li title="DIferentes diagramas del estado del proyecto">
                            <router-link to="/state">Estado del proyecto</router-link>
                        </li>
                        <li title="ver kamban actual del proyecto">
                            <router-link to="/kanban/-1">kamban</router-link>
                        </li>
                        <li title="asignar o reasignar las tareas">
                            <router-link to="/tasks">Tareas</router-link>
                        </li>
                        <li title=" añadir tareas a un sprint">
                            <router-link to="/sprints">Sprints</router-link>
                        </li>
                    </ul>
                </nav>
            </header>
        </section>
    </div>
</template>

<style>
.logo{
    color: #333399; 
    font-size:24px; 
    font-weight:600; 
    float:left;
    margin-left: 30px;
    padding:20px 0px;
    text-transform:uppercase; 
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
    
li > a{
    color: #333399;
    text-decoration: none;
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
   computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
};
</script>