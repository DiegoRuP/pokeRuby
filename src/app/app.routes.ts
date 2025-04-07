import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { BagComponent } from './components/bag/bag.component';
import { MapComponent } from './components/map/map.component';
import { AboutComponent } from './components/about/about.component';
import { PokemonTeamComponent } from './components/pokemon-team/pokemon-team.component';

export const routes: Routes = [
    { path: 'pokedex', component: PokedexComponent },
    { path: 'pokemon-team', component: PokemonTeamComponent },
    { path: 'pokemon-detail', component: PokemonDetailComponent },
    { path: 'bag', component: BagComponent },
    { path: 'map', component: MapComponent },
    { path: 'about', component: AboutComponent },
    { path: 'pokemon-detail/:id', loadComponent: () => import('./components/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)},
    { path: 'exit', redirectTo: '/', pathMatch: 'full' },
];
