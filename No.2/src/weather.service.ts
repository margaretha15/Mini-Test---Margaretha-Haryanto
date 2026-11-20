import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface ForecastItem {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
    };
}

interface OpenWeatherResponse {
    list: ForecastItem[];
}

@Injectable()
export class WeatherService {
    constructor(private readonly configService: ConfigService) { }

    async getJakartaForecast(): Promise<string> {
        const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
        if (!apiKey) {
            throw new InternalServerErrorException(
                'OPENWEATHER_API_KEY tidak ditemukan di file .env',
            );
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Jakarta&units=metric&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new InternalServerErrorException(
                `Gagal mengambil data cuaca: ${response.statusText}`,
            );
        }

        const data: OpenWeatherResponse = await response.json() as OpenWeatherResponse;
        const seenDates = new Set<string>();
        const lines: string[] = ['Weather Forecast:'];

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        for (const item of data.list) {
            if (seenDates.size >= 5) break;

            const dateStr = item.dt_txt.split(' ')[0];

            if (!seenDates.has(dateStr)) {
                seenDates.add(dateStr);

                const dateObj = new Date(item.dt * 1000);
                const dayName = days[dateObj.getUTCDay()];
                const dayNum = String(dateObj.getUTCDate()).padStart(2, '0');
                const monthName = months[dateObj.getUTCMonth()];
                const year = dateObj.getUTCFullYear();
                const temp = item.main.temp.toFixed(2);

                lines.push(`${dayName}, ${dayNum} ${monthName} ${year}: ${temp}°C`);
            }
        }

        return lines.join('\n');
    }
}