import { Component, OnInit } from '@angular/core';
import { AuthenticationserviceService } from '../shared/authenticationservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(public authService: AuthenticationserviceService) {}
  ngOnInit() {}
}
