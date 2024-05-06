import { Component } from '@angular/core';
import { AuthService } from '../../../../sevices/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  collapsed = true;

  constructor(public authService: AuthService, private router: Router) {

  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
