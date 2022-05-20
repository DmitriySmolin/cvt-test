import { AboutPage, FavoritePage, MainPage } from '../pages';
import Auth from '../components/auth';
import Register from '../components/register';
import Logout from '../components/logout';
import CharactersListContainer from '../components/containers/characters-list-container';
import LocationsListContainer from '../components/containers/locations-list-container';
import ErrorIndicator from '../components/error-indicator';
import EpisodesListContainer from '../components/containers/episode-list-container';

export const ROUTES = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/favorites/*',
    element: <FavoritePage />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/characters',
    element: <CharactersListContainer />,
  },
  {
    path: '/locations',
    element: <LocationsListContainer />,
  },
  {
    path: '/episodes',
    element: <EpisodesListContainer />,
  },
  {
    path: '*',
    element: <ErrorIndicator />,
  },
];

export default ROUTES;
