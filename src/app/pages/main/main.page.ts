import { Component, OnInit } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    protected hrzServerService: HrzServerService,
  ) { }

  ngOnInit() {
    this.hrzServerService.setPortrait();
  }

}
