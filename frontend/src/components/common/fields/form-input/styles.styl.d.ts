declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    container: string
    dirty: string
    error: string
    field: string
    fieldContainer: string
    focused: string
    focusedLabel: string
    input: string
    label: string
    root: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
