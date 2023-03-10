import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewletterComponent } from './modules/newletter/newletter.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { Ruta404Component } from './pages/ruta404/ruta404.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeFeaturesComponent } from './pages/home/home-features/home-features.component';
import { HomePromotionsComponent } from './pages/home/home-promotions/home-promotions.component';
import { HomeTopCategoriesComponent } from './pages/home/home-top-categories/home-top-categories.component';
import { HomeShowcaseComponent } from './pages/home/home-showcase/home-showcase.component';
import { ProductsBreadcrumbComponent } from './pages/products/products-breadcrumb/products-breadcrumb.component';
import { ProductsShowcaseComponent } from './pages/products/products-showcase/products-showcase.component';
import { BestSalesItemComponent } from './pages/products/best-sales-item/best-sales-item.component';
import { SearchBreadcrumbComponent } from './pages/search/search-breadcrumb/search-breadcrumb.component';
import { SearchShowcaseComponent } from './pages/search/search-showcase/search-showcase.component';
import { CallToActionComponent } from './pages/product/call-to-action/call-to-action.component';
import { ProductBreadcrumbComponent } from './pages/product/product-breadcrumb/product-breadcrumb.component';
import { ProductLeftComponent } from './pages/product/product-left/product-left.component';
import { ProductRightComponent } from './pages/product/product-right/product-right.component';
import { UrlsecurePipe } from './pipes/urlsecure.pipe';
import { BoughtTogetherComponent } from './pages/product/product-left/bought-together/bought-together.component';
import { VendorStoreComponent } from './pages/product/product-left/vendor-store/vendor-store.component';
import { ReviewsComponent } from './pages/product/product-left/reviews/reviews.component';
import { SimilarBoughtComponent } from './pages/product/similar-bought/similar-bought.component';
import { RelatedProductComponent } from './pages/product/related-product/related-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewletterComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    Ruta404Component,
    HomeBannerComponent,
    HomeFeaturesComponent,
    HomePromotionsComponent,
    HomeTopCategoriesComponent,
    HomeShowcaseComponent,
    ProductsBreadcrumbComponent,
    ProductsShowcaseComponent,
    BestSalesItemComponent,
    SearchBreadcrumbComponent,
    SearchShowcaseComponent,
    CallToActionComponent,
    ProductBreadcrumbComponent,
    ProductLeftComponent,
    ProductRightComponent,
    UrlsecurePipe,
    BoughtTogetherComponent,
    VendorStoreComponent,
    ReviewsComponent,
    SimilarBoughtComponent,
    RelatedProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
