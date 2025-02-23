import { Injectable } from '@nestjs/common';

@Injectable()
export class InspectionsService {
  private readonly inspections: string[] = [];

  findAll(): string[] {
    return this.inspections;
  }
}
