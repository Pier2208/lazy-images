import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[lazy]',
})
export class LazyDirective implements AfterViewInit {
  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        // each entry corresponds to an image
        entries.forEach((entry) => {
          // when image is visible in the viewport + rootMargin
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            console.log('entering viewport', this.el.nativeElement);
            
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '75%',
      }
    );
    // we tell the observer to watch for this HTML DOM element that we set with
    // the callabck ref earlier
    observer.observe(this.el.nativeElement);
  }
}
