import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CategoryInfo } from '../interface/ec-template.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categoryList: CategoryInfo[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCategoryList().subscribe((data: CategoryInfo[]) => {
      this.categoryList = data;
    });
  }
}
