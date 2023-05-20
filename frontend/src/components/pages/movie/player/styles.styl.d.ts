declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    buttons: string
    childrenVideo: string
    choice: string
    container: string
    question: string
    video: string
    videoButton: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
