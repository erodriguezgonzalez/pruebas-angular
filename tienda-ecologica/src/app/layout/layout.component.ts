import { Component,ViewChild} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent {
  constructor(public appService:AppService) {}
}
 
