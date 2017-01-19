import { JNBaseNode } from './jn-base-node.type';
import { JNApplication } from '../../share/services/application-core.service';

export function JNNodeExtend() {
  return function (nodeClass: typeof JNBaseNode) {
    nodeClass.hasInput = () => {
      return !!nodeClass.accepts.length;
    };

    nodeClass.hasOutput = () => {
      let nodeTypes = JNApplication.instance.nodeTypes;
      let nodeTypeMapper = JNApplication.instance.nodeTypeMapper;
      return !!nodeTypes
        .find((n) => {
          return !!n.accepts.find(t => {
            let nodeType = nodeTypeMapper[t];
            if (!nodeType) {
              throw new Error(`node type:${t} not defined.`);
            }
            return nodeType === nodeClass
              || nodeType.isPrototypeOf(nodeClass);
          });
        });
    };
  }
}