import { Component, OnInit } from '@angular/core';
import { AuthenticationserviceService } from '../shared/authenticationservice.service';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  constructor(public authService: AuthenticationserviceService) {}
  ngOnInit() {}
}
