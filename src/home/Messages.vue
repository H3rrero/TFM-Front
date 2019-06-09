<template>
    <div class="container-message-data" >  
        <div class="form-message-data">
            <div class="item-message-data">
                <div class="message" v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                    <p class="title-message" v-bind:class="{ 'user-color': user.rol=='user',' man-color': user.rol=='manager' }">{{message.title}}</p>
                    <p>{{message.body}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
 import { stateService } from '../_services/states.service';
export default {
    props: {
   message: Object
  },
    data(){
       return{ 
       haveData: false,
       }
    },
    created () {
      
    },
    methods:{
    }
};
</script>
<style scoped>
.container-message-data{
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin:0;
    overflow: auto;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.form-message-data{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
}
.item-message-data{  
    margin-top: 10px;
    margin: 0 auto;
    width: 95%;
}
.message{
    background: white;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    margin: 10px 0;
    padding: 5px;
}
.message > p{
    white-space: pre-line;
}
.title-message{
    border-bottom: 1px solid #6B6FCE;
    line-height: 23px;
    text-align: center;
    font-weight: 400;
    vertical-align: middle;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
</style>