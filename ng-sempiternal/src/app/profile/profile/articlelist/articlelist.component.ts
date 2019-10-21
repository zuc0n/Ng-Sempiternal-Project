import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { ActivatedRoute } from '@angular/router';
import { Res } from 'src/app/home/home/home.component';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {

  constructor(private profile: ProfileService, private route: ActivatedRoute) { }
  articles;
  ngOnInit() {
    this.route.url.subscribe(data => {
      if (data.length === 2) {
        this.profile.getListArtical(data[1].path).subscribe((res: Res) => {
          console.log(res);

          this.articles = res.articles;
        });
      }
      if (data.length === 3) {
        this.profile.getFavArtical(data[1].path).subscribe((res: Res) => {
          console.log(res);
          this.articles = res.articles;
        });
      }
    });
  }
  handleClick(status, slug, index) {
    this.articles = this.articles.map((item, i) => {
      if (i === index) {
        item.favorited = !item.favorited;
        status ? item.favoritesCount-- : item.favoritesCount++;
      }
      return item;
    });
    status ? this.unfav(slug) : this.fav(slug);
  }
  fav(slug: string) {
    this.profile.favourite(slug).subscribe();
  }
  unfav(slug: string) {
    this.profile.unfavourite(slug).subscribe();
  }
}
