import { Component, ViewChild } from '@angular/core';
import { KeycloakService, KeycloakEvent } from 'keycloak-angular';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  clienteName: string | undefined;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

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
    this.clienteName = tokenParsed?.['preferred_username'] || 'Nome Padrão';
  }

  logout() {
    this.keycloakService.logout();
  }

  isLoggedIn() {
    return this.keycloakService.isLoggedIn();
  }

  openMenu() {
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }

  profile() {
    // Lógica quando um item do menu é clicado
  }

  about() {
    // Outra lógica de item de menu
  }
}
