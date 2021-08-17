import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';
import { Router } from '@angular/router';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public givenName: string;
  public id: string;
  public surname: string;

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.givenName = '';
    this.id = '';
    this.surname = '';
  }

  ngOnInit(): void {
    this.seeProfile();
  }

  logout(): void {
    //console.log('Sign out');
    this.azureAdB2CService.logout();
    this.router.navigate(['login']);
  }

  seeProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (resp) => {
        this.id = resp.id;
        this.givenName = resp.givenName;
        this.surname = resp.surname;
        //console.log('Data profile', resp);
      },
      error: (error) => console.error('Get profile error', error),
      //complete: () => console.log('Get profile completed.'),
    });
  }
}
