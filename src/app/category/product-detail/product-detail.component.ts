import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProductInfo } from 'src/app/interface/ec-template.interface';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  data: ProductInfo;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data = this.dataService.getProductById(params['id']);
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
      {
        width: '100%',
        height: '300px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
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
}
