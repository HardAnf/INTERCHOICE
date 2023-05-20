declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    logo: string
    menu: string
    navigation: string
    pageBar: string
    pageTitle: string
    siteHeader: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
