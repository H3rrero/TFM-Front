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
    display: grid;
    grid-template-areas:
       'header '
        'content '
        ' footer ';
    grid-template-rows: 0.5fr 8fr 1fr;
    grid-gap: 10px;
    height: 100%;
    background-color: #eee;
}
.content{
    grid-area: content;
    height: 100%;
}
.navigator{
    grid-area: header;
   
}
:root {
  --admin-color: black; 
  --man-color: #333399;
}
.admin-background{
  background-color: var(--admin-color);
}
.user-background{
  background-color: var(--man-color);
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