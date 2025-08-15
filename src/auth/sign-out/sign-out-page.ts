import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APP_INFO } from '../../app/app-info';

@Component({
  selector: 'app-sign-out',
  imports: [MatFormFieldModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-out-page.html',
  styleUrls: ['./sign-out-page.scss'],
})
export class SignOutPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string | undefined = '';
  readonly info = APP_INFO;

  ngOnInit(): void {
    this.username = this.authService.getUser()?.username;

    if (this.username) {
      this.authService.logout();
    }

    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 5000);
  }
}
