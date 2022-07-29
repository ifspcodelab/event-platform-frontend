import { SpaceType } from "./spaceType.model";

export interface SpaceDto {
  id: string;
  name: string;
  capacity: number;
  type: SpaceType;
}

export class SpaceCreateDto {
  name: string;
  capacity: number;
  type: SpaceType;

  constructor(name: string, capacity: number, type: SpaceType) {
    this.name = name;
    this.capacity = capacity;
    this.type = type;
  }
}
