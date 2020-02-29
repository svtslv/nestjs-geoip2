import { Inject } from '@nestjs/common';
import { getGeoIP2ConnectionToken } from './geoip2.utils'

export const InjectGeoIP2 = (connection?) => {
  return Inject(getGeoIP2ConnectionToken(connection));
};
