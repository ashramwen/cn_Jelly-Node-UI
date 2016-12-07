import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './externals/components/login/login.component';
import { FlowListComponent } from './externals/components/flow-list/flow-list.component';
import { FlowDetailComponent } from './externals/components/flow-detail/flow-detail.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'flow', component: FlowListComponent },
    { path: 'flow/:id', component: FlowDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
