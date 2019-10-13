import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  articles;
  constructor(private profile: ProfileService) { }

  ngOnInit() {
    this.profile.getFavArtical(this.profile.username).subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.articles = data['articles'];
      console.log(this.articles);
    });
  }

}
