import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/pokeapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemonList: any[] = [];
  selectedPokemon: any = null;
  isLoading: boolean = true;
  errorLoading: boolean = false;
  searchText: string = '';

  constructor(private pokeApi: PokeApiService) {}

  async ngOnInit() {
    await this.loadHoennPokemon();
  }

  async loadHoennPokemon() {
    this.isLoading = true;
    this.errorLoading = false;

    try {
      const requests = Array.from({ length: 135 }, (_, i) =>
        firstValueFrom(this.pokeApi.getPokemon(i + 252)).catch(error => {
          console.error(`Error loading Pokémon ${i + 252}:`, error);
          return null;
        })
      );

      const results = await Promise.all(requests);

      this.pokemonList = results
        .filter(pokemon => pokemon !== null)
        .map(pokemon => ({
          id: pokemon.id,
          name: this.formatName(pokemon.name),
          sprite: this.getSprite(pokemon),
          types: pokemon.types.map((t: { type: { name: string } }) => 
            t.type.name.toUpperCase())
        }))
        .sort((a, b) => a.id - b.id);

      if (this.pokemonList.length > 0) {
        this.selectPokemon(this.pokemonList[0]);
      }
    } catch (error) {
      console.error('Error loading Pokémon:', error);
      this.errorLoading = true;
    } finally {
      this.isLoading = false;
    }
  }

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  getSprite(pokemon: any): string {
    const gen3Sprite = pokemon.sprites.versions?.['generation-iii']?.['emerald']?.front_default ||
                      pokemon.sprites.versions?.['generation-iii']?.['ruby-sapphire']?.front_default;
    
    return gen3Sprite || 
           pokemon.sprites.other?.['official-artwork']?.front_default ||
           pokemon.sprites.front_default ||
           '../../../assets/img/emptyPokemon.png';
  }

  formatName(name: string): string {
    return name.split('-')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' ');
  }

  formatId(id: number): string {
    return id.toString().padStart(3, '0');
  }
}