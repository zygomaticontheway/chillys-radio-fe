interface Link {
  path: string;
  label: string;
}

export const headerLinks: Link[] = [
  {
    path: '/top-stations',
    label: 'Top Stations'
  },
  {
    path: '/country',
    label: 'Country'
  },
  {
    path: '/language',
    label: 'Language'
  },
  {
    path: '/tags',
    label: 'Tags'
  }
];

export const userLinks: Link[] = [
  {
    path: '/login',
    label: 'Login / '
  },
  {
    path: '/register',
    label: 'Register'
  },
  {
    path: '/logout',
    label: 'Logout'
  }
];

export const homeLink: Link = {
  path: '/',
  label: ''
};