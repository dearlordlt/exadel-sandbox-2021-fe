import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    setTimeout(() => {
      this.loaderService.isLoading.next(true);
    }, 0);

    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loaderService.isLoading.next(false);
        }, 0);
      })
    );
  }
}
