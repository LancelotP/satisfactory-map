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
const marker_model_1 = require("../marker/marker.model");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const map_model_1 = require("../map/map.model");
const user_model_1 = require("../user/user.model");
let Deposit = class Deposit extends marker_model_1.Marker {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Deposit.prototype, "quality", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Deposit.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => map_model_1.Map, map => map.deposits, { nullable: false }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", map_model_1.Map)
], Deposit.prototype, "map", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_model_1.User),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_model_1.User)
], Deposit.prototype, "creator", void 0);
Deposit = __decorate([
    typeorm_1.Entity()
], Deposit);
exports.Deposit = Deposit;
