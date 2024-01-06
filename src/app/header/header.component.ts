import { Component } from '@angular/core';
import { KeycloakService, KeycloakEvent } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  clienteName: string | undefined;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.keycloakService.keycloakEvents$.subscribe((event) => {
      this.updateClienteName();
    });
  }

  isTokenEvent(event: any): boolean {
    return event && (event.type === 'token' || event === 'onToken' || event === 'onTokenExpired');
    // Adicione outros eventos relacionados ao token, se aplicável
  }

  updateClienteName() {
    const tokenParsed = this.keycloakService.getKeycloakInstance().tokenParsed;
    console.log(tokenParsed);
    this.clienteName = tokenParsed?.['preferred_username'] || 'Nome Padrão';
  }

  logout() {
    this.keycloakService.logout();
  }

  isLoggedIn() {
    return this.keycloakService.isLoggedIn();
  }
}
