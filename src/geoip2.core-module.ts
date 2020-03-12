import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { GeoIP2ModuleAsyncOptions, GeoIP2ModuleOptions, GeoIP2ModuleOptionsFactory } from './geoip2.interfaces';
import { createGeoIP2Connection, getGeoIP2OptionsToken, getGeoIP2ConnectionToken } from './geoip2.utils'

@Global()
@Module({})
export class GeoIP2CoreModule {

  /* forRoot */
  static forRoot(options: GeoIP2ModuleOptions, connection?: string): DynamicModule {

    const geoIP2OptionsProvider: Provider = {
      provide: getGeoIP2OptionsToken(connection),
      useValue: options,
    };

    const geoIP2ConnectionProvider: Provider = {
      provide: getGeoIP2ConnectionToken(connection),
      useValue: createGeoIP2Connection(options),
    };

    return {
      module: GeoIP2CoreModule,
      providers: [
        geoIP2OptionsProvider,
        geoIP2ConnectionProvider,
      ],
      exports: [
        geoIP2OptionsProvider,
        geoIP2ConnectionProvider,
      ],
    };
  }

  /* forRootAsync */
  public static forRootAsync(options: GeoIP2ModuleAsyncOptions, connection: string): DynamicModule {

    const geoIP2ConnectionProvider: Provider = {
      provide: getGeoIP2ConnectionToken(connection),
      useFactory(options: GeoIP2ModuleOptions) {
        return createGeoIP2Connection(options)
      },
      inject: [getGeoIP2OptionsToken(connection)],
    };

    return {
      module: GeoIP2CoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), geoIP2ConnectionProvider],
      exports: [geoIP2ConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: GeoIP2ModuleAsyncOptions, connection?: string): Provider[] {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection)
      ];
    }

    return [ 
      this.createAsyncOptionsProvider(options, connection), 
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: GeoIP2ModuleAsyncOptions, connection?: string): Provider {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getGeoIP2OptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getGeoIP2OptionsToken(connection),
      async useFactory(optionsFactory: GeoIP2ModuleOptionsFactory): Promise<GeoIP2ModuleOptions> {
        return await optionsFactory.createGeoIP2ModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}