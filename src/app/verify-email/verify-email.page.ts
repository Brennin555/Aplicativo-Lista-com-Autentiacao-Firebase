import { Component, OnInit } from '@angular/core';
import { AuthenticationserviceService } from '../shared/authenticationservice.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  constructor(public authService: AuthenticationserviceService) {}
  ngOnInit() {}
}
