<template>
<div class="container-state">
    <app-breadcrumbs></app-breadcrumbs>
    <router-link to="/gantt">
        <state :image="'src/img/gantt.png'" :title="'Diagrama de Gantt'"></state>
    </router-link>
    <router-link to="/burndown">
        <state :image="'src/img/vg.png'" :title="'Diagrama valor ganado'"></state>
    </router-link>
    <router-link to="/burndownSprint/0">
        <state :image="'src/img/vg.png'" :title="'Diagrama valor ganado por sprint'"></state>
    </router-link>
    <router-link to="/gantt">
        <state :image="'src/img/gantt.png'" :title="'Diagrama económico'"></state>
    </router-link>
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