import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './authenticate/authenticate.module#AuthenticatePageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'list-items/:id', loadChildren: './list-items/list-items.module#ListItemsPageModule', canActivate: [AuthGuard] },
  { path: 'newlist', loadChildren: './newlist/newlist.module#NewlistPageModule', canActivate: [AuthGuard] },
  { path: 'newitem/:id', loadChildren: './newitem/newitem.module#NewitemPageModule', canActivate: [AuthGuard] },
  { path: 'editlist/:id', loadChildren: './editlist/editlist.module#EditlistPageModule', canActivate: [AuthGuard] },
  { path: 'edititem/:listid/:id', loadChildren: './edititem/edititem.module#EdititemPageModule', canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
