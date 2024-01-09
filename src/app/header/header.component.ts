import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { KeycloakService, KeycloakEvent } from 'keycloak-angular';
import { MatMenuTrigger } from '@angular/material/menu';
import { environment } from 'src/environments/environment';

interface languages {
  value: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  clienteName: string | undefined;
  selectedLang: string | undefined;

  @Input() lang: any;
  @Output() changeLanguage = new EventEmitter<string>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  languages: languages[] = [
    {value: 'en'},
    {value: 'pt'}
  ];

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.selectedLang = environment.language;
    this.keycloakService.keycloakEvents$.subscribe((event) => {
      this.updateClienteName();
    });
  }

  isTokenEvent(event: any): boolean {
    return event && (event.type === 'token' || event === 'onToken' || event === 'onTokenExpired');
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

  changeLang(event: { value: any; }) {
    //Alterar a linguagem
    this.changeLanguage.emit(event.value);
  }

  profile() {
    // Lógica quando um item do menu é clicado
  }
}
