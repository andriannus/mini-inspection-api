import { Controller, Get } from '@nestjs/common';

import { InspectionsService } from './inspections.service';

@Controller({ version: '1' })
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get('inspections')
  findAll(): string[] {
    return this.inspectionsService.findAll();
  }
}
