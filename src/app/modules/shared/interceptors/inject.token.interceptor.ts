import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { GRAPH_ENDPOINT } from 'src/environments/environment';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {
  constructor(private azureAdB2CService: AzureAdB2CService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.azureAdB2CService.verifyOrUpdateAccessToken();

    if (request.url.startsWith(GRAPH_ENDPOINT)) {
      const requestWithHeaders = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.azureAdB2CService.getAccessToken()
        ),
      });
      return next.handle(requestWithHeaders);
    } else {
      return next.handle(request);
    }
  }
}
