import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from 'ngx-toastr-notifier';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  imports: [NgClass, MatInputModule, RouterLink, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './sign-up-page.html',
  styleUrls: ['./sign-up-page.scss'],
})
export class SignUpPage implements OnInit {
  private authService = inject(AuthService);
  private formBuilder = inject(UntypedFormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastService);

  @ViewChild('signUpNgForm')
  signUpNgForm!: NgForm;
  signUpForm!: UntypedFormGroup;

  ngOnInit(): void {
    // Create the form
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.signUpForm.disable();

    const { username, email, password } = this.signUpForm.value;
    this.authService.register(username, email, password).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin');
        this.toastr.success(`${res.user.username}`, `${'Welcome'}`, {
          duration: 2000,
        });
      },
      error: (msg) => {
        // Re-enable the form
        this.signUpForm.enable();
        this.signUpNgForm.resetForm();
        this.toastr.error(`${msg}`, `${'Error'}`, {
          duration: 2000,
        });
      },

      complete: () => console.info('complete'),
    });
  }
}
