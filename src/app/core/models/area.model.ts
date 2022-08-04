export interface AreaDto {
  id: string;
  name: string;
  reference?: string;
}

export class AreaCreateDto {
  name: string;
  reference?: string;

  constructor(name: string, reference?: string) {
    this.name = name;
    this.reference = reference;
  }
}
