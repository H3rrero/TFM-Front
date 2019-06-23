<template>
<div>
    <app-breadcrumbs class="admin-background"></app-breadcrumbs>
<div class="container-state">
    <router-link to="/projects">
        <state :rol="'admin'" :image="'src/img/projects.PNG'" :title="'Gestion de proyectos'"></state>
    </router-link>
    <router-link to="/usersproject">
        <state :rol="'admin'" :image="'src/img/users.PNG'" :title="'Gestion de usuarios'"></state>
    </router-link> 
</div>
</div>
</template>
<style scoped>
.container-state{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
}
.container-state a{
    text-decoration: none;
}
@media only screen and (max-width: 980px) {
    .container-state{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        margin: 0 auto;
        width: 100%;
    }
}
</style>