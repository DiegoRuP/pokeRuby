import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { BagComponent } from './components/bag/bag.component';
import { GymComponent } from './components/gym/gym.component';
import { MapComponent } from './components/map/map.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: 'pokedex', component: PokedexComponent },
    { path: 'pokemon-detail', component: PokemonDetailComponent },
    { path: 'bag', component: BagComponent },
    { path: 'gym', component: GymComponent },
    { path: 'map', component: MapComponent },
    { path: 'about', component: AboutComponent },
    { path: 'exit', redirectTo: '/', pathMatch: 'full' },
];
