import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import ReaderModel from "@maxmind/geoip2-node/dist/src/readerModel";
import { OpenOpts } from 'maxmind';

export interface GeoIP2ModuleOptions {
  config: {
    file: string,
    opts?: OpenOpts
  };
}

export interface GeoIP2ModuleOptionsFactory {
  createGeoIP2ModuleOptions(): Promise<GeoIP2ModuleOptions> | GeoIP2ModuleOptions;
}

export interface GeoIP2ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<GeoIP2ModuleOptionsFactory>;
  useExisting?: Type<GeoIP2ModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<GeoIP2ModuleOptions> | GeoIP2ModuleOptions;
}

export type GeoIP2 = ReaderModel;
