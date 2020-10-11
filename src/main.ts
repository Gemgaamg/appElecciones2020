import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

//export ANDROID_HOME=/home/superuser/Android/Sdk
//export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
//---------------------------------------------------ionic cordova run android --device
// ionic capacitor run android
//ng run app:serve --poll=2000
//home/superuser/Android/Sdk/platform-tools/adb devices -l

// ng build --prod
// npx cap copy
// npx cap open android



//  ng build --prod ; npx cap copy ; npx cap open android
