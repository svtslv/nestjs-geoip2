# NestJS GeoIP2

<a href="https://www.npmjs.com/package/nestjs-geoip2"><img src="https://img.shields.io/npm/v/nestjs-geoip2.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-geoip2"><img src="https://img.shields.io/npm/l/nestjs-geoip2.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates MaxMind GeoIP2 with Nest

## Installation

```sh
npm install nestjs-geoip2 @maxmind/geoip2-node
```

You can also use the interactive CLI

```sh
npx nestjs-modules
```

## Examples

```sh
npx geoip2-cli --download --licenseKey=MAXMIND_LICENSE_KEY
```

### GeoIP2Module.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { GeoIP2Module } from 'nestjs-geoip2';
import { AppController } from './app.controller';
import { join } from 'path';

@Module({
  imports: [
    GeoIP2Module.forRoot({
      config: {
        file: join(process.cwd(), 'geoip2-cli', 'GeoLite2-City.mmdb'),
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### GeoIP2Module.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { GeoIP2Module } from 'nestjs-geoip2';
import { AppController } from './app.controller';
import { join } from 'path';

@Module({
  imports: [
    GeoIP2Module.forRootAsync({
      useFactory: () => ({
        config: {
          file: join(process.cwd(), 'geoip2-cli', 'GeoLite2-City.mmdb'),
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectGeoIP2(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectGeoIP2, GeoIP2 } from 'nestjs-geoip2';

@Controller()
export class AppController {
  constructor(
    @InjectGeoIP2() private readonly geoIP2: GeoIP2,
  ) {}

  @Get()
  async getHello() {
    return await this.geoIP2.city('8.8.8.8');
  }
}
```

## License

MIT
