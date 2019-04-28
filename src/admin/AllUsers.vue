<template>
    <div v-if="haveData">
       <div class="table-container" role="table" aria-label="Destinations">
            <div class="flex-table header" role="rowgroup">
                <div class="flex-row first" role="columnheader">Nombre</div>
                <div class="flex-row" role="columnheader">Usuario</div>
                <div class="flex-row" role="columnheader">Projectos</div>
                <div class="flex-row" role="columnheader">Rol</div>
            </div>
            <div class="flex-table row" role="rowgroup" v-for="user in users" :key="user.id">
                <div class="flex-row rowspan first">{{user.firstname + " "+ user.lastname}}</div>
                <div class="flex-row rowspan ">{{user.username}}</div>
                <div class="column">
                    <div class="flex-row" v-for="project in user.projects" :key="project.id">
                        <div class="flex-cell" role="cell">{{project.name}}</div>
                        <div class="flex-cell" role="cell">{{user.rol}}</div>
                    </div>
                    <div class="flex-row" >
                        <div class="flex-cell" role="cell">Proyecto de prueba 2</div>
                        <div class="flex-cell" role="cell">{{user.rol}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import { projectService } from '../_services/project.service';
 import { userService } from '../_services/user.service';
export default {
    data(){
       return{ 
        users:[],
        haveData:false,
       }
    },
    created () {
        this.getUsers();
    },
    methods: {
      getUsers: function () {
          userService.getAll().then(
            userss=>{
                userss.forEach(user => {
                    if(user.rol != 'admin'){
                         projectService.getAll().then(
                            projectss=>{
                                
                                let projects=[];
                                projectss.forEach(element => {
                                    if(element.id == user.projectId){
                                        projects.push(element);
                                        user.projects = projects;
                                        this.haveData = true;
                                        this.users.push(user);
                                    }
                                });
                                
                            }
                        );
                        
                    }
                });
            }
       );
        },getProject: function (id) {
            
           projectService.getAll().then(
            projectss=>{
                let projects=[];
                projectss.forEach(element => {
                    if(element.id == id){
                        projects.push(element);
                    }
                });
                console.log(projects);
                return projects;
            }
       );
        },
    }
};
</script>
<style scoped>
div {
  box-sizing: border-box;
}
.table-container {
  display: block;
  margin: 2em auto;
  width: 90%;
}
.flag-icon {
  margin-right: 0.1em;
}
.flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid 1px #d9d9d9;
  transition: 0.5s;
}
.flex-table:first-of-type {
  border-top: solid 1px #333399;
  border-left: solid 1px #333399;
}
.flex-table:first-of-type .flex-row {
  background: #333399;
  color: white;
  border-color: #333399;
}
.flex-table.row:nth-child(odd) .flex-row {
  background: #f4f2f1;
}
.flex-table:hover {
  background: #f5f5f5;
  transition: 500ms;
}
.flex-row {
  width: calc(100% / 4);
  text-align: center;
  padding: 0.5em 0.5em;
  border-right: solid 1px #d9d9d9;
  border-bottom: solid 1px #d9d9d9;
}
.rowspan {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
}
.column {
  display: flex;
  flex-flow: column wrap;
  width: 50%;
  padding: 0;
}
.column .flex-row {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0;
  border: 0;
  border-bottom: solid 1px #d9d9d9;
}
.column .flex-row:hover {
  background: #f5f5f5;
  transition: 500ms;
}
.flex-cell {
  width: calc(100% / 2);
  text-align: center;
  padding: 0.5em 0.5em;
  border-right: solid 1px #d9d9d9;
}
@media all and (max-width: 767px) {
  .flex-row {
    width: calc(100% / 3);
  }
  .flex-row.first {
    width: 100%;
  }
  .column {
    width: 100%;
  }
}
@media all and (max-width: 430px) {
  .flex-table .flex-row {
    border-bottom: 0;
  }
  .flex-table .flex-row:last-of-type {
    border-bottom: solid 1px #d9d9d9;
  }
  .header .flex-row {
    border-bottom: solid 1px;
  }
  .flex-row {
    width: 100%;
  }
  .flex-row.first {
    width: 100%;
    border-bottom: solid 1px #d9d9d9;
  }
  .column {
    width: 100%;
  }
  .column .flex-row {
    border-bottom: solid 1px #d9d9d9;
  }
  .flex-cell {
    width: 100%;
  }
}

</style>