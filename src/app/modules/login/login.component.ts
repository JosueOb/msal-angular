import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from './services/azure.ad.b2c.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private azureAdB2CService: AzureAdB2CService) {}

  ngOnInit(): void {}

  login() {
    console.log('Sign in');
    this.azureAdB2CService.signIn().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => console.log(error),
    });
  }
}
