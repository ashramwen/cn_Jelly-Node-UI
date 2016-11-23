import { NgModule } from '@angular/core';

import { Draggable } from './components/draggable/draggable.directive';
import { Droppable } from './components/droppable/droppable.directive';
import { DragDataTransferService } from './service.ts/drag-data-transfer.service';

export const DRAG_DROP_DIRECTIVES = [Draggable, Droppable];


@NgModule({
  imports: [],
  exports: [... DRAG_DROP_DIRECTIVES],
  declarations: [... DRAG_DROP_DIRECTIVES],
  providers: [DragDataTransferService],
})
export class DragDropModule { }
