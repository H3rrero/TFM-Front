<template>
<div class="container-state">
    <router-link to="/gantt">
        <div class="item first" >
            <div class="img-container">
                <img src="src/img/gantt.png" alt="diagrama de gantt">
            </div>
            <div class="text-container">
                <p>Diagrama de Gantt</p>
            </div>
        </div>
    </router-link>
    <router-link to="/gantt">
        <div class="item">
            <div class="img-container">
                <img src="src/img/gantt.png" alt="diagrama de gantt">
            </div>
            <div class="text-container">
                <p>Diagrama valor ganado</p>
            </div>
        </div>
    </router-link>
    <router-link to="/gantt">
        <div class="item">
            <div class="img-container">
                <img src="src/img/gantt.png" alt="diagrama de gantt">
            </div>
            <div class="text-container">
                <p>Diagrama tareas</p>
            </div>
        </div>
    </router-link>
    <router-link to="/gantt">
        <div class="item">
            <div class="img-container">
                <img src="src/img/gantt.png" alt="diagrama de gantt">
            </div>
            <div class="text-container">
                <p>Diagrama economico</p>
            </div>
        </div>
    </router-link>
</div>

</template>
<script>
export default {
 
    methods: {
      
    }

}
</script>

<style scoped>
.container-state{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
}
.item{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    height: 330px;
    margin-left: 20px;
    margin-bottom: 20px;
    width: 450px;
}
.item:hover{
    color:#58BB45;
    transform: scale(1.05,1.05);
    transition:  0.3s ease-out;
}
.img-container{
    padding: 4%;
    padding-bottom: 0;
}

.img-container > img{
    height: 100%;
    margin-bottom: 10px;
    width: 100%;
}
.text-container{
    border-top: 1px solid #EDEDED;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
    text-transform: none;
    vertical-align: middle;
}
a{
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
    .item{
        background-color: white;
        color: #6B6FCE;
        display: flex;
        flex-direction: column;
        height: auto;
        margin-left: 0px;
        margin-bottom: 20px;
        width: 100%;
    }
    .first{
        margin-top: 50px;
    }
}
</style>