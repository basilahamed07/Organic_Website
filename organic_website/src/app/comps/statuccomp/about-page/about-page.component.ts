  import { isPlatformBrowser } from '@angular/common';
  import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  @Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.css'
  })
  export class AboutPAgeComponent implements AfterViewInit {


    public images: string[] = [];



    constructor(@Inject(PLATFORM_ID) private platformId: Object) {

      this.images = [
        'https://i.pinimg.com/736x/d1/80/1b/d1801b8adfbc474a36633d653cc6b577.jpg',
        'assets/image2.jpg',
        'assets/image3.jpg',
        'assets/image4.jpg'
        // Add as many image URLs as needed
      ];

    }

    ngAfterViewInit(): void {

      // --------- here old code -------
      gsap.registerPlugin(ScrollTrigger);

      if (isPlatformBrowser(this.platformId)) {  
        
        gsap.to(".gsaplogo", {
          x: "52vw",
          y: "15vh",
          scale: 2.5,
          opacity: 1,
          scrollTrigger: {
            trigger: ".gsaplogo",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        });




  // for spin the box 
        gsap.from("#box-2", {
          scale: 0,
          duration: 2,
          rotation: "-170_short",
          rotationX: "-=30_cw",
          rotationY: "1.5rad_ccw",
          scrollTrigger: {
              trigger: "#box-2",
              scroller: "body",
              // markers: true,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
          }
      });


        
  // for spin the box 
        gsap.from("#box-3", {
          scale: 0,
          duration: 2,
          rotate: 100,
          scrollTrigger: {
              trigger: "#box-3",
              scroller: "body",
              // markers: true,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
          }
      });


        
  // for spin the box 
        gsap.from("#box-4", {
          scale: 0,
          duration: 2,
          rotate: 100,
          scrollTrigger: {
              trigger: "#box-4",
              scroller: "body",
              // markers: true,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
          }
      });


        
  // for spin the box 
        gsap.from("#box-5", {
          scale: 0,
          duration: 2,
          // rotate: 100,
          rotation: "-170_short",
          rotationX: "-=30_cw",
          rotationY: "1.5rad_ccw",
          scrollTrigger: {
              trigger: "#box-5",
              scroller: "body",
              // markers: true,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
          }
      });


        
  // for spin the box 
        gsap.from("#box-6", {
          scale: 0,
          duration: 2,
          rotate: 100,
          scrollTrigger: {
              trigger: "#box-6",
              scroller: "body",
              // markers: true,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
          }
      });


        
  // for spin the box 
        gsap.from("#box-7", {
          scale: 0,
          duration: 2,
          rotate: 100,
          scrollTrigger: {
              trigger: "#box-7",
              scroller: "body",
              // markers: true,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
          }
      });

    
      // ---end of the content----


        

        gsap.from("#heading", {
          color: "blue",
          opacity: 0,
          y: 40,
          duration: 1.5,
          delay: 0.5,
          stagger: 0.5,
          // repeat: -1,
          yoyo: true,
      })



      // scrool trigger

      gsap.to("#page-2 h1", {
        transform: "translate(-300%)",
        scrollTrigger: {
            trigger: "#page-2 h1",
            scroller: "body",
            // markers: true,
            start: "top 0%",
            end: "top -150%",
            scrub: 1,
            pin: true,
        }
    })


        gsap.to(".sublogo", {
          x: "-52vw",
          y: "15vh",
          scale: 2.5,
          rotate: 360,
          scrollTrigger: {
            trigger: ".sublogo",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        });
      }

    }
  }