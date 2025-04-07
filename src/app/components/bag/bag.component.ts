import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../../services/pokeapi.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {

  categories = [
    { name: 'all', display: 'ALL ITEMS' },
    { name: 'stat-boosts', display: 'STAT BOOSTS' },
    { name: 'medicine', display: 'MEDICINE' },
    { name: 'other', display: 'OTHER' },
    { name: 'evolution', display: 'EVOLUTION' },
    { name: 'held-items', display: 'HELD ITEMS' },
    { name: 'choice', display: 'CHOICE' },
  ];

  selectedCategory = 'all';
  allItems: any[] = [];
  filteredItems: any[] = [];
  selectedItem: any = null;
  isLoading = true;

  constructor(private pokeApi: PokeApiService) {}

  async ngOnInit() {
    await this.loadItemCategories();
    this.isLoading = false;
  }

  async loadItemCategories() {
    try {
  
      const categoriesResponse = await firstValueFrom(
        this.pokeApi.getItemCategories(50)
      );
  
      const categoryRequests = categoriesResponse.results.map((category: any) => 
        firstValueFrom(this.pokeApi.getItemCategory(category.name))
      );
      
      const categories = await Promise.all(categoryRequests);
      

      const itemRequests: Promise<any>[] = [];
      
      categories.forEach(category => {
        category.items.forEach((item: any) => {
          const itemId = item.url.split('/').slice(-2, -1)[0];
          itemRequests.push(
            firstValueFrom(this.pokeApi.getItem(+itemId)).catch(() => null)
          );
        });
      });
      
      const items = await Promise.all(itemRequests);
      this.allItems = items.filter(item => item !== null);
      this.filteredItems = [...this.allItems];
      
      if (this.allItems.length > 0) {
        this.selectedItem = this.allItems[0];
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredItems = [...this.allItems];
      return;
    }

    this.filteredItems = this.allItems.filter(item => {
      return item.category.name === category;
    });

    if (!this.filteredItems.includes(this.selectedItem)) {
      this.selectedItem = this.filteredItems[0] || null;
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  getItemQuantity(itemName: string): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  getDescription(item: any): string {
    if (!item) return '';
    
    const englishEntry = item.flavor_text_entries?.find(
      (entry: any) => entry.language.name === 'en'
    );
    
    return englishEntry?.text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || 'No description available';
  }

  getFormattedItemName(name: string): string {
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}