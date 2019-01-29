<template>
    <div class="container">  
        <div class="item" >
           <div class="text-container">
                <p>Diagrama tareas</p>
            </div>
            <div class="task-container">
                <div class="task">
                    <div class="task-title">
                        <p>Title task</p>
                    </div>
                    <div class="task-body">
                        <div class="assigned">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-user-circle"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>Alejandro Fernández Herrero</p>
                            </div>
                        </div>
                        <div class="time">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-calendar-alt"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>27-Dec to 09-Jan</p>
                            </div>
                             
                        </div>
                    </div>
                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
            </div>
        </div>
        <div class="item">
           <div class="text-container">
                <p>Diagrama tareas</p>
            </div>
            <div class="task-container">
                <div class="task">
                    <div class="task-title">
                        <p>Title task</p>
                    </div>
                    <div class="task-body">
                        <div class="assigned">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-user-circle"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>Alejandro Fernández Herrero</p>
                            </div>
                        </div>
                        <div class="time">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-calendar-alt"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>27-Dec to 09-Jan</p>
                            </div>
                             
                        </div>
                    </div>
                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
            </div>
        </div>
        <div class="item">
           <div class="text-container">
                <p>Diagrama tareas</p>
            </div>
            <div class="task-container">
                 <div class="task">
                    <div class="task-title">
                        <p>Title task</p>
                    </div>
                    <div class="task-body">
                        <div class="assigned">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-user-circle"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>Alejandro Fernández Herrero</p>
                            </div>
                        </div>
                        <div class="time">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-calendar-alt"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>27-Dec to 09-Jan</p>
                            </div>
                             
                        </div>
                    </div>
                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">
                </div>
            </div>
        </div>
        <div class="item">
            <div class="text-container">
                <p>Diagrama tareas</p>
            </div>
            <div class="task-container">
                 <div class="task">
                    <div class="task-title">
                        <p>Title task</p>
                    </div>
                    <div class="task-body">
                        <div class="assigned">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-user-circle"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>Alejandro Fernández Herrero</p>
                            </div>
                        </div>
                        <div class="time">
                            <div class="icon">
                                <span style="font-size: 2em;">
                                    <i class="far fa-calendar-alt"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>27-Dec to 09-Jan</p>
                            </div>
                             
                        </div>
                    </div>
                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
                <div class="task">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};
</script>
<style scoped>
.container{
     display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    height: 100%;
    margin-bottom: 20px;
}
.item{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    background-color: #6B6FCE;
    color: white;
    flex-grow: 1;
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
.task{
    height: 200px;
    width: 90%;
    margin: 0 auto;
    background-color: crimson;
    margin-top: 8px;
}
.task-title{
    padding: 2%;
    border-bottom: 1px solid black;
}
.task-title > p{
    text-align: center;
}
.task-body{
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: center;
}
.assigned{
    display: flex;
    flex-direction: row;
}
.time{
    margin-top: 30px;
    display: flex;
    flex-direction: row;

}
.name{
    margin-left: 10px;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
</style>