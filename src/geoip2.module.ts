import { DynamicModule, Module } from '@nestjs/common';
import { GeoIP2CoreModule } from './geoip2.core-module';
import { GeoIP2ModuleAsyncOptions, GeoIP2ModuleOptions } from './geoip2.interfaces';

@Module({})
export class GeoIP2Module {
  public static forRoot(options: GeoIP2ModuleOptions, connection?: string): DynamicModule {
    return {
      module: GeoIP2Module,
      imports: [GeoIP2CoreModule.forRoot(options, connection)],
      exports: [GeoIP2CoreModule],
    };
  }

  public static forRootAsync(options: GeoIP2ModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: GeoIP2Module,
      imports: [GeoIP2CoreModule.forRootAsync(options, connection)],
      exports: [GeoIP2CoreModule],
    };
  }
}
