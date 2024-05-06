import { Component } from '@angular/core';
import { AuthService } from '../../../../sevices/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  constructor(public authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
