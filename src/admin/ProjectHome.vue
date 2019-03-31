<template>
<div class="container-state">
    <router-link :to="{ name: 'manusers', params: { id: selectProject, name:nameProject }}">
        <state :image="'src/img/gestionusuario.png'" :title="'Gestion de usuarios del '+nameProject"></state>
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