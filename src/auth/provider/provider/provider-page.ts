import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'ngx-toastr-notifier';
import { AuthService } from '../../auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-provider',
  imports: [MatProgressSpinnerModule],
  templateUrl: './provider-page.html',
  styleUrls: ['./provider-page.scss'],
})
export class ProviderPage implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _toastr = inject(ToastService);

  idToken!: string;
  accessToken!: string;
  providerName!: string;

  ngOnInit(): void {
    this.providerName = this._activatedRoute.snapshot.params['providerName'];

    // use search parameters
    const queryParams = this._activatedRoute.snapshot.queryParams;

    this._authService.signInWithProvider(queryParams).subscribe({
      next: (value) => {
        this._authService.me().subscribe();
        this._router.navigateByUrl('/template');
        this._toastr.success(`${value.user.username}`, `${'Welcome'}`, {
          duration: 2000,
        });
      },

      error: (error) => {
        this._toastr.error(`${error}`, `${'Error'}`, {
          duration: 2000,
        });
      },

      complete: () => console.log('This is how it ends!'),
    });
  }
}
