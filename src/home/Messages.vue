<template>
    <div class="container-message-data" >  
        <div class="form-message-data">
            <div class="item-message-data">
                <div class="message">
                    <p class="title-message">{{message.title}}</p>
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
    display: flex;
    height: 100%;
    flex-direction: column;
    margin:0;
    overflow: auto;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.title-message-data{
    border-bottom: 1px solid #6B6FCE;
    color: #333399;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.form-message-data{
    display: flex;
    flex-direction: column;
}
.item-message-data{  
    margin-top: 10px;
    margin: 0 auto;
    width: 95%;
}
.message{
    border: 2px solid #333399;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 10px 0;
    padding: 5px;
    background: white;
}
.message > p{
    white-space: pre-line;
}
.title-message{
    border-bottom: 1px solid #6B6FCE;
    color: #333399;
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