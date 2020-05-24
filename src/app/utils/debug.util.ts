import { Observable } from 'rxjs'

import { evironment } from '../environments/environment'
import { tap } from 'rxjs/operators'
declare module 'rxjs' {
  interface Observable<T> {
    debug: (m: string) => Observable<T>
  }
}

Observable.prototype.debug = function (message: string) {
  return this.pipe(
    tap(
      (next) => {
        if (evironment.production) {
          console.log(message, next)
        }
      },
      (error) => {
        if (evironment.production) {
          console.log('error', message, error)
        }
      },
      () => {
        if (evironment.production) {
          console.log('completed-', message)
        }
      }
    )
  )
}
