import { IResolvers } from "../../types";

export default {
  Marker: {
    position: _ => ({
      x: _.x,
      y: _.y,
      z: _.z
    })
  }
} as IResolvers;
