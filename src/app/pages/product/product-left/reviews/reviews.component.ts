import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Rating, DinamicRating, DinamicReviews } from '../../../../functions';
declare var $:any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() childItem: any;
  rating: Array<any> = [];
  reviews: Array<any> = [];
  render = true;
  totalReviews = 0;

  constructor() { }

  ngOnInit(): void {
    this.obtenerInformacion();
  }

  obtenerInformacion(){
    this.rating.push(DinamicRating.fnc(this.childItem));    
    let reviews:any = [];
    reviews.push(DinamicReviews.fnc(this.rating[0]));

    for(let i = 0; i < 5; i++){
      $(".reviewsOption").append(`<option value="${reviews[0][i]}">${i+1}</option>`)
    }

    this.totalReviews = JSON.parse(this.childItem["reviews"]).length;

    Rating.fnc();
  }

  callback(){
    if(this.render){

			this.render = false;
    }
  }

}
