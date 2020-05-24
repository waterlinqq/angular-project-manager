import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Quote } from '../domain/quote.model'
import { map, tap } from 'rxjs/operators'

@Injectable()
export class QuoteService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}
  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`
    const observable$ = this.http.get(uri) as Observable<Quote>
    return observable$.debug('quote: ')
  }
}
