import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowComponent } from './views/flow/flow.component';
import { FlowDetailComponent } from './views/flow/flow-detail/flow-detail.component';
import { JNEditFormComponent } from './views/node-editor/node-editor.component';
import { TestComponent } from './views/test/test.component';

const routes: Routes = [
    { path: '', redirectTo: '/flow/1', pathMatch: 'full' },
    // { path: '', redirectTo: '/test', pathMatch: 'full' },
    { path: 'flow', component: FlowComponent },
    { path: 'flow/:id', component: FlowDetailComponent },
    { path: 'editor', component: JNEditFormComponent },
    { path: 'test', component: TestComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
