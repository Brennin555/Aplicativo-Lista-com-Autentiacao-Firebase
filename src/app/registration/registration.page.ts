import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationserviceService } from '../shared/authenticationservice.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ngFireAuth: any; // DECLARANDO NGFIREAUTH --> HAVIA DADO ERRO

  constructor(
    public authService: AuthenticationserviceService,
    public router: Router
  ) {}
  ngOnInit() {}

  signUp(email, password) {
    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail();
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }
}
