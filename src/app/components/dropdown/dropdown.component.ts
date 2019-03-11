import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownItem } from 'src/app/interface/universal.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input()
  data: DropdownItem[] = [];
  @Input()
  defaultValue = '';
  @Input()
  header = '';
  @Output()
  selected = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.defaultValue = this.data[0].value;
  }

  onSelect(item: DropdownItem) {
    this.defaultValue = item.value;
    this.selected.emit(item);
  }
}
