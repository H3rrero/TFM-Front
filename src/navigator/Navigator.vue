<template>
    <div class="menu" v-if="account.status.loggedIn">
              
   <section>
       <header>
<a href="https://www.linkedin.com/in/sutharmayur" id="logo" target="_blank">Mayur Suthar</a>

<label for="toggle-1" class="toggle-menu"><ul><li></li> <li></li> <li></li></ul></label>
<input type="checkbox" id="toggle-1">

<nav>
<ul class="ul-menu">
<li><router-link to="/state">Estado del proyecto</router-link></li>
<li><router-link to="/kanban">kamban</router-link></li>
<li><router-link to="/kanban">Tareas</router-link></li>
</ul>
</nav>
</header>

</section>
    </div>

</template>

<style>
#logo{float:left; font-size:24px; text-transform:uppercase; color:#002e5b; font-weight:600; padding:20px 0px;}
nav{width:auto; float:right;}
.menu{
    background-color: white;
}
.ul-menu{
        display: flex;
    flex-direction: row;
}
.ul-menu > li {
    font-size: 18px;
    padding: 25px 20px;
    display: inline-block;
    transition: all 0.5s ease 0s;
}
.ul-menu > li:hover{
    font-size: 20px;
    border: 1px;
    border-color: #101112;
    transition: font-size 0.5s ease-out;
}
header > a{
    text-decoration: none;
    color: black;
}
li > a{
        text-decoration: none;
    color: black;
}

label {float:right; padding:8px 0px; display:inline-block; cursor:pointer; }
.toggle-menu ul{display:table; width:25px;}
.toggle-menu ul li{width:100%; height:3px; background-color:#002e5b; margin-bottom:4px;}
.toggle-menu ul li:last-child{margin-bottom:0px;}

input[type=checkbox], label{display:none;}
@media only screen and (max-width: 1440px) {
section{max-width:95%;}
}

@media only screen and (max-width: 980px) {
header{padding:20px 0px;}
input[type=checkbox] {position: absolute; top: -9999px; left: -9999px; background:none;}
input[type=checkbox]:fous{background:none;}
label { padding:8px 0px; display:inline-block; cursor:pointer; }
input[type=checkbox]:checked ~ nav {display:block;}
input[type=checkbox]:checked ~ .navigator {height: 50%;}

nav{display:none; position:absolute; right: 0px; top: 53px}
.ul-menu{
        display: flex;
    flex-direction: column;
    justify-content: right;
}

}

@media only screen and (max-width: 980px) {
.content{width:90%;}
}

@media only screen and (max-width: 568px) {
h1{padding:25px 0px;}
h1 span{display:block;}
}

@media only screen and (max-width: 480px) {
section {max-width: 90%;}
}

@media only screen and (max-width: 360px) {
label{padding:5px 0px;}
#logo{font-size: 20px;}
nav{top:47px;}
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