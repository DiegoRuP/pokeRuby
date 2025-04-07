import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../../services/pokeapi.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonId!: number;
  @Output() close = new EventEmitter<void>();

  pokemon: any = null;
  description: string = 'Loading description...';

  constructor(private pokeApi: PokeApiService) {}

  async ngOnInit() {
    if (this.pokemonId) {
      try {
        this.pokemon = await firstValueFrom(this.pokeApi.getPokemon(this.pokemonId));
        const species = await firstValueFrom(this.pokeApi.getPokemonSpecies(this.pokemonId));
        this.setDescription(species);
      } catch (error) {
        console.error('Error loading Pokémon details:', error);
        this.description = 'Failed to load description';
      }
    }
  }

  setDescription(species: any) {
    const englishEntry = species.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
    
    if (englishEntry) {
      this.description = englishEntry.flavor_text
        .replace(/\f/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ');
    } else {
      this.description = 'No description available';
    }
  }

  getSprite(): string {
    return this.pokemon?.sprites?.other?.['official-artwork']?.front_default ||
           this.pokemon?.sprites?.front_default ||
           '../../../assets/img/emptyPokemon.png';
  }

  getMoves(): string[] {
    return this.pokemon?.moves?.slice(0, 4).map((m: any) => m.move.name) || [];
  }

  getTypes(): string[] {
    return this.pokemon?.types?.map((t: any) => t.type.name) || [];
  }

  formatName(name: string): string {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ') : '';
  }

  closeModal() {
    this.close.emit();
  }
  
  formatMove(move: string): string {
    return move.charAt(0).toUpperCase() + move.slice(1).replace(/-/g, ' ');
  }
}