import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProductInfo } from 'src/app/interface/ec-template.interface';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  data: ProductInfo;
  quantity = 1;
  relatedProducts: ProductInfo[] = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data = this.dataService.getProductById(params['id']);

      this.getRelatedProducts();
      this.scrollToTop();

      this.galleryImages = [];
      // insert main image
      this.galleryImages.push({ small: this.data.img, medium: this.data.img, big: this.data.img });
      // insert gallery images
      for (const img of this.data.gallery) {
        this.galleryImages.push({ small: img, medium: img, big: img });
      }
    });

    this.galleryOptions = [
      // refer to https://github.com/lukasz-galka/ngx-gallery
      // RWD settings
      {
        width: '100%',
        height: '300px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 768,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  getRelatedProducts() {
    this.relatedProducts = this.dataService.getRelatedProductsByCategory(
      this.data.id,
      this.data.category,
      4
    );
  }
  dropdownOnChange(event: string) {
    console.log('dropdown value', event);
  }

  quantityOnChange(event: number) {
    console.log('quantity value', event);
    this.quantity = event;
  }

  addToCart() {
    this.dataService.addShoppingCartItem({
      product: this.data,
      quantity: this.quantity
    });
    this.notifierService.notify('default', `Add ${this.data.name} to cart!`);
  }

  scrollToTop() {
    window.scroll(0, 0);
  }
}
