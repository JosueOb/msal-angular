import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    console.log('Sign out');
    this.azureAdB2CService.logout();
    this.router.navigate(['login']);
  }
}
