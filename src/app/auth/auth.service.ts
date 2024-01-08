import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; // optional
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FB_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage);
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
          }
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FB_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
