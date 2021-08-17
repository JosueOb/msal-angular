import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from './services/azure.ad.b2c.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  login() {
    //console.log('Sign in');
    if (this.azureAdB2CService.isLogin()) {
      this.route.navigate(['']);
    } else {
      this.azureAdB2CService.signIn().subscribe({
        next: (result) => {
          //console.log(result);
          this.azureAdB2CService.handleResponse(result);
          this.route.navigate(['']);
        },
        error: (error) => console.error('Login error', error),
        //complete: () => console.log('Login completed.'),
      });
    }
  }
}
