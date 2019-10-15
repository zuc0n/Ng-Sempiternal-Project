import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {

  constructor(private profile: ProfileService) { }
  articles;
  ngOnInit() {
    this.profile.getListArtical(this.profile.username).subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.articles = data['articles'];
      console.log(this.articles);
    });
  }

}
