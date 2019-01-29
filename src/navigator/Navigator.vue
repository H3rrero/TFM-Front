<template>
    <div class="menu" v-if="account.status.loggedIn">
                <div class="normal">
                    <div class="logo">
                        <img alt="logo" src="src/img/logo.png" 
                        data-retina="img/logo.png" width="67" height="70">
                    </div>
                    <div class="main-menu">
                        <ul class="list-menu">
                            <li><router-link to="/state">Estado del proyecto</router-link></li>
                            <li><router-link to="/kanban">kamban</router-link></li>
                            <li><router-link to="/kanban">Tareas</router-link></li>
                        </ul>
                    </div>
                </div>
    </div>
</template>

<style>
.menu{
   
    grid-area: header;
    height: 14vh;
    width: 86%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.menu .normal{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.logo{
    margin-right: 60px;
}
.list-menu{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.list-menu > li{
    padding-right: 20px;
}
.list-menu > li:hover{
    font-size: 20px;
    border: 1px;
    border-color: #101112;
    transition: font-size 0.5s ease-out;
}
li > a{
        text-decoration: none;
    color: black;
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