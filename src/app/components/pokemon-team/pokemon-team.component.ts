import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../../services/pokeapi.service';
import { firstValueFrom } from 'rxjs';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-team',
  standalone: true,
  imports: [CommonModule, PokemonDetailComponent],
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.css']
})
export class PokemonTeamComponent implements OnInit {
  teamPokemon: any[] = [];
  isLoading: boolean = true;
  selectedPokemonId: number | null = null;

  constructor(private pokeApi: PokeApiService) {}

  async ngOnInit() {
    await this.loadRandomTeam();
  }

  async loadRandomTeam() {
    this.isLoading = true;

    try {
      const teamSize = 6;
      const pokemonPromises = [];

      for (let i = 0; i < teamSize; i++) {
        const randomId = Math.floor(Math.random() * (386 - 252 + 1)) + 252;
        pokemonPromises.push(firstValueFrom(this.pokeApi.getPokemon(randomId)));
      }

      const results = await Promise.all(pokemonPromises);

      this.teamPokemon = results.map(pokemon => {
        const level = Math.floor(Math.random() * 46) + 5;
        const baseHp = pokemon.stats.find((stat: any) => stat.stat.name === 'hp').base_stat;
        const maxHp = Math.floor(((baseHp * 2) * level) / 100) + level + 10;
        const currentHp = Math.floor(Math.random() * (maxHp - 1)) + 1;

        return {
          id: pokemon.id,
          name: this.formatName(pokemon.name),
          sprite: this.getSprite(pokemon),
          types: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
          level: level,
          stats: {
            hp: currentHp,
            maxHp: maxHp
          }
        };
      });
    } catch (error) {
      console.error('Error loading Pokémon team:', error);
    } finally {
      this.isLoading = false;
    }
  }

  openDetail(id: number) {
    this.selectedPokemonId = id;
  }

  closeDetail() {
    this.selectedPokemonId = null;
  }

  getSprite(pokemon: any): string {
    return (
      pokemon.sprites.versions?.['generation-iii']?.['emerald']?.front_default ||
      pokemon.sprites.versions?.['generation-iii']?.['firered-leafgreen']?.front_default ||
      pokemon.sprites.versions?.['generation-iii']?.['ruby-sapphire']?.front_default ||
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default ||
      '../../../assets/img/emptyPokemon.png'
    );
  }

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
