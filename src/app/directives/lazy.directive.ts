import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[lazy]',
})
export class LazyDirective implements AfterViewInit {
  constructor(private el: ElementRef<HTMLImageElement>) { }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        // each entry corresponds to an image
        entries.forEach((entry) => {
          // when image is visible in the viewport
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            const src = this.el.nativeElement.getAttribute('data-src')
            if (src)
              this.el.nativeElement.setAttribute('src', src)

            const srcset = this.el.nativeElement.getAttribute('data-srcset')
            if (srcset)
              this.el.nativeElement.setAttribute('srcset', srcset)
          }
        });
      }
    );

    observer.observe(this.el.nativeElement);
  }
}
