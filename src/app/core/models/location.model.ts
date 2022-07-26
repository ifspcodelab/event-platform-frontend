export interface LocationDto {
  id: string;
  name: string;
  address: string;
}

export class LocationCreateDto {
  name: string;
  address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }
}
