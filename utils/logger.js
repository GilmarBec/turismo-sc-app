import { Bugfender } from '@bugfender/sdk';
import { BUGFENDER_APPKEY, DEFAULT_LOG_LEVELS, LOG_LEVEL } from '../config/env';

Bugfender.init({
  appKey: BUGFENDER_APPKEY,
});

export class Logger {
  static info(obj) {
    if (LOG_LEVEL >= DEFAULT_LOG_LEVELS.INFO)
      Bugfender.info(JSON.stringify(obj));
  }

  static debug(obj) {
    if (LOG_LEVEL >= DEFAULT_LOG_LEVELS.DEBUG)
      Bugfender.info(JSON.stringify(obj));
  }
}
