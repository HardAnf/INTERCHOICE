declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    menu: string
    menuIcon: string
    movie: string
    movieActions: string
    movieInfo: string
    movieLink: string
    moviePreview: string
    movieTitle: string
    moviesGrid: string
    shortDescription: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
