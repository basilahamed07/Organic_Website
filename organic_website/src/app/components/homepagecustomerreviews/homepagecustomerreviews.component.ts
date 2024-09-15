import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { gsap } from "gsap";
  import { Flip } from 'gsap/Flip';
@Component({
  selector: 'app-homepagecustomerreviews',
  templateUrl: './homepagecustomerreviews.component.html',
  styleUrl: './homepagecustomerreviews.component.css'
})
export class HomepagecustomerreviewsComponent   {
  // private layouts = ["final", "plain", "columns", "grid"];
  // private curLayout = 0;
  // private intervalId: any;

  // ngOnInit() {
  //   // Initialization code if needed
  // }

  // ngAfterViewInit() {
  //   this.startAnimation();
  // }

  // ngOnDestroy() {
  //   if (this.intervalId) {
  //     clearTimeout(this.intervalId);
  //   }
  // }

  // private startAnimation() {
  //   this.nextState();
  // }

  // private nextState() {
  //   const state: GSAPFlipState = Flip.getState(".letter, .for, .gsap", {props: "color,backgroundColor", simple: true}); // capture current state
  //   const container = document.querySelector(".container");

  //   if (container) {
  //     container.classList.remove(this.layouts[this.curLayout]); // remove old class
  //     this.curLayout = (this.curLayout + 1) % this.layouts.length;   // increment (loop back to the start if at the end)
  //     container.classList.add(this.layouts[this.curLayout]);    // add the new class

  //     Flip.from(state, { // animate from the previous state
  //       absolute: true,
  //       stagger: 0.07,
  //       duration: 0.7,
  //       ease: "power2.inOut",
  //       spin: this.curLayout === 0, // only spin when going to the "final" layout
  //       simple: true,
  //       onEnter: (elements: HTMLElement[], animation: gsap.core.Animation) => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, delay: animation.duration() - 0.1}),
  //       onLeave: (elements: HTMLElement[]) => gsap.to(elements, {opacity: 0})
  //     });

  //     this.intervalId = setTimeout(() => this.nextState(), this.curLayout === 0 ? 3500 : 1500);
  //   }
  // }
}
