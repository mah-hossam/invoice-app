import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MockBackendService } from '../../sevices/mock-backend.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../sevices/auth-service.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule, ToastModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isloading = false;



  constructor(private backend: MockBackendService, private messageService: MessageService, private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
  }


  login() {
    this.isloading = true;
    this.auth.login(this.username, this.password).subscribe(res => {
      this.isloading = false;
      // if valid -> navigate to dashboard
      this.router.navigate(['/dashboard']);
    },
      err => {
        this.isloading = false;
        this.showErrorToast(err);
      }
    );
  }

  showErrorToast(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg, key: 'tr', life: 3000 });
    // reset form if invalid
    this.username = '';
    this.password = '';
  }

}
