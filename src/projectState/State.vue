<template>
    <div class="item " v-bind:class="{ 'admin-color': rol == 'admin','man-color': rol == 'manager'}">
            <div class="img-container">
                <img :src="image" :alt="title">
            </div>
            <div class="text-container">
                <p>{{title}}</p>
            </div>
        </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
export default {
    props: {
        image:"",
        title:"",
        rol:"",
  },
};
</script>
<style scoped>
.admin-color{
    color: var(--admin-color);
}
.man-color{
    color: var(--man-color);
}
.item{
    background-color: white;
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