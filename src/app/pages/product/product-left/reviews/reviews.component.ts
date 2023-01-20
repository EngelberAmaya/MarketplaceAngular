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
  itemReviews: Array<any> = [];
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
    
    Rating.fnc();

    this.totalReviews = JSON.parse(this.childItem["reviews"]).length;

    let arrayReview:any = []; 

    JSON.parse(this.childItem["reviews"]).forEach((rev:any) =>{

       	arrayReview.push(rev.review)
        	
    })

    arrayReview.sort();

	  let objectStar = {
	    	"1":0,
	    	"2":0,
	    	"3":0,
	    	"4":0,
	    	"5":0
	  }

    arrayReview.forEach((value: any, index: number, arr) => {

      let first_index = arr.indexOf(value);
      let last_index = arr.lastIndexOf(value);

      if(first_index != last_index){
        objectStar[value] += 1
        //console.log(objectStar);

      } else {
        objectStar[value] += 1        
      }

    })

    for(let i = 5; i > 0; i--){

      //Hacemos una regla de 3: la cantidad que suma cada estella multiplicado por 100 dividido la cantidad de calificaciones
      let starPercentage = Math.round((objectStar[i] * 100)/ arrayReview.length)
      
      $(".ps-block--average-rating").append(`
      
          <div class="ps-block__star">
    
                  <span>${i} Star</span>
    
                    <div class="ps-progress" data-value="${starPercentage}">
    
                      <span></span>
    
                    </div>
    
                    <span>${starPercentage}%</span>

          </div>

      `)

    }

    this.itemReviews.push(JSON.parse(this.childItem["reviews"]));
    
  }

  callback(){
    if(this.render){

			this.render = false;
      let reviews = $("[reviews]");

      for (let key = 0; key < reviews.length; key++) {
        
        for(let i = 0; i < 5; i++){
  
          $(reviews[key]).append(`
            <option value="2">${i+1}</option>
          `)
  
          if($(reviews[key]).attr("reviews") == (i+1)){
            $(reviews[key]).children("option").val(1)
          }
        }
      }
      
      Rating.fnc();
    }
  }

}
