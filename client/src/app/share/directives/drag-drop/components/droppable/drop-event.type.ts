export class DropEvent {
    nativeEvent: any;
    dragData: any;
    offset: {
        x: number;
        y: number;
    };

    constructor(event: any, data: any, offset?) {
        this.nativeEvent = event;
        this.dragData = data;
        this.offset = offset;
    }
}
