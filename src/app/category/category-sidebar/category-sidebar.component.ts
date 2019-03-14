import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CategoryInfo } from 'src/app/interface/ec-template.interface';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent implements OnInit {
  categoryList: CategoryInfo[];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.categoryList$.subscribe((data: CategoryInfo[]) => {
      this.categoryList = data;
    });
  }
}
