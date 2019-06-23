<template>
    <div v-if="haveData">
       <app-breadcrumbs class="admin-background"></app-breadcrumbs>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import { userProjectService } from '../_services/userProject.service';
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
                         userProjectService.getProjectByUser(user.id).then(
                            projectss=>{
                                
                                let projects=[];
                                projectss.forEach(element => {
                                        projects.push(element);
                                        user.projects = projects;
                                        this.haveData = true;
                                        this.users.push(user);
                                    
                                });
                                
                            }
                        );
                        
                    }
                });
            }
       );
        },
    }
};
</script>
<style scoped>
div {
  -webkit-box-sizing: border-box;
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
  border-left: solid 1px #d9d9d9;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}
.flex-table:first-of-type {
  border-top: solid 1px var(--admin-color);
  border-left: solid 1px var(--admin-color);
}
.flex-table:first-of-type .flex-row {
  background: var(--admin-color);
  border-color: var(--admin-color);
  color: white;
}
.flex-table.row:nth-child(odd) .flex-row {
  background: #f4f2f1;
}
.flex-table:hover {
  background: #f5f5f5;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
  transition: 500ms;
}
.flex-row {
  border-bottom: solid 1px #d9d9d9;
  border-right: solid 1px #d9d9d9;
  padding: 0.5em 0.5em;
  text-align: center;
  width: calc(100% / 4);
}
.rowspan {
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.column {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-flow: column wrap;
          flex-flow: column wrap;
  padding: 0;
  width: 50%;
}
.column .flex-row {
  border: 0;
  border-bottom: solid 1px #d9d9d9;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  padding: 0;
  width: 100%;
}
.column .flex-row:hover {
  background: #f5f5f5;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
  transition: 500ms;
}
.flex-cell {
  border-right: solid 1px #d9d9d9;
  padding: 0.5em 0.5em;
  text-align: center;
  width: calc(100% / 2);
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
    border-bottom: solid 1px #d9d9d9;
    width: 100%;
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