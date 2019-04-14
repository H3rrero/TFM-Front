<template>
<div class="container-state">
    <router-link to="/createuser/-1">
        <div class="options" >
            <p>Crear usuario</p>
        </div>
    </router-link>
    <router-link to="/userslist">
        <div class="options">
            <p>Listar usuarios</p>
        </div>
    </router-link>
    <router-link to="/usersproject">
        <div class="options">
            <p>Asignar usuarios a proyecto</p>
        </div>
    </router-link>
</div>

</template>
<script>
export default {
    methods:{
        
    }
}
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