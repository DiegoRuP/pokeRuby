// pokeapi.service.ts
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

  getMoveByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/item/${id}`);
  }
  getItemCategory(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/item-category/${name}`);
  }

  getItemCategories(limit: number = 100, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/item-category?limit=${limit}&offset=${offset}`);
  }
}