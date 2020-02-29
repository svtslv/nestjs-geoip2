import { Module, DynamicModule, Provider } from "@nestjs/common";
import { GeoIP2ModuleOptions, GeoIP2ModuleAsyncOptions } from './geoip2.interfaces';
import { createGeoIP2Connection, getGeoIP2ConnectionToken, getGeoIP2OptionsToken } from './geoip2.utils'

@Module({})
export class GeoIP2Module {
  static forRoot(options: GeoIP2ModuleOptions, connection?: string): DynamicModule {

    const geoIP2ModuleOptions: Provider = {
      provide: getGeoIP2OptionsToken(connection),
      useValue: options,
    };

    const geoIP2ConnectionProvider: Provider = {
      provide: getGeoIP2ConnectionToken(connection),
      useFactory: async () => createGeoIP2Connection(options)
    };

    return {
      module: GeoIP2Module,
      providers: [
        geoIP2ModuleOptions,
        geoIP2ConnectionProvider,
      ],
      exports: [
        geoIP2ModuleOptions,
        geoIP2ConnectionProvider,
      ],
    };
  }

  static forRootAsync(options: GeoIP2ModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: GeoIP2Module,
      imports: [GeoIP2Module.forRootAsync(options, connection)],
    };
  }
}
