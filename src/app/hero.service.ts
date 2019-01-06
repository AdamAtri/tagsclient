import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { MessagesService } from './messages.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private _heroesUrl = '/heroes';
  private _httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private _http: HttpClient,
    private _messagesService: MessagesService
  ) { }

  private log(message: string) {
    this._messagesService.add(message);
  }

  public get heroesAsync(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this._heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this._handleError<Hero[]>('getHeroes', []))
      );
  }

  public getHero(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/${id}`;
    return this._http.get<Hero>(url).pipe(
      tap(_ => this.log('fetched hero id=' + id)),
      catchError(this._handleError<Hero>(`getHero id=${id}`))
    );
    
  }

  public updateHero(hero: Hero): Observable<any> {
    return this._http.put(this._heroesUrl, hero, this._httpOptions).pipe(
      tap(_ => this.log(`updating hero id=` + hero.id)),
      catchError(this._handleError<any>('updateHero'))
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this._heroesUrl, hero, this._httpOptions).pipe(
      tap((rHero: Hero) => this.log(`added hero id=${rHero.id}`)),
      catchError(this._handleError<Hero>('addHero'))
    );
  }

  public deleteHero(hero: Hero): Observable<Hero[]> {
    const url = `${this._heroesUrl}/${hero.id}`;
    return this._http.delete<Hero[]>(url, this._httpOptions).pipe(
      tap(_ => this.log('deleted hero id=' + hero.id)),
      catchError(this._handleError<Hero[]>('deleteHero'))
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._http.get<Hero[]>(`${this._heroesUrl}/?name=${term}`).pipe(
      tap(_ => {this.log(`searching for heroes where name starts with="${term}"`)}),
      catchError(this._handleError<Hero[]>('searchHero'))
    );

  }


  /**
   * Handle Http operation failures without app failure
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private _handleError<T>(operation='operation', result?:T) {
    return (error: any): Observable<T> => {
      // TODO: send error to remote logging
      console.error(error);
      
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
