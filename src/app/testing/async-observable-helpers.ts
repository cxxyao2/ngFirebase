/** Create async observable that emits-once and completes
 * after a JS engine turn
 */

import { defer } from 'rxjs';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.resolve(errorObject));
}
