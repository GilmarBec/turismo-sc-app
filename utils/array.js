import {Logger} from './logger'

export function arrayRemoveValue(array, value) {
  if (!Array.isArray(array)) {
    throw Error(`Object is not an array, object:\n${JSON.stringify(array)}`)
  }
  Logger.info({array, value})

  return array?.filter(element => { 
    return element !== value; 
  });
}