import { environment } from '../environments/environment';

export const keycloakConfig = {
  url: environment.keycloakUrl,
  realm: 'master',
  clientId: 'shopdeliver',
};
