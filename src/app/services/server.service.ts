import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface Options {
    params?: any;
    showError?: boolean;
    showLoader?: boolean;
}

// Constantes
const defaultOptions: Options = { params: null, showError: true, showLoader: true };

@Injectable()
export class Server {
    private baseURL: string;

    constructor(private http: HttpClient) { }

    private parse(data: any): any {
        const rvalidchars = /^[\],:{}\s]*$/;
        const rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        const rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        const rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
        const dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z/i;
        const dateNet = /\/Date\((-?\d+)(?:-\d+)?\)\//i;

        const replacer = (key, value) => {
            if (typeof (value) === 'string') {
                if (dateISO.test(value)) {
                    return new Date(value);
                }
                if (dateNet.test(value)) {
                    return new Date(parseInt(dateNet.exec(value)[1], 10));
                }
            }
            return value;
        };

        if (data && typeof (data) === 'string'
            && rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
            return JSON.parse(data, replacer);
        } else {
            return data;
        }
    }

    private stringify(object: any) {
        return JSON.stringify(object);
    }

    private prepareOptions(options: Options) {
        const result = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept-Language': 'es'
                // Authorization: window.sessionStorage.getItem('jwt') ? 'JWT ' + window.sessionStorage.getItem('jwt') : null
            }),
            params: options.params
        };
        // if (options && options.params) {
        //     result.params = new HttpParams();
        //     for (const param in options.params) {
        //         if (options.params[param] !== undefined) {
        //             if (Array.isArray(options.params[param])) {
        //                 (options.params[param] as Array<any>).forEach((value) => {
        //                     result.params.append(param, value);
        //                 });
        //             } else {
        //                 if (options.params[param] instanceof Date) {
        //                     result.params.set(param, (options.params[param] as Date).toISOString());
        //                 } else {
        //                     result.params.set(param, options.params[param]);
        //                 }
        //             }
        //         }
        //     }
        // }
        return result;
    }

    private getAbsoluteURL(url: string) {
        if (url.toLowerCase().startsWith('http')) {
            return url;
        } else {
            return this.baseURL + url;
        }
    }

    setBaseURL(baseURL: string) {
        this.baseURL = baseURL;
    }

    get(url: string, options: Options = defaultOptions): Observable<any> {
        return this.http.get(this.getAbsoluteURL(url), this.prepareOptions(options));
        // .pipe(map((res: Response) => this.parse(res.body)));

        // .catch((err: any, caught: Observable<any>) => this.handleError(err, options));
    }

    post(url: string, body: any, options: Options = null): Observable<any> {
        return this.http.post(this.getAbsoluteURL(url), this.stringify(body), this.prepareOptions(options))
            // .finally(() => this.updateLoader(false, options))
            .pipe(map((res: Response) => this.parse(res.body)));
        // .catch((err: any, caught: Observable<any>) => this.handleError(err, options));
    }

    put(url: string, body: any, options: Options = defaultOptions): Observable<any> {
        return this.http.put(this.getAbsoluteURL(url), this.stringify(body), this.prepareOptions(options))
            .pipe(map((res: Response) => this.parse(res.body)));
    }

    patch(url: string, body: any, options: Options = defaultOptions): Observable<any> {
        return this.http.patch(this.getAbsoluteURL(url), this.stringify(body), this.prepareOptions(options))
            .pipe(map((res: Response) => this.parse(res.text())));
    }

    delete(url: string, options: Options = defaultOptions): Observable<any> {
        return this.http.delete(this.getAbsoluteURL(url), this.prepareOptions(options))
            .pipe(map((res: Response) => this.parse(res.text())));
    }
}
