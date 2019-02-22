import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fake-image',
  templateUrl: './fake-image.component.html',
  styleUrls: ['./fake-image.component.scss']
})
export class FakeImageComponent implements OnInit {
  @Input()
  width = '';
  @Input()
  height = '';

  src = '';

  constructor() {}

  ngOnInit() {
    this.src = `https://picsum.photos/${this.height}/${this.width}?random=10`;
    console.log(this.src);
  }
}
