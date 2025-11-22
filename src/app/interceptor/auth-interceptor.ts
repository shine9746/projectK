import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from '../services/common-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.commonService.authToken;
    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error intercepted:', error);
        if (error.status === 401) {
          this.commonService.clearStorage();
        }
        return throwError(() => error);
      })
    );
  }
}
