import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { share } from 'rxjs/operators';
import { APIUrl } from 'src/environments/environment';
import { AlertButton } from '@ionic/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import { ServerResponse } from 'http';

@Injectable({
    providedIn: 'root'
})
export class HrzServerService {
    orientacion: string;
    public url_server = APIUrl;
    private isLoggedIn = false;
    public usuario: Usuario;
    loading: any;
    constructor(
        private http: HttpClient,
        public navCtrl: NavController,
        public loadingController: LoadingController,
        public alertController: AlertController,
        private screenOrientation: ScreenOrientation,
        public toastController: ToastController) {
        this.usuario = new Usuario();
        this.orientacion = this.screenOrientation.type; // logs the current orientation, example: 'landscape'

        // detect orientation changes
        this.screenOrientation.onChange().subscribe(
            () => {
                // this.orientacion = this.screenOrientation.type;
            }
        );
    }

    setLandscape() {
        // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    setPortrait() {
        // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    unlockScreen() {
        // this.screenOrientation.unlock();
    }

    logIn(cedula: string, clave: string): Observable<any> {

        let body = {
            cedula: cedula,
            clave: clave,
        }
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true, //Con esto la sesion se mantiene
            params: body
        };
        const requesUrl = `${this.url_server}/app_checklogin`;
        console.log(requesUrl);
        this.abrirLoading();
        let respObsv = this.http.post(requesUrl, {}, httpOptions).pipe(share())
        // this.abrirLoading()
        respObsv.subscribe((response) => {
            this.cerrarLoading();
            // this.cerrarLoading()
            if (response[0]['estado'] === 'OK') {
                this.isLoggedIn = true;

                this.usuario.nombre = response[0]['nombre_usuario'].toLowerCase();
                this.usuario.mail = response[0]['mail']
                this.usuario.cedula = response[0]['ci']
                this.usuario.idper = response[0]['idper']
            } else {
                this.abrirAdvertencia('Advertencia', 'No se pudo iniciar la sesion', response[0]['estado']);
            }

        }, (error) => {
            // this.cerrarLoading()
            this.cerrarLoading();
            this.abrirAdvertencia('Advertencia', 
                'No se pudo iniciar la sesion', 
                'Error desconocido, asegurese de estar conectado a la red del Hospital Rodriguez Zambrano'
                +error.message+' - '+error.status+' - '+error.statusText+' - '+error.url+' - '+error.ok+' - '+error.name);
            console.log(error);
        },
            () => {
                this.cerrarLoading()
            });
        return respObsv;
    }
    getEstado(): Observable<any> {

        let body = {
            acc: "estado",
        }
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            params: body
        };
        const requesUrl = `${this.url_server}/app_administracion`;
        console.log(requesUrl);
        // return this.http.post(requesUrl,{},httpOptions);


        let respObsv = this.http.post(requesUrl, {}, httpOptions).pipe(share())
        respObsv.subscribe((response) => {
            console.log(response)
            if (response['estado'] === 'DESCONECTADO') {
                this.navCtrl.navigateForward("login");
                this.isLoggedIn = false;
            }
            if (response['estado'] === 'CONECTADO') {
                this.isLoggedIn = true;
                this.usuario.nombre = response['nombre_usuario'].toLowerCase();
                this.usuario.mail = response['mail']
                this.usuario.cedula = response['ci']
                this.usuario.idper = response['idper']
            }
        });
        return respObsv;
    }


    query(body, servlet: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true, //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
            params: body
        };
        const requesUrl = `${this.url_server}/${servlet}`;


        // this.abrirLoading()
        this.abrirLoading();
        let respObsv = this.http.post(requesUrl, {}, httpOptions).pipe(share());
        respObsv.subscribe((resp) => {
            this.cerrarLoading();
            if (resp === 'DESCONECTADO') {
                this.navCtrl.navigateForward("login");
                this.isLoggedIn = false;
            }

        },
            (error) => {
                console.log(error);
                this.cerrarLoading();
            },
            () => {
                this.cerrarLoading();
            });
        return respObsv;


    }
    queryGET(body, servlet: string, contentType = 'application/json'): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': contentType }),
            withCredentials: true, //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
            params: body
        };
        const requesUrl = `${this.url_server}/${servlet}`;

        // this.abrirLoading()
        this.abrirLoading();
        let respObsv = this.http.get(requesUrl, httpOptions).pipe(share())
        respObsv.subscribe((resp) => {
            this.cerrarLoading();
            if (resp === 'DESCONECTADO') {
                this.navCtrl.navigateForward("login");
                this.isLoggedIn = false;
            }

        },
            (error) => {
                console.log(error);
                this.cerrarLoading();
            },
            () => {
                this.cerrarLoading();
            });
        return respObsv;


    }
    authenticated(): boolean {
        return this.isLoggedIn;
    }


    abrirAdvertencia(header: string, subHeader: string, message: string, cssClass?:string, callback?:Function, botonCancelar?:Boolean) {
        if (cssClass == null) {
            cssClass = '';
        }
        let btns:AlertButton[] = []; 
        if(botonCancelar === true){
            btns.push({
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'btn-danger',
                handler: () => {
                }
            });
        }
        btns.push( {
            text: 'Ok',
            handler: (d) => {if (callback) {callback()}}
        })
        const alert = this.alertController.create({
            header: header,
            subHeader: subHeader,
            message: message,
            backdropDismiss: false,
            cssClass: cssClass,
            buttons: btns,
        });
        alert.then(a => { a.present() });
    }

    async abrirMensaje(titulo, mensaje) {
        const toast = await this.toastController.create({
            header: titulo,
            message: mensaje,
            position: 'bottom',
            duration: 2000,
        });
        toast.present();
    }
    loadingAbierto = false;
    abrirLoading() {
        if (this.loadingAbierto) {
            return;
        }
        this.loadingAbierto = true;
        this.loading = this.loadingController.create({
            message: 'Cargando ...',
        });
        this.loading.then(l => {
            l.present();
        });
    }
    cerrarLoading() {

        try {
            if (!this.loadingAbierto) {
                return;
            }
            this.loading.then(l => {
                l.dismiss();
            });
            this.loadingAbierto = false;
        } catch (e) { console.log(e) }
    }
    // export ANDROID_HOME=/home/superuser/Android/Sdk
    // export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
    // ionic cordova run android --device
}
