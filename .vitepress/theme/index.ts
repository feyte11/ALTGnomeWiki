// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { useRoute, useData } from 'vitepress';
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import imageViewer from 'vitepress-plugin-image-viewer'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities'
import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities'
import { InjectionKey } from '@nolebase/vitepress-plugin-enhanced-readabilities'
import AGWHomeContents from './components/AGWHomeContents.vue'
import AGWMetaBars from './components/AGWAppsMetaWidget.vue'
import AGWCategories from './components/AGWDocsCategories.vue'
import AGWGallery from './components/AGWGallery.vue'

import { locales } from '../../_data/enhanced-readabilities'

import { yandexMetrika } from '@hywax/vitepress-yandex-metrika'

import './style.css'
import './custom.css'
import 'viewerjs/dist/viewer.min.css';
import '@nolebase/vitepress-plugin-enhanced-readabilities/dist/style.css'
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(AGWHomeContents),
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      'aside-outline-after': () => h(AGWMetaBars),
    })
  },

  enhanceApp(ctx) {

    ctx.app.provide(InjectionKey, {
      locales: locales
    } as Options)

    yandexMetrika(ctx, {
      counter: {
        id: 95081395, initParams: {
          webvisor: true
        }
      },
    }),
    ctx.app.component('AGWGallery', AGWGallery);
    ctx.app.component('AGWCategories', AGWCategories)
  },
  setup() {
    // Get route
    const route = useRoute();
    // Using
    imageViewer(route);
  }
} satisfies Theme
