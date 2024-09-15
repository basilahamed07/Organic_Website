import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component,Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faInstagram, faFacebook, faTwitter, faSnapchat } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isMenuOpen = false;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faSnapchat = faSnapchat;


  constructor(){
    sessionStorage.clear()
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
