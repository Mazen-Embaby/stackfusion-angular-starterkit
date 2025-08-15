import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-in-a',
  templateUrl: './sign-in-a-page.html',
  styleUrls: ['./sign-in-a-page.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInAPage implements OnInit {
  private _formBuilder = inject(UntypedFormBuilder);
  private readonly _authService = inject(AuthService);

  @ViewChild('signInNgForm')
  signInNgForm!: NgForm;
  signInForm!: UntypedFormGroup;
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }

  aa() {
    this._authService.me().subscribe();
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
      next: (value) => this._authService.me().subscribe(),
      complete: () => console.log('This is how it ends!'),
    });

    this.signInForm.enable();
  }
}
