import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems = [
    { label: 'POKéDEX', link: '/pokedex' },
    { label: 'POKéMON', link: '/pokemon-team' },
    { label: 'BAG', link: '/bag' },
    { label: 'MAP', link: '/map' },
    { label: 'ABOUT', link: '/about' },
    { label: 'EXIT', link: '/' }
  ];
  
  constructor(public router: Router) {}
}
