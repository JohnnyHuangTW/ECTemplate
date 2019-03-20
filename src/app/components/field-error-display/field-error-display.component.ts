import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnInit {
  @Input()
  displayError: boolean;
  @Input()
  errorMsg: string;

  constructor() {}

  ngOnInit() {}
}
