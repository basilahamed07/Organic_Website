import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss']
})
export class CatagoryComponent implements AfterViewInit {

  public images: string[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.images = [
      'https://i.pinimg.com/736x/d1/80/1b/d1801b8adfbc474a36633d653cc6b577.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg',
      'assets/image4.jpg'
    ];
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    if (isPlatformBrowser(this.platformId)) {
      // GSAP animations
      gsap.from('.welcome-message', {
        duration: 2,
        opacity: 0,
        y: -50,
        stagger: 0.5,
        ease: 'power3.out'
      });

      gsap.to(".gsaplogo", {
        x: "52vw",
        y: "15vh",
        scale: 2.5,
        opacity: 1,
        scrollTrigger: {
          trigger: ".gsaplogo",
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        }
      });

      // const boxes = ['#box-2', '#box-3', '#box-4', '#box-5', '#box-6', '#box-7'];
      // boxes.forEach(id => {
      //   gsap.from(id, {
      //     scale: 0,
      //     width: 120,  // Ensuring GSAP animation reflects updated width
      //     height: 120, // Ensuring GSAP animation reflects updated height
      //     duration: 2,
      //     rotate: 100,
      //     scrollTrigger: {
      //       trigger: id,
      //       scroller: "body",
      //       start: "top 60%",
      //       end: "top 30%",
      //       scrub: 1
      //     }
      //   });
      // });

      gsap.to("#page-2 h1", {
        transform: "translate(-300%)",
        scrollTrigger: {
          trigger: "#page-2 h1",
          scroller: "body",
          start: "top 0%",
          end: "top -150%",
          scrub: 1,
          pin: true
        }
      });

      gsap.to(".sublogo", {
        x: "-52vw",
        y: "15vh",
        scale: 2.5,
        rotate: 360,
        scrollTrigger: {
          trigger: ".sublogo",
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        }
      });
    }
  }
}
