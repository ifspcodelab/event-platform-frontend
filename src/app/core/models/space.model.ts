import {SpaceType} from "./spaceType.model";

export interface SpaceDto {
  id: string;
  name: string;
  capacity: number;
  type: SpaceType;
}
