import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.css']
})
export class ProductBreadcrumbComponent implements OnInit {

  breadcrumb= '';

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.breadcrumb = this.activateRoute.snapshot.params["param"].replace(/[-]/g, " ");
  }

}
