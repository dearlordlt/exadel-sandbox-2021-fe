import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 400) {
          this.toastr.clear();
          this.toastr.error('Whoops! Bad request', 'Error');
        } else if (err.status == 403) {
          this.toastr.clear();
          this.toastr.error("Whoops! It appears you don't have the necessary permissions", 'Error');
        } else if (err.status == 404) {
          this.toastr.clear();
          this.toastr.error('Whoops! 404 Not found', 'Error');
        } else if (err.status == 500) {
          this.toastr.clear();
          this.toastr.error('Whoops! We are experiencing some issues, please try again later', 'Error');
        } else if (err.error instanceof ErrorEvent) {
          this.toastr.clear();
          this.toastr.error('Client side error', 'Error');
        } else if (err.status == 0) {
          this.toastr.clear();
          this.toastr.error("Whoops! Can't reach the server, please try again later", 'Error');
        } else {
          this.toastr.clear();
          this.toastr.error('Whoops! Something went wrong', 'Error');
        }
        return throwError(err);
      })
    );
  }
}
