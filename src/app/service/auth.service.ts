import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User, Auth } from '../domain'
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class AuthService {
  private readonly domain = 'users'
  private headers = new Headers({
    'Content-Type': 'application/json',
  })

  private token = '12345'
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}

  // POST
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`
    return this.http.get(uri, { params: { email: user.email } }).pipe(
      switchMap((val) => {
        if ((val as User[]).length > 0) {
          throw Error('user existed')
        }
        return this.http
          .post(uri, user)
          .pipe(map((res) => ({ token: this.token, user: user as User })))
      })
    )
  }

  // PUT
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`
    return this.http.get(uri, { params: { email: username, password } }).pipe(
      map((res) => {
        if ((res as []).length === 0) {
          throw Error('username or password not match')
        }
        return {
          token: this.token,
          user: res[0],
        }
      })
    )
  }
}
