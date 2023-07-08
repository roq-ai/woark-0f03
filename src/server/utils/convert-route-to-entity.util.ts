const mapping: Record<string, string> = {
  contents: 'content',
  'online-forms': 'online_form',
  organizations: 'organization',
  'seo-options': 'seo_option',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
