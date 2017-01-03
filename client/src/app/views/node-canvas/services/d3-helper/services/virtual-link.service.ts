import { CanvasNode } from '../models/canvas-node.type';
import { JNDropEvent } from '../../../../../share/directives/drag-drop/components/droppable/drop-event.type';
import { JNDragEvent } from '../../../../../share/directives/drag-drop/components/draggable/drag-event.type';
import { JNPaletteNode } from '../../../../palette/interfaces/palette-node.type';
import { D3HelperService } from '../d3-helper.service';
import { NodeSettings } from '../../../../providers/constants';

export class VirtualLinkService{

  static factory(canvas: D3HelperService) {
    return new VirtualLinkService(canvas);
  }

  constructor(private canvas: D3HelperService) {
    
  }

  public examVirtualLink(target: CanvasNode, e: JNDragEvent | JNDropEvent) {
    let NodeSettings = this.canvas.NodeSettings;
    let ele: Element = <Element>e.nativeEvent.target;
    let data: JNPaletteNode = e.dragData;
    let scale = this.canvas.currentScale;
    let canvasWrapper = this.canvas.canvasWrapper.node();
    let accept: boolean = false;

    let virtualObject = {
      width: (ele.clientWidth + NodeSettings.HANDLER_WIDTH) /scale,
      left: (e.nativeEvent.clientX + canvasWrapper.scrollLeft
        - e.offset.x - canvasWrapper.getClientRects()[0].left - NodeSettings.HANDLER_WIDTH / 2) / scale,
      y: (ele.clientHeight / 2 + canvasWrapper.scrollTop
        + e.nativeEvent.clientY - e.offset.y - canvasWrapper.getClientRects()[0].top) / scale,
      acceptable: data.acceptable,
      directable: data.directable
    };

    
    let midPoint1 = {
      x: target.position.x + target.width / 2,
      y: target.position.y + target.height / 2
    };

    let midPoint2 = {
      x: virtualObject.left + virtualObject.width / 2,
      y: virtualObject.y
    };

    let linkData = null;
    let acceptLinkData = {
      source: {
        x: target.position.x + target.width,
        y: midPoint1.y
      },
      target: {
        x: virtualObject.left,
        y: virtualObject.y
      }
    };
    let directLinkData = {
      target: {
        x: target.position.x,
        y: midPoint1.y
      },
      source: {
        x: virtualObject.left + virtualObject.width,
        y: virtualObject.y
      }
    };
    if (midPoint1.x < midPoint2.x) {
      if (virtualObject.directable) {
        linkData = directLinkData;
        accept = false;
      } else if (virtualObject.acceptable) {
        linkData = acceptLinkData;
        accept = true;
      }
    } else {
      if (virtualObject.acceptable) {
        linkData = acceptLinkData;
        accept = true;
      } else if (virtualObject.directable) {
        linkData = directLinkData;
        accept = false;
      }
    }

    return {
      accept: accept,
      linkData: linkData
    };
  }
}