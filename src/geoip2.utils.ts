import { Reader } from "@maxmind/geoip2-node";
import { GeoIP2ModuleOptions } from "./geoip2.interfaces";
import { GeoIP2 } from './geoip2.interfaces'
import {
  GEOIP2_MODULE_CONNECTION,
  GEOIP2_MODULE_OPTIONS_TOKEN,
  GEOIP2_MODULE_CONNECTION_TOKEN
} from './geoip2.constants';

export function getGeoIP2OptionsToken(connection: string): string {
  return `${ connection || GEOIP2_MODULE_CONNECTION }_${ GEOIP2_MODULE_OPTIONS_TOKEN }`;
}

export function getGeoIP2ConnectionToken(connection: string): string {
  return `${ connection || GEOIP2_MODULE_CONNECTION }_${ GEOIP2_MODULE_CONNECTION_TOKEN }`;
}

export function createGeoIP2Connection(options: GeoIP2ModuleOptions): Promise<GeoIP2> {
  return Reader.open(options.config.file, options.config.opts)
}
