import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Automobile } from './automobile';

@Injectable({
  providedIn: 'root'
})
export class AutomobileService {

  apiServer = 'http://localhost:8080/api/automobile';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  searchAutomobili(automobileInput: Automobile, paginationCriteria: Map<string, string>): Observable<any> {
    //siccome i parametri sulla paginazione sono nell'url:
    //http://localhost:8080/api/automobile/search?pageSize=5&pageNo=0&sortBy=dataImmatricolazione
    //ma i criteri sull'oggetto sono nel body della post, bisogna spezzettare le cose
    let searchBaseUrl: string = `/search?pageSize=${paginationCriteria.get('pageSize')}&pageNo=${paginationCriteria.get('pageNo')}&sortBy=${paginationCriteria.get('sortBy')}`;
    return this.http.post<any>(this.apiServer + searchBaseUrl, JSON.stringify(automobileInput), this.httpOptions).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );

  }

  getAutomobile(idAutomobileInput: number): Observable<Automobile> {
    return this.http.get<Automobile>(this.apiServer + '/' + idAutomobileInput.toString()).pipe(
      catchError(this.handleError)
    );
  }

  create(automobileInput: Automobile): Observable<Automobile> {
    return this.http.post<Automobile>(this.apiServer, JSON.stringify(automobileInput), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(automobileInput: Automobile): Observable<Automobile> {
    return this.http.put<Automobile>(this.apiServer + '/' + automobileInput.id?.toString(), automobileInput, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(automobileInput: Automobile): Observable<Automobile> {
    return this.http.delete<Automobile>(this.apiServer + '/' + automobileInput.id?.toString(), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      err.error?.errors?.forEach((element: { message: string; }) => {
        errorMessage += element.message;
      });
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}