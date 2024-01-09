import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang: any;

  constructor(
    private readonly keycloak: KeycloakService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadLang(environment.language);
  }

  loadLang(lang: string) {
    this.http.get<any>('assets/language/'+lang+'.json').subscribe(response => {
      this.lang = response;
    });
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  isLoggedIn() {
    return this.keycloak.isLoggedIn();
  }

  changeLang(lang: string) {
    this.loadLang(lang);
  }
}
