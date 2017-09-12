<template>
    <md-card md-theme="purple" md-with-hover>
        <md-card-header v-show="false">
            <md-card-header-text>
                <div class="md-title">
                    <md-card-media>
                        <img src="http://www.eatlogos.com/art_logos/png/vector_art_rose_lotus_logo.png" alt="lotus"
                             width="32">
                    </md-card-media>
                    {{article.article_title}}
                </div>
            </md-card-header-text>
        </md-card-header>

        <md-card-content v-html="article.article_content" v-once class="article_content">
        </md-card-content>
    </md-card>
</template>

<script>
export default {
  computed: {
    article () {
      return this.$store.state.currentArticle
    }
  },
  methods: {
    showDetail (article) {
      console.log(article)
      this.$router.push({name: 'article', params: { id: article.article_id }})
    }
  }
}
</script>

<style>
.md-card .md-card-content.article_content {
    font-family: -apple-system-font,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
    font-size: 17px;
}
</style>
