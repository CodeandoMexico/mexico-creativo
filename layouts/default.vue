<template>
  <div id="layout-default">
    <header>
      <MXNavbar />
    </header>
    <div class="container">
      <Nuxt />
    </div>
    <footer>
      <MXFooter />
    </footer>
    <div
      v-show="$store.state.showOverlay"
      class="cover"
      @click="closeOverlay"
    ></div>
    <div class="popups">
      <MXNavbarMenu v-if="$store.state.showMXNavbarMenu" />
      <PlaygroundNavbarMenu v-if="$store.state.showPlaygroundNavbarMenu" />
      <CardModal v-if="$store.state.showCardModal" />
    </div>
  </div>
</template>

<script>
import MXNavbar from '@/components/MXNavbar'
import MXFooter from '@/components/MXFooter'
import MXNavbarMenu from '@/components/MXNavbarMenu'
import PlaygroundNavbarMenu from '@/components/PlaygroundNavbarMenu'
import CardModal from '@/components/CardModal'
import { mapMutations } from 'vuex'

export default {
  components: {
    MXNavbar,
    MXFooter,
    MXNavbarMenu,
    PlaygroundNavbarMenu,
    CardModal,
  },
  async fetch() {
    const { data } = await this.$axios('/api/componentes')
    console.log('data: ', data)
    const { records } = data
    console.log('records: ', records)
    this.componentes = records.map((r) => ({
      ...r,
      class: `color-topic-${r.orden}`,
      path: `/playground?componente=${r.orden}`,
    }))
  },
  data() {
    return {
      componentes: [],
    }
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.closeOverlay()
        if (to.path.includes('playground')) {
          this.updateComponentes()
        }
      }
    },
    '$store.state.showCardModal'(val) {
      if (val === true) {
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100%'
      } else {
        document.body.style.overflow = 'auto'
        document.body.style.height = 'auto'
      }
    },
  },
  mounted() {
    this.updateComponentes()
  },
  methods: {
    ...mapMutations([
      'setComponentes',
      'setComponenteSelected',
      'closeOverlay',
    ]),
    updateComponentes() {
      console.log('componentes: ', this.componentes)
      if (this.componentes.length) {
        this.setComponentes(this.componentes)
        const queryComponente = this.$route.query.componente
        console.log('queryComponente: ', queryComponente)
        if (queryComponente) {
          const componenteSelected = this.componentes.filter((t) => {
            return parseInt(t.orden) === parseInt(queryComponente)
          })[0]
          console.log('componenteSelected: ', componenteSelected)
          this.setComponenteSelected(componenteSelected)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#layout-default {
  min-height: 100vh;
  .container {
    width: 100%;
    padding-bottom: 40px;
  }
}
.cover {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
