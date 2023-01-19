import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-vendor-store',
  templateUrl: './vendor-store.component.html',
  styleUrls: ['./vendor-store.component.css']
})
export class VendorStoreComponent implements OnInit, OnDestroy {

  @Input() childItem:any;
	store: Array<any> = [];
  unsubscribe$ = new Subject();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.obtenerInformacion();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  obtenerInformacion(){
    this.storeService.getFilterStores("store", this.childItem).pipe(takeUntil(this.unsubscribe$))
  		.subscribe( resp => {	
  			
  			for(const i in resp){

  				this.store.push(resp[i])
  			
  			}

  		})
  }

}
