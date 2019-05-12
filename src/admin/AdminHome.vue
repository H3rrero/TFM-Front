<template>
<div>
    <app-breadcrumbs></app-breadcrumbs>
<div class="container-state">
    <router-link to="/projects">
        <state :image="'src/img/gestionusuario.png'" :title="'Gestion de proyectos'"></state>
    </router-link>
    <router-link to="/usersproject">
        <state :image="'src/img/gestionusuario.png'" :title="'Gestion de usuarios'"></state>
    </router-link> 
</div>
</div>
</template>
<style scoped>
.container-state{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
}
.container-state a{
    text-decoration: none;
}
@media only screen and (max-width: 980px) {
    .container-state{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        margin: 0 auto;
        width: 100%;
    }
}
</style>