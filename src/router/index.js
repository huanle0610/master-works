import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ArticleCardList from '@/components/ArticleCardList'
import ArticlePage from '@/components/ArticlePage'

Vue.use(Router)
const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}
export default new Router({
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'list/:id',
          name: 'articleList',
          component: ArticleCardList
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'article/:id',
          name: 'articlePage',
          component: ArticlePage
        }
      ]
    }
  ]
})
