import { IResolvers } from "../../types";

export default {
  Marker: {
    alt: _ => _.z,
    lat: _ => _.y,
    lng: _ => _.x
  }
} as IResolvers;
