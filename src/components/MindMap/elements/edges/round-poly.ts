import {
    registerEdge
} from '@antv/g6-core';
import { getPathWithBorderRadiusByPolyline } from '../../utils/polyline-utils';
registerEdge('round-poly', {
    getPath: function getPath(points, source, target, radius, routeCfg) {
        return getPathWithBorderRadiusByPolyline(this.getPoints(points.shift(), points.pop(), source, target), radius)
    },
    getControlPoints: (cfg) => {
        const { startPoint, endPoint, sourceNode, targetNode } = cfg;
        const isLeft = startPoint.x < endPoint.x;
        let start = startPoint, end = endPoint;
        if (isLeft && sourceNode) {
            start = sourceNode.get('anchorPointsCache')[0];
            end = targetNode.get('anchorPointsCache')[1];
        }
        const distance = Math.min(Math.abs(start.x - end.x) * 1 / 3, 30);
        const offsetX = isLeft ? distance : -distance;
        return [
            {
                x: start.x + offsetX,
                y: start.y
            },
            {
                x: start.x + offsetX,
                y: end.y
            },
        ];
    },
    getPoints: (startPoint, endPoint, sourceNode, targetNode) => {
        const isLeft = startPoint.x < endPoint.x;
        let start = startPoint, end = endPoint;
        if (isLeft && sourceNode) {
            start = sourceNode.get('anchorPointsCache')[0];
            end = targetNode.get('anchorPointsCache')[1];
        }
        const distance = Math.min(Math.abs(start.x - end.x) * 1 / 3, 40);
        const offsetX = isLeft ? distance : -distance;
        return [
            {
                x: start.x,
                y: start.y
            },
            {
                x: start.x + offsetX,
                y: start.y
            },
            {
                x: start.x + offsetX,
                y: end.y
            },
            {
                x: end.x,
                y: end.y
            }
        ];
    }
}, 'polyline')