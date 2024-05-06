import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../sevices/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {

  collapsed = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public authService: AuthService, private router: Router) {

  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logOut().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.router.navigate(['/']);
    }, err => console.error(err));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
