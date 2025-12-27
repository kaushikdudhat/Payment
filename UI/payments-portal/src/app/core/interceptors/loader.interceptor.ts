import { Injectable } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize } from "rxjs";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loader: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.loader.loading$.next(true);
        return next.handle(req).pipe(finalize(() => this.loader.loading$.next(false)));
    }
}
