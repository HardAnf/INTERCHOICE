declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    closeButton: string
    container: string
    fields: string
    fileInput: string
    switchFormControl: string
    switchLabel: string
    video: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
