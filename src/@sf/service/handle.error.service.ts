import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

// temp solution for target project
// import { environment } from 'src/environments/environment';

import { ToastService } from 'ngx-toastr-notifier';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  private _httpClient = inject(HttpClient);
  private _toastr = inject(ToastService);

  private _alert = new ReplaySubject<{ type: string; message: string; isVisable: boolean }>(1);

  /**
   * Getter for category
   */
  get alert(): Observable<{ type: string; message: string; isVisable: boolean }> {
    return this._alert.asObservable();
  }

  setSuccessMsg(title: string, msg: string, ttl = 2000) {
    this._toastr.success(`${msg}`, `${title}`, {
      duration: ttl,
    });
  }

  setErrorMsg(title: string, msg: string, ttl = 2000) {
    this._toastr.error(`${msg}`, `${title}`, {
      duration: ttl,
    });
  }

  loginFailed(msg: string) {
    this._toastr.error(msg, 'Authentication failed!', { duration: 2000 });
  }

  loginSuccessfully(msg: string) {
    this._toastr.success(`welcome ${msg}`, 'Login sucessfully!', {
      duration: 2000,
    });
  }

  getAlertError(response: any) {
    const status: number = response.status;
    let alert: { type: string; message: string; isVisable: boolean } = {
      type: 'error',
      message: 'Something went wrong, please try again.',
      isVisable: false,
    };

    console.log('Error handle', response);
    if (status) {
      if (status.toString().startsWith('4')) {
        alert = {
          type: 'error',
          message: response.error.message,
          isVisable: true,
        };
      }
    }

    return alert;
  }

  updateAlert(response: any) {
    const status: number = response.status;
    let alert: { type: string; message: string; isVisable: boolean } = {
      type: 'success',
      message: '',
      isVisable: false,
    };

    switch (status) {
      case 200:
        {
          alert = {
            type: 'success',
            message: 'success to login',
            isVisable: false,
          };
        }
        break;
      case 400:
        {
          alert = {
            type: 'error',
            message: response.error.error.message,
            isVisable: true,
          };
        }
        break;
      default: {
        alert = {
          type: 'error',
          message: 'Something went wrong, please try again.',
          isVisable: true,
        };
      }
    }
    this._alert.next(alert);
  }
}
