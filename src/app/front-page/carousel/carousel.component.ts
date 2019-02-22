import { Component, OnInit } from '@angular/core';
import { CarouselInfo } from 'src/app/interface/ec-template.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  data: CarouselInfo[] = [
    {
      title: 'Carousel Title',
      description: 'Carousel Description',
      img: 'https://picsum.photos/2800/700?random=9',
      button: { content: 'button content', href: '#' }
    },
    {
      title: 'Carousel Title',
      description: 'Carousel Description',
      img: 'https://picsum.photos/2800/700?random=10',
      button: { content: 'button content', href: '#' }
    },
    {
      title: 'Carousel Title',
      description: 'Carousel Description',
      img: 'https://picsum.photos/2800/700?random=11',
      button: { content: 'button content', href: '#' }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
