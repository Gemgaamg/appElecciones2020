import { Component, OnInit } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';

import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { APIUrl } from 'src/environments/environment';
const { Camera } = Plugins;

@Component({
  selector: 'app-main',
  templateUrl: './ingreso_acta.page.html',
  styleUrls: ['./ingreso_acta.page.scss'],
})
export class IngresoActaPage implements OnInit {
  constructor(
    protected hrzServerService: HrzServerService,
    private sqlite: SQLite,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }
  async testStoragePlugin() { ////En un futuro que se use una base de datos
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table danceMoves(name VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  } 
  ngOnInit() {
    // this.hrzServerService.setPortrait();
    this.obtenerCantonLista();
  }

  cantonLista = [];
  cantonSeleccionado:any;

  parroquiaLista = [];
  parroquiaSeleccionado:any;

  recintoLista = [];
  recintoSeleccionado:any;


  mesaLista = [];
  mesaSeleccionado:any;

  obtenerCantonLista() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "obtenerCantonLista",
		}, 'catalogo');
		r.subscribe(
			(s) => {
				// console.log(s)
				self.cantonLista = (s);
				console.log(this.cantonLista)
			});
  }
  obtenerParroquiaLista() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "obtenerParroquiaLista",
			idcanton: this.cantonSeleccionado.idcanton,
		}, 'catalogo');
		r.subscribe(
			(s) => {
				// console.log(s)
				self.parroquiaLista = (s);
				console.log(self.parroquiaLista)
			});
  }
  obtenerRecintoLista() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "obtenerRecintoLista",
			idparroquia: this.parroquiaSeleccionado.idparroquia,
		}, 'catalogo');
		r.subscribe(
			(s) => {
				// console.log(s)
				self.recintoLista = (s);
				console.log(self.recintoLista)
			});
  }
  obtenerMesaLista() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "obtenerMesaLista",
			idrecinto: this.recintoSeleccionado.idrecinto,
		}, 'catalogo');
		r.subscribe(
			(s) => {
				// console.log(s)
				self.mesaLista = (s);
				console.log(self.mesaLista)
			});
	}
  
  cantonRefreshed = true;
  seleccionarCanton(){
    console.log(this.cantonSeleccionado)
    this.parroquiaLista = [];
    this.recintoLista = [];
    this.mesaLista = [];

    this.parroquiaSeleccionado = null;
    this.recintoSeleccionado = null;
    this.mesaSeleccionado = null;
    this.obtenerParroquiaLista();
    this.cantonRefreshed = false;
    setTimeout(()=>{
        this.cantonRefreshed = true;
    })
  }
  parroquiaRefreshed = true;
  seleccionarParroquia(){
    console.log(this.parroquiaSeleccionado)
    this.recintoLista = [];
    this.mesaLista = [];
    this.recintoSeleccionado = null;
    this.mesaSeleccionado = null;
    this.obtenerRecintoLista();
    this.parroquiaRefreshed = false;
    setTimeout(()=>{
        this.parroquiaRefreshed = true;
    })
  }
  recintoRefreshed =true;
  seleccionarRecinto(){
    console.log(this.recintoSeleccionado)
    this.mesaLista = [];
    this.mesaSeleccionado = null;
    this.obtenerMesaLista();
    this.recintoRefreshed = false;
    setTimeout(()=>{
        this.recintoRefreshed = true;
    })
  }
  seleccionarMesa(){
    console.log(this.mesaSeleccionado)
  }



  acta_0: String = null;
  acta_1: String = null;
  acta_2: String = null;
  // async capturarActa(){
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     source:CameraSource.Camera,
  //     resultType: CameraResultType.Base64
  //   });
  //   if(this.acta_0==null){
  //     this.acta_0 = image.base64String;
  //   }else if(this.acta_1==null){
  //     this.acta_1 = image.base64String;
  //   }else if(this.acta_2==null){
  //     this.acta_2 = image.base64String;
  //   }
    
  //   // imageElement.src = imageUrl;
  // }

  async capturarActa(acta){
    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      // source:CameraSource.Camera,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera 

      
    });
    console.log(image.dataUrl);
    this[acta] = image.dataUrl;
  }
  
  async readFile(base64,callback: Function) {
    const fd = new FormData();
    await fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "filename.jpeg");
      callback(file);
    });
  }
    //   fd.append('acta_0', file)
      
    // // Let's upload the file
    // // Don't set contentType manually → https://github.com/github/fetch/issues/505#issuecomment-293064470
    // const API_URL = 'https://example.com/add_image'
    // fetch(API_URL, {method: 'POST', body: fd)
    // .then(res => res.json()) 
    // .then(res => console.log(res))



    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   const imgBlob = new Blob([reader.result], {
    //     type: file.type
    //   });
    //   const formData = new FormData();
    //   formData.append('idcanton', 'Hello');
    //   formData.append('idparroquia', 'Hello');
    //   formData.append('idrecinto', 'Hello');
    //   formData.append('idmesa', 'a');
    //   formData.append('accion', 'Hello');
    //   formData.append('acta_0', imgBlob, file.name);
    //   formData.append('acta_1', imgBlob, file.name);
    //   formData.append('acta_2', imgBlob, file.name);
    //   this.uploadFile(formData).subscribe(dataRes => {
    //     console.log(dataRes);
    //   });
    // };
    // reader.readAsArrayBuffer(file);
  // }
  uploadFile(formData) {
    return this.http.post(APIUrl+'/recepcionImagen', formData);
  }
  enviarActa(){
    if( this.cantonSeleccionado ==null ||
      this.parroquiaSeleccionado==null || 
      this.recintoSeleccionado  ==null || 
      this.mesaSeleccionado     ==null){
        this.hrzServerService.abrirAdvertencia(null,
					'Advertencia',
					"Debe escoger todos los datos(canton,parroquia,recinto,mesa)");
				return;
    }

    if( this.acta_0 ==null || this.acta_1==null || this.acta_2  ==null){
        this.hrzServerService.abrirAdvertencia(null,
					'Advertencia',
					"Debe tomar 3 capturas de la acta");
				return;
    }
    this.hrzServerService.abrirLoading();
    
    this.readFile(this.acta_0, (file1)=>{
      this.readFile(this.acta_1, (file2)=>{
        this.readFile(this.acta_2, (file3)=>{
          let formData = new FormData();
          formData.append('idcanton', this.cantonSeleccionado.idcanton);
          formData.append('idparroquia', this.parroquiaSeleccionado.idparroquia);
          formData.append('idrecinto', this.recintoSeleccionado.idrecinto);
          formData.append('idmesa', this.mesaSeleccionado.idmesa);
          formData.append('accion', 'Hello');
          formData.append('acta_0', file1, file1.name);
          formData.append('acta_1', file2, file2.name);
          formData.append('acta_2', file3, file3.name);
          // this.http
          //   .post(
          //       url,
          //       formData,
          //       httpOptions).subscribe(dataRes => {
          //         console.log(dataRes);
          //       });
          this.uploadFile(formData).subscribe(dataRes => {
           
                  this.hrzServerService.cerrarLoading();

                  console.log(dataRes);
                  if(dataRes['estado'] == 'OK'){
                    this.hrzServerService.abrirAdvertencia(null,
                      'Bien',
                      "Se subio el acta");
                  }else{
                    this.hrzServerService.abrirAdvertencia(null,
                      'Advertencia',
                      dataRes['estado']);
                  }
              });
        });
      });
    });



    // this.hrzServerService.abrirAdvertencia(null,
    //   'Advertencia',
    //   "Todo belen, debe enviarse al servidor la informacion");

  }
}

////// en el servidor la carpeta esta en  opt/cr