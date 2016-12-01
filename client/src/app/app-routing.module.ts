import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowComponent } from './views/flow/flow.component';
import { FlowDetailComponent } from './views/flow/flow-detail/flow-detail.component';
import { JNEditFormComponent } from './views/node-editor/node-editor.component';
import { NodeEditorModule } from './views/node-editor/node-editor.module';
import { JN_EDITOR_WRAPPED_CONTROLS } from './views/node-editor/components/controls/index';
import { FlowListComponent } from './views/flow/flow-list/flow-list.component';
import { LoginComponent } from './views/flow/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'flow', component: FlowListComponent },
    { path: 'flow/:id', component: FlowDetailComponent },
    // To fix component factory not found issue
    // not best practise...
    // Subject to remove when new solution found
    ... (JN_EDITOR_WRAPPED_CONTROLS.map((component) => {
        return {
            path: 'virtual',
            component: component
        };
    }))
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
