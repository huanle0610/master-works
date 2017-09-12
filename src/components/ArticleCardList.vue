<template>
    <div class="card-holder">
        <md-card md-theme="purple" v-for="article in $store.state.articleList" :key="article.article_id" md-with-hover>
            <md-card-header>

                <md-card-header-text>
                    <div class="md-title" @click="showDetail(article)">
                        <md-card-media class="title_image">
                            <img src="http://www.eatlogos.com/art_logos/png/vector_art_rose_lotus_logo.png"
                                 alt="lotus"
                                 width="32">
                        </md-card-media>
                        <md-icon :class="{fav: article.favorite}">star</md-icon>
                        {{article.article_title}}
                    </div>
                    <div class="md-subhead" v-html="article.info" v-once @click="showDetail(article)"></div>
                </md-card-header-text>

            </md-card-header>

            <md-card-actions v-show="false">
                <md-button>
                    <md-icon>access_time</md-icon>
                    加入待读
                </md-button>
                <md-button @click="showDetail(article)">
                    <md-icon>visibility</md-icon>
                    阅读
                </md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import * as types from '@/types'
export default {
  methods: {
    showDetail (article) {
      let vm = this
      vm.$store.commit(types.CHANGE_ARTICLE, article)
      vm.$router.push({name: 'articlePage', params: { id: article.article_id }})
    }
  }
}
</script>

<style>
    @media (max-width: 480px) {
        .md-card .md-card-header .md-card-media.title_image {
            display: none;
        }
    }
    .md-icon.md-theme-purple.fav {
        color: gold;
    }
</style>
