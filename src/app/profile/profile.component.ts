import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private keycloakService: KeycloakService) {
    this.profileForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.keycloakService.keycloakEvents$.subscribe((event) => {
      this.updateForm();
    });

    /*const dataReceived = this.route.snapshot.paramMap.get('data');
    console.log('Data Received:', dataReceived);

    if (dataReceived) {
      const parsedData = JSON.parse(dataReceived);
      const headerData = parsedData.HEADER;
      console.log('Header Data:', headerData);

      if (headerData) {
        console.log('TITLE:', headerData.TITLE);
        console.log('PROFILE:', headerData.PROFILE);
        console.log('ABOUT:', headerData.ABOUT);
      } else {
        console.error('Header data is undefined or null.');
      }
    } else {
      console.error('Data received is undefined or null.');
    }*/
  }

  updateForm() {
    const tokenParsed = this.keycloakService.getKeycloakInstance().tokenParsed;
    
    this.profileForm.patchValue({
      firstName: tokenParsed?.['given_name'],
      lastName: tokenParsed?.['family_name'],
      username: tokenParsed?.['preferred_username'],
    });
  }

  saveProfile() {
    // Adicione a lógica para salvar os dados do perfil aqui
    console.log('Dados do perfil salvos:', this.profileForm.value);
  }

  // profile.component.ts

  goBack() {
    // Adicione a lógica para voltar para a página anterior
    console.log('Voltando...');
  }

}
