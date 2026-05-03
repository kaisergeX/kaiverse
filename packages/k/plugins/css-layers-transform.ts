import type {PluginCreator} from 'postcss'

const cssLayersPlugin: PluginCreator<{
  rootLayer?: string
}> = (opts = {}) => {
  const rootLayer = opts.rootLayer ?? 'k-components'

  return {
    postcssPlugin: 'postcss-css-layers',

    Once(root) {
      const file = root.source?.input.file ?? ''

      // only transform library styles
      if (!file.includes('/lib/')) return

      root.walkAtRules('layer', (atRule) => {
        const params = atRule.params.trim()

        const layers = params.split(',').map((s) => s.trim())

        const transformed = layers.map((layer) => {
          if (!layer) return layer

          // already transformed
          if (layer.startsWith(`${rootLayer}.`)) {
            return layer
          }

          return `${rootLayer}.${layer}`
        })

        atRule.params = transformed.join(', ')
      })
    },
  }
}

cssLayersPlugin.postcss = true

export default cssLayersPlugin
