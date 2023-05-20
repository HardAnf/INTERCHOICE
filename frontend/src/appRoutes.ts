export const appRoutes = {
  root: (): string => '/',
  login: (): string => '/login',
  register: (): string => '/register',
  movie: (movieId: string = ':movieId'): string => `/movie/${movieId}`,
  scenesEditor: (movieId: string = ':movieId'): string => `${appRoutes.movie(movieId)}/scenes`,
  createMovie: (): string => '/movie/create',
  promo: (): string => '/',
  userProjects: (): string => '/my-movies',
  projectsFeed: (): string => '/feed',
  logout: (): string => '/logout',
  analytics: (): string => '/analytics'
}

export const fullAppRoute = (route: string): string => `${process.env.SITE_URL}${route}`
