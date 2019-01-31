<template>
    <div class="container" >  
        
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ 
       haveData: false
       }
    },
};
</script>
<style scoped>
.container{
   height: 100%;
   width: 500px;
   background-color: black;
   overflow: hidden;
}

</style>