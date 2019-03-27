"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerQuery = {
    Query: {
        viewer: (_, args, ctx) => {
            return ctx.viewer;
        }
    }
};
