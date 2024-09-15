import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-ourlatestproducts',
  templateUrl: './ourlatestproducts.component.html',
  styleUrl: './ourlatestproducts.component.css'
})
export class OurlatestproductsComponent implements AfterViewInit {


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    if (isPlatformBrowser(this.platformId)){
      gsap.from(".letter", {rotationY: 36, opacity:0, duration: 0.8, yPercent: -100, stagger: 0.1, ease:"expo.out"})
    }
  }

}