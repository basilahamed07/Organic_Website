import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-hover',
  templateUrl: './hover.component.html',
  styleUrl: './hover.component.css'
})
export class HoverComponent implements AfterViewInit {

  private lerp(x: number, y: number, a: number): number {
    return x * (1 - a) + y * a;
  }

  ngAfterViewInit(): void {
    const circle = document.querySelector('.circle') as HTMLElement;
    const frames = document.querySelectorAll('.frame') as NodeListOf<HTMLElement>;

    frames.forEach((frame: HTMLElement) => {
      frame.addEventListener('mousemove', (event: MouseEvent) => {
        const dim = frame.getBoundingClientRect();
        const xStart = dim.x;
        const xEnd = dim.x + dim.width;
        const boxZoneZeroOrOne = gsap.utils.mapRange(
          xStart,
          xEnd,
          0,
          1,
          event.clientX
        );

        gsap.to(circle, {
          scale: 8,
        });

        gsap.to(frame.children, {
          color: '#fff',
          duration: 0.4,
          y: '-5vw',
        });

        gsap.to(frame.children, {
          x: this.lerp(-50, 50, boxZoneZeroOrOne),
          duration: 0.3,
        });
      });

      frame.addEventListener('mouseleave', () => {
        gsap.to(circle, {
          scale: 1,
        });
        gsap.to(frame.children, {
          color: '#000',
          duration: 0.4,
          y: 0,
        });
        gsap.to(frame.children, {
          x: 0,
          duration: 0.3,
        });
      });
    });

    window.addEventListener('mousemove', (event: MouseEvent) => {
      gsap.to(circle, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.2,
        ease: 'expo.inOut',
      });
    });
  }
}