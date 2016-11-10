import { JNBaseNode } from '../core/models/jn-base-node.type';
import { IJNPaletteNode } from '../views/palette/palette-node.type';
export class JNUtils {
  static isBlank(val: any) {
    return (val === null || val === undefined);
  }

  static toArray<T>(obj): {key: string, value: T}[] {
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }
  static getStaticNodes(selectedNode: JNBaseNode, staticNodes: Array<JNBaseNode>){
    let nodes = [];
    staticNodes.forEach((node:JNBaseNode)=> {
      nodes.push(new IJNPaletteNode(selectedNode, node));
    })
    return nodes;
  }
}
