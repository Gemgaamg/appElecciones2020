import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  // { path: 'solicitud-info', loadChildren: './pages/emergencia/interconsulta/respuesta_interconsulta/solicitud-info/solicitud-info.module#SolicitudInfoPageModule' },
  // { path: 'cntbofarma', loadChildren: './pages/bodega/cntbofarma/cntbofarma.module#CntbofarmaPageModule' },
  // { path: 'cntbofarma', loadChildren: './pages/cntbofarma/cntbofarma.module#CNTBOFARMAPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
