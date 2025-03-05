export interface ChinaCityInfo {
  type:     string;
  features: Feature[];
}

export interface Feature {
  type:       FeatureType;
  properties: Properties;
  geometry:   Geometry;
}

export interface Geometry {
  type:        GeometryType;
  coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
  MultiPolygon = "MultiPolygon",
  Polygon = "Polygon",
}

export interface Properties {
  adcode:           number | string;
  name:             string;
  center?:          number[];
  centroid?:        number[] | null;
  childrenNum?:     number;
  level?:           Level;
  parent?:          Parent;
  subFeatureIndex?: number;
  acroutes?:        number[];
  adchar?:          string;
}

export enum Level {
  City = "city",
  District = "district",
  Province = "province",
}

export interface Parent {
  adcode: number;
}

export enum FeatureType {
  Feature = "Feature",
}
