import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWithoutGuard } from '../core/guards/auth-without.guard';
import { AuthWithGuard } from '../core/guards/auth-with.guard';
import { GuardsService } from '../core/services/guards.service';

const routes: Routes = [
  {
    path: "autenticacion",
    canActivate: [()=>inject(GuardsService).canActivateLogin()], // El guard no permite ingresar a paginas de logueo si ya se autentico
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },
  {
    path: "portafolio",
    canActivate: [AuthWithoutGuard], // El guard de auth creado no permite ingresar, funciona de seguridad
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  },
  {
    path: "admin",
    canActivate: [(()=>inject(GuardsService).canActiveWithRolAdmin())], 
    loadChildren: () => import("./admin/admin.module").then(a => a.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
