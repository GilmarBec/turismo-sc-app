// import { Bugfender } from '@bugfender/sdk';
import { BUGFENDER_APPKEY, DEFAULT_LOG_LEVELS, LOG_LEVEL } from '../config/env';

// Bugfender.init({
//   appKey: BUGFENDER_APPKEY,
// });

export class Logger {
  static info(obj) {
    // if (DEFAULT_LOG_LEVELS.INFO >= LOG_LEVEL)
    //   Bugfender.info(JSON.stringify(obj));
  }

  static debug(obj) {
    // if (DEFAULT_LOG_LEVELS.DEBUG >= LOG_LEVEL)
    //   Bugfender.info(JSON.stringify(obj));
  }
}
