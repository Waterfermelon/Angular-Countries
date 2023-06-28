import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../interfaces/country';
import { catchError, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private apiUrl:string = 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient) { }
    
    searchCapital( type:string, term:string ): Observable<Country[]> {

        return this.http.get<Country[]>(`${ this.apiUrl }/${type}/${term}`)
        .pipe(
            catchError( () => of([]))
        );
    }

    searchCountryByAlphaCode( code : string ):Observable<Country | null>{

        return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${code}`)
        .pipe(
            map( countries => countries.length > 0 ? countries[0]: null ),
            catchError( () => of(null))
        );
    }
}