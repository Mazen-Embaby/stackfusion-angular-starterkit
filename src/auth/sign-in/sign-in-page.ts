import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  NgForm,
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from 'ngx-toastr-notifier';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { APP_INFO } from '../../app/app-info';
import { AUTH_API } from '../auth.api';
import { environment } from '../../environments/environment';
import { AlertComponent } from '../../@sf/alert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-page.html',
  imports: [NgClass, MatInputModule, RouterLink, FormsModule, ReactiveFormsModule, AlertComponent],
  styleUrls: ['./sign-in-page.scss'],
})
export class SignInPage implements OnInit {
  private _formBuilder = inject(UntypedFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toastr = inject(ToastService);

  readonly info = APP_INFO;
  strapiGoogleAuthLink = AUTH_API.GOOGLE_SIGN_IN_END_POINT;
  demoLoginEmail = environment.demoLoginEmail;
  demoLoginPassword = environment.demoLoginPassword;

  @ViewChild('signInNgForm')
  signInNgForm!: NgForm;
  signInForm!: UntypedFormGroup;

  providersNames = [
    'discord',
    'facebook',
    'github',
    'google',
    'instagram',
    'linkedin',
    'reddit',
    'twitch',
    'twitter',
    'vk',
    'auth0',
  ];

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: [this.demoLoginEmail, [Validators.required, Validators.email]],
      password: [this.demoLoginPassword, [Validators.required]],
    });
  }

  login(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // // Disable the form
    this.signInForm.disable();

    const { email, password } = this.signInForm.value;

    this._authService.signin(email, password).subscribe({
      next: (value) => {
        this._authService.me().subscribe();
        this._router.navigateByUrl('/template');
        this._toastr.success(`${value.user.username}`, `${'Welcome'}`, {
          duration: 2000,
        });
      },

      error: (error) => {
        this._router.navigateByUrl('/auth/sign-in');
        this._toastr.error(`${error}`, `${'Error'}`, {
          duration: 2000,
        });
      },

      complete: () => console.log('This is how it ends!'),
    });
    // re-enable the form
    this.signInForm.enable();
  }
}
