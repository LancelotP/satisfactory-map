"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_model_1 = require("../common/common.model");
const typeorm_1 = require("typeorm");
class Marker extends common_model_1.Resource {
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Marker.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Marker.prototype, "lng", void 0);
exports.Marker = Marker;
