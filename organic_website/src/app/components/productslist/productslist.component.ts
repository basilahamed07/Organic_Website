import { Component } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.css'
})
export class ProductslistComponent {
  isSidebarOpen = false;
  isMenuOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
