<template>
<div class="container">
    <router-link to="/gantt">
<div class="item" >
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
.container{
     display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 70%;
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
}
.img-container{
    padding: 4%;
    padding-bottom: 0;
}
.img-container:hover{
    padding: 0%;
    transition:  0.5s ease-out;
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
</style>