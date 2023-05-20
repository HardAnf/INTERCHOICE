declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    beginning: string
    flowchart: string
    flowchartContent: string
    header: string
    sceneActions: string
    sceneName: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
