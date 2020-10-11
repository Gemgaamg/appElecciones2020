import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-cntbofarma',
  templateUrl: './cntbofarma.page.html',
  styleUrls: ['./cntbofarma.page.scss'],
})
export class CntbofarmaPage implements OnInit {
  nombre_producto: string = '';
  offset:number=0;
  medicamentos: any;
  tiempo: Date;
  constructor(protected hrzServerService: HrzServerService) { }
  @ViewChild('contenedor', { static: true }) content: IonContent;
  ngAfterViewInit(){
    this.tiempo = new Date();
    this.content.ionScroll.subscribe((event)=>{
      event.srcElement.getScrollElement().then((element: HTMLElement) => {
        if(element.scrollHeight -(element.scrollTop+event.srcElement.scrollHeight)<50 ){
          // element.scrollTop = element.scrollTop-5;
          this.cargar10Mas();
        }
        
      });
    });
  }
  ngOnInit() {
    this.hrzServerService.setPortrait();
  }
  nombre_producto_change(){
    this.nombre_producto = this.nombre_producto.replace(/[^a-zA-Z0-9%]/gi,'');
  }
  buscarNuevoProducto(){
    this.content.scrollToTop();
    this.offset = 0;
    console.log("este es el nuevo offset "+ this.offset)
    this.buscarProductos();
  }
  buscarProductos(){
    var self = this;
    let r = this.hrzServerService.query({
      acc:"get_productos_disponibles_farmacia",
      nombre_producto:this.nombre_producto,
      offset:this.offset,
    },'app/bodega');
    r.subscribe(
      (productos) => {
        if(self.offset ==0){
          this.medicamentos = productos;
          console.log(productos)
          console.log("carga inicial")
        }else{
          this.medicamentos = this.medicamentos.concat(productos);
          console.log("carga numero"+this.offset);
        }

      });
  }
  limpiarBuscador(){
    this.nombre_producto="";
    this.offset = 0;
    this.buscarProductos();
    this.content.scrollToTop();
  }
  cargar10Mas(){


    if(this.tiempo.getSeconds() != new Date().getSeconds()){
      this.tiempo = new Date();
      this.offset = this.offset +1;
      this.buscarProductos();
    
    }
    
  }

  
}
