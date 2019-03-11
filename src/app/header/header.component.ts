import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MenuInfo } from '../interface/ec-template.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuList: MenuInfo[] = [];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.menuList$.subscribe(data => {
      this.menuList = data;
    });
  }
}
