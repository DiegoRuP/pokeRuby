import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon-species/${id}`);
  }
  
  searchPokemon(term: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${term.toLowerCase()}`);
  }
}