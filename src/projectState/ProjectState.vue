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
    height: 330px;
    width: 450px;
    margin-left: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: #6B6FCE;
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
    width: 100%;
    margin-bottom: 10px;
}
.text-container{
    border-top: 1px solid #EDEDED;
    text-align: center;
    text-transform: none;
    font-weight: 700;
    vertical-align: middle;
    line-height: 50px;
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
        width: 100%;
        margin: 0 auto;
    }
    .item{
        height: auto;
        width: 100%;
        margin-left: 0px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        background-color: white;
        color: #6B6FCE;
    }
    .first{
        margin-top: 50px;
    }
}
</style>