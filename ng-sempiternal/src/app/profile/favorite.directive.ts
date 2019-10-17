import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective {
  @Input() favourite: string;
  constructor(private eleRef: ElementRef) {
  }
  @HostListener('click') changeColor() {
    if (this.favourite === 'true') {
      this.eleRef.nativeElement.classList.remove('favorite');
      this.favourite = 'false';
      // tslint:disable-next-line:max-line-length
      this.eleRef.nativeElement.innerHTML = '<i _ngcontent-nyj-c4="" class="ion-heart"></i> ' + (parseInt(this.eleRef.nativeElement.innerText, 10) - 1);
    } else if (this.favourite === 'false') {
      this.eleRef.nativeElement.classList.add('favorite');
      this.favourite = 'true';
      // tslint:disable-next-line:max-line-length
      this.eleRef.nativeElement.innerHTML = '<i _ngcontent-nyj-c4="" class="ion-heart"></i> ' + (parseInt(this.eleRef.nativeElement.innerText, 10) + 1);
    }
  }
}
