import { Injectable } from '@angular/core';
import { User } from '../authentication/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  user: User = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('jwtToken');
  url = 'https://conduit.productionready.io/api/articles';
  constructor(private httpClient: HttpClient) { }

  publish(tItile: string, dEscription: string, bOdy: string, tagLIsh: string[]) {
    return this.httpClient.post(this.url, {
      article: {
        title: tItile,
        description: dEscription,
        body: bOdy,
        tagLish: tagLIsh
      }
    });
  }
}
