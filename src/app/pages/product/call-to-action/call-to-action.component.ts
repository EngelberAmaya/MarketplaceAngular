import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.css']
})
export class CallToActionComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  call_to_action: Array<any> = [];
  type = '';
	offer:any;

  constructor(private activateRoute: ActivatedRoute,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.obtenerInformacion();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  obtenerInformacion(){
    this.productsService.getFilterProducts("url", this.activateRoute.snapshot.params["param"])
      .pipe(takeUntil(this.unsubscribe$)).subscribe((resp:any) => {
        for (const key in resp) {
          this.call_to_action.push(resp[key]);
          //console.log(this.call_to_action);

            this.call_to_action.forEach(response => {

                let value: any;
  
                if(response.offer != ""){

                  this.type = JSON.parse(response.offer)[0];
			            value = JSON.parse(response.offer)[1];

                  if(this.type == "Disccount"){
  
                    this.offer = (response.price - (response.price * value/100)).toFixed(2)    
                  }    
  
                  if(this.type == "Fixed"){
  
                      this.offer = value;
                   
                  }

                }
            })
         }
      })
  }

}
