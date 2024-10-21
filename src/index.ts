import { Compiler, Compilation, sources } from 'webpack'
import { handleCss, handleJs, isDefaultEntryPoint, optionDefaults, Options } from '../core'

class WebpackResponsiveApp {
  private options: Options;
  private hasAddedJs: boolean;

  constructor(options?: Options) {
    this.options = { ...(options || {}), ...optionDefaults }
    this.hasAddedJs = false
  }

  apply(compiler: Compiler): void {
    let transformedCss = ''

    compiler.hooks.compilation.tap('WebpackResponsiveApp', (compilation: Compilation) => {
      compilation.hooks.optimizeModules.tap('WebpackResponsiveApp', (modules: any) => {
        modules.forEach((module: any) => {
          if (module.resource && module.resource.endsWith('.css')) {
            const moduleTransformation = handleCss(this.options, module.originalSource().source(), module.resource)
            if (moduleTransformation && moduleTransformation.transformations) transformedCss += moduleTransformation.transformations
          }
        })
      })
    })

    compiler.hooks.emit.tapAsync('WebpackResponsiveApp', (compilation, callback) => {
      compilation.chunks.forEach(chunk => {
        if (chunk.canBeInitial()) {
          const entryFiles = Array.from(chunk.files).filter(i => isDefaultEntryPoint(this.options, i))
          if (entryFiles && entryFiles[0]) {
            const fileName = entryFiles[0]
            const originalSource = compilation.assets[fileName].source()
            const jsTransformation = handleJs(this.options, originalSource.toString(), fileName, transformedCss)
            compilation.assets[fileName] = new sources.RawSource(jsTransformation.code)
            this.hasAddedJs = true
          }
        }
      })
      callback();
    })
  }
}

export default WebpackResponsiveApp