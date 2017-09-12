<template>
  <div class="container">
    <div class="page-content">
      <md-toolbar v-show="!inArticle">
        <md-button class="md-icon-button nav-trigger" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">{{title}}</h2>
         <!--<md-button class="md-icon-button">-->
             <!--<md-tooltip md-direction="bottom">首页</md-tooltip>-->
             <!--<md-icon>home</md-icon>-->
         <!--</md-button>-->
          <!--<md-button class="md-icon-button">-->
              <!--<md-icon>access_time</md-icon>-->
              <!--<md-tooltip md-direction="bottom">浏览记录</md-tooltip>-->
          <!--</md-button>-->

          <!--<md-button class="md-icon-button">-->
              <!--<md-icon>star</md-icon>-->
              <!--<md-tooltip md-direction="bottom">收藏列表</md-tooltip>-->
          <!--</md-button>-->

          <!--<md-button class="md-icon-button">-->
              <!--<md-icon>comment</md-icon>-->
              <!--<md-tooltip md-direction="bottom">订正</md-tooltip>-->
          <!--</md-button>-->
      </md-toolbar>
        <div class="main-content">
            <router-view></router-view>
        </div>

        <md-button class="md-fab md-fab-bottom-left md-mini md-clean" :class="{fav: $store.state.currentArticle.favorite}" v-show="inArticle" @click="toggleFavorite()">
            <md-icon>star</md-icon>
        </md-button>

        <md-button class="md-fab md-fab-bottom-right md-primary md-mini md-clean" v-show="inArticle" @click="$router.go(-1)">
            <md-icon>apps</md-icon>
        </md-button>
    </div>

    <md-sidenav class="main-sidebar md-left md-fixed" md-theme="purple" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-medium">
        <div class="md-toolbar-container">
          <img src="../assets/logo.png" width="64">
          <h3 class="md-title">印光大师文抄</h3>
        </div>
      </md-toolbar>
       <div class="main-sidebar-links">
           <cat-tree :model="cat" :level="0" @ChangeCat="onChangeCat"></cat-tree>
       </div>
      <md-list v-if="false">
            <md-list-item v-for="item in cat" :key="item.cat_name">
                <md-icon>whatshot</md-icon>
                <span>{{item.cat_name}}</span>

                <md-list-expand v-if="item.children">
                    <md-list v-for="nextItem in item.children" :key="nextItem.cat_name">
                        <md-list-item class="md-inset">
                            <span>{{nextItem.cat_name}}</span>
                        </md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>

          <md-list-item>

              <span>收藏</span>
          </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
import CatTree from '@/components/CatTree'
export default {
  name: 'hello',
  components: {CatTree},
  data () {
    return {
      msg: '印光大师文抄',
      navOpened: false,
      cat: []
    }
  },
  computed: {
    inArticle () {
      return this.$store.state.route.name === 'articlePage'
    },
    title () {
      let tmp = this.msg
      switch (this.$store.state.route.name) {
        case 'articlePage':
          tmp = this.$store.state.currentArticle.article_title
          break
        case 'articleList':
          tmp = this.$store.state.cat.cat_path
          break
      }

      return tmp
    }
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      this.navOpened = true
      console.log('Opened: ' + ref)
    },
    close (ref) {
      this.navOpened = false
      console.log('Closed: ' + ref)
    },
    onChangeCat (catId) {
      console.log(catId)
    },
    toggleFavorite () {
      let vm = this
      console.log(vm.$store.state.currentArticle)
      let articleId = vm.$store.state.currentArticle.article_id
      vm.$axios.get('Works/toggleFavorite/' + articleId).then((response) => {
        vm.$store.state.currentArticle.favorite = response.data
      })
    }
  },
  mounted () {
    let vm = this
    vm.$axios.get('Works/getTree').then((response) => {
      vm.cat = response.data
    })
  },
  watch: {
    '$route' (to, from) {
      if (this.navOpened && to.name === 'articleList') {
        this.toggleLeftSidenav()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container {
    min-height: 100%;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    -ms-flex: 1;
    flex: 1;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
  }
  .container, body {
    display: -ms-flexbox;
    display: flex;
  }
  .md-theme-purple.md-sidenav .md-sidenav-content {
    background-color: #fff;
    color: rgba(0, 0, 0, .87);
  }
  .md-sidenav.md-left .md-sidenav-content {
    left: 0;
    transform: translate3D(-100%,0,0)
  }

  .md-sidenav.md-fixed .md-sidenav-backdrop, .md-sidenav.md-fixed .md-sidenav-content {
    position: fixed;
  }

  .md-sidenav .md-sidenav-content {
    width: 304px;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 7;
    pointer-events: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    transition-property: transform;
    will-change: transform
  }

  .md-sidenav .md-backdrop {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 6;
    pointer-events: none;
    background-color: rgba(0,0,0,.54);
    opacity: 0;
    transition: all .5s cubic-bezier(.35,0,.25,1);
    transition-property: opacity;
    will-change: opacity
  }

  .md-sidenav.md-active .md-sidenav-content {
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);
    pointer-events: auto;
    transform: translate3D(0,0,0)
  }

  .md-sidenav.md-active .md-sidenav-backdrop {
    opacity: 1;
    pointer-events: auto
  }

  .md-sidenav.md-active .md-sidenav-content {
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);
    pointer-events: auto;
    transform: translate3D(0,0,0)
  }
  @media (min-width: 1281px) {
    .container {
        padding-left: 280px
    }

    .main-sidebar.md-sidenav .md-sidenav-content {
      top: 0;
      pointer-events: auto;
      transform: translateZ(0)!important;
      box-shadow: 0 1px 5px rgba(0,0,0,.2),0 2px 2px rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)
    }

    .main-sidebar.md-sidenav .md-backdrop {
      opacity: 0;
      pointer-events: none
    }

    .md-router-enter,.md-router-leave {
      left: 280px
    }
  }

  @media (max-width: 480px) {
    .main-sidebar.md-sidenav .release-version {
      display:block
    }
  }
  .page-content {
    min-height: 100%;
    max-height: 100%;
    -ms-flex: 1;
    flex: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column;
    flex-flow: column
  }
  .main-sidebar.md-sidenav .md-sidenav-content {
    width: 280px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column;
    flex-flow: column;
    overflow: hidden
  }
  .md-title {
    -ms-flex: 1;
    flex: 1
  }

  @media (min-width: 1281px) {
    .md-toolbar .nav-trigger {
      display:none
    }

    .md-toolbar .md-title {
      margin-left: 8px
    }
  }

  .card-holder .md-card {
      width: 100%;
      max-width: 480px;
      margin: 0 4px 16px;
      display: inline-block;
      vertical-align: top;
  }
  .card-holder .md-card .md-subhead {
      max-height: 75px;
      overflow: hidden;
  }
  .main-content {
      padding: 16px;
      -ms-flex: 1;
      flex: 1;
      overflow: auto;
      background-color: #fff;
      transform: translate3D(0,0,0);
      transition: all .4s cubic-bezier(.25,.8,.25,1);
      transition-delay: .2s;
  }
  .md-card .md-card-header .md-card-media {
      display: inline-block;
  }
  .main-sidebar.md-sidenav .main-sidebar-links {
      overflow: auto;
      -ms-flex: 1;
      flex: 1;
  }
  .fav.md-button.md-fab .md-icon {
      color: gold;
  }
    .fav.md-theme-default.md-button:not([disabled]).md-fab.md-clean{
        background-color: #754444;
    }
</style>
