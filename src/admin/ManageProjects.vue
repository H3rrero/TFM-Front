<template>
<div class="container-state">
    <router-link :to="{ name: 'manusers', params: { id: selectProject, name:nameProject }}">
        <div class="options">
            <p>Añadir/Eliminar usuarios al proyecto</p>
        </div>
    </router-link>
    <router-link :to="{ name: 'addprogrammer', params: { id: selectProject}}">
        <div class="options">
            <p>Asignar programador al proyecto</p>
        </div>
    </router-link>
    <router-link :to="{ name: 'addmanager', params: { id: selectProject}}">
        <div class="options">
            <p>Asignar jefe al proyecto</p>
        </div>
    </router-link>
</div>

</template>
<script>
 import { userService } from '../_services/user.service';
export default {
    data(){ 
       return{  
        selectProject:this.$route.params.id,
        nameProject:this.$route.params.name,
       }
    },
};
</script>
<style scoped>
.container-state{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    width: 35%;
}
.container-state a{
    text-decoration: none;
}
.options{
    background-color: white;
    border-radius: 1rem;
    color: #333399;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 70%;
    padding: 10px;
}
.options:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
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