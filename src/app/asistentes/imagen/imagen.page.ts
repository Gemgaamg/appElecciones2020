import { Component, OnInit, Input, ViewChild, ɵConsole, ElementRef } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-imagen',
	templateUrl: './imagen.page.html',
	styleUrls: ['./imagen.page.scss'],
})
export class ImagenPage implements OnInit {
	src;
	@ViewChild('slider', {read: ElementRef,static:false}) slider: ElementRef;
	// @ViewChild('slider',{read:ElementRef, static:true}) slider: IonSlides;
	sliderOpts = {
		zoom:{
			maxRatio:3
		}
	}
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		console.log(this.src)
	}

	
	zoom(zoomIn: Boolean){
		let zoom = this.slider.nativeElement.swiper.zoom;
		console.log(zoom)
		if(zoomIn){
			zoom.in();
		}else{
			zoom.out();
		}
	}

	close() {
		this.modalCtrl.dismiss();
	}
	
}