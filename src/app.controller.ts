import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/blocking")
  blocking(@Query("cpuTimeMs", ParseIntPipe) cpuTimeMs: number) {
    return this.appService.blocking(cpuTimeMs);
  }
  @Get("/worker")
  worker(@Query("cpuTimeMs", ParseIntPipe) cpuTimeMs: number) {
    return this.appService.worker(cpuTimeMs)
  }
}
