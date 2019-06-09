<template>
     <div class="container">
        <navigator v-if="account.status.loggedIn && !account.deleted.deleted" class="navigator"></navigator>
        <router-view class="content"></router-view>
    </div>
       
</template>
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
 
  background: transparent;
  border: 0;
  font-family: 'Titillium Web', sans-serif;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
}
.vdatetime >input{width: 100%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 2px solid  var(--admin-color);
  border-radius: 5px;
  height: 35px;
  margin: 10px 0;
  padding: 0 15px;
  }
html{
    background-color: #eee;
    height: 100%;
}
textarea{
    resize: none;
}
.highcharts-axis-labels > text >tspan{
    color:#E0E0E3;
    fill: #E0E0E3;
}
.highcharts-axis-labels > text{
    color:#E0E0E3 !important; 
    fill: #E0E0E3 !important;
}
body {
  background-color: #fafafa;
  line-height: 1;
  height: 100%;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
:focus {
  outline: 0;
}
 
ins {
  text-decoration: none;
}
del {
  text-decoration: line-through;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
.container{
    display: -ms-grid;
    display: grid;
        grid-template-areas:
       'header '
        'content '
        ' footer ';
    -ms-grid-rows: 0.5fr 10px 8fr 10px 1fr;
    grid-template-rows: 0.5fr 8fr 1fr;
    grid-gap: 10px;
    height: 100%;
    background-color: #eee;
}
.content{
    -ms-grid-row: 3;
    -ms-grid-column: 1;
    grid-area: content;
    height: 100%;
}
.navigator{
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    grid-area: header;
   
}
:root {
  --admin-color: #003666; 
  --man-color: #333399;
  --user-color: #371777;
}
.admin-background{
  background-color: var(--admin-color);
}
.man-background{
  background-color: var(--man-color);
}
.user-background{
  background-color: var(--user-color);
}
.admin-color{
    color: var(--admin-color);
}
.man-color{
    color: var(--man-color);
}
.user-color{
    color: var(--user-color);
}
.man-border{
    border: 2px solid var(--man-color);
}
.user-border{
    border: 2px solid var(--user-color);
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
     data(){
       return{ 
       removed: false,
      
       }
    },
    computed: {
        ...mapState({
             account: state => state.account,
        })
    },
    methods: {
      ...mapActions('account', ['login', 'logout']),
    } 
};
</script>