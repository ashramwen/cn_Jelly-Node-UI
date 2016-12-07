import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowComponent } from './views/flow/flow.component';
import { FlowDetailComponent } from './views/flow/flow-detail/flow-detail.component';
import { FlowListComponent } from './views/flow/flow-list/flow-list.component';
import { LoginComponent } from './views/flow/login/login.component';

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
