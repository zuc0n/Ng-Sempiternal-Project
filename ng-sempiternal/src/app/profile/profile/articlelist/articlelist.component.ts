import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { ActivatedRoute } from '@angular/router';

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
      if(data.length === 2) {
        this.profile.getListArtical(data[1].path).subscribe(res => {
          // tslint:disable-next-line:no-string-literal
          this.articles = res['articles'];
        });
      };
      if(data.length ===3) {
        this.profile.getFavArtical(data[1].path).subscribe(res => {
          this.articles = res['articles'];
        })
      }
    })
  }

}
