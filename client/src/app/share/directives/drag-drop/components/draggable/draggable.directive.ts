import {
    Directive, ElementRef, HostListener, Input,
    Output, EventEmitter, AfterViewInit,
    Attribute
} from '@angular/core';

@Directive({
    selector: '[draggable]',
    inputs: ['draggable'],
    host: {
        '[draggable]': 'true'
        // '[stype.user-drag]': ''
    }
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class Draggable implements AfterViewInit {

    @Input() disabled: boolean;
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event. 
     */
    @Input() dragData;

    /**
     * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element. 
     */
    @Input() dragHandle: string;

    /**
     * Currently not used
     */
    @Input() dragEffect = 'move';

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dragScope: string = 'default';

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Event fired when Drag is started
     */
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired while the element is being dragged
     */
    @Output() onDrag: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when dragged ends
     */
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
    
    private mouseOverElement: any;

    constructor(private ele: ElementRef) {}

    ngAfterViewInit() {
        this.ele.nativeElement.addEventListener('dragstart', this.dragStart.bind(this));
        this.ele.nativeElement.addEventListener('drag', this.drag.bind(this));
        this.ele.nativeElement.addEventListener('dragend', this.dragEnd.bind(this));
    }


    dragStart(e: DragEvent) {
        if (this.allowDrag()) {
            literate(<Element>e.target);
            setTimeout(() => {
                recover(<Element>e.target);
            });

            (<Element>e.target).classList.add(this.dragOverClass);
            e.dataTransfer.setData('application/json', JSON.stringify(this.dragData));
            e.dataTransfer.setData(this.dragScope, this.dragScope);
            e.dataTransfer.setData('offset', JSON.stringify({ x: e.offsetX, y: e.offsetY }));
            e.stopPropagation();
            this.onDragStart.emit(e);
        } else {
            e.preventDefault();
        }

        function literate(ele: Element) {
            let style = ele.getAttribute('style') || '';
            ele.setAttribute('style', style + ' background-color: transparent;');
            if (ele.parentElement) {
                literate(ele.parentElement);
            }
        }

        function recover(ele: Element) {
            let style = ele.getAttribute('style');
            ele.setAttribute('style', style.substr(0, style.lastIndexOf('background-color: transparent;')));
            if (ele.parentElement) {
                recover(ele.parentElement);
            }
        }
    }

    // @HostListener('drag', ['$event'])
    drag(e) {
        this.onDrag.emit(e);
    }

    // @HostListener('dragend', ['$event'])
    dragEnd(e) {
        e.target.classList.remove(this.dragOverClass);
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }

    @HostListener('mouseover', ['$event'])
    mouseover(e) {
        this.mouseOverElement = e.target;
    }

    private allowDrag() {
        if (this.disabled) {
            return false;
        }
        if (this.dragHandle) {
            return this.mouseOverElement.matches(this.dragHandle);
        } else {
            return true;
        }
    }
}
