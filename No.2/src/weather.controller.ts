import { Controller, Get, Header } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @Get()
    @Header('Content-Type', 'text/plain; charset=utf-8')
    async getForecast(): Promise<string> {
        return this.weatherService.getJakartaForecast();
    }
}