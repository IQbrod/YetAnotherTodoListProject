import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'list-items/:id', loadChildren: './list-items/list-items.module#ListItemsPageModule' },
  { path: 'newlist', loadChildren: './newlist/newlist.module#NewlistPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
