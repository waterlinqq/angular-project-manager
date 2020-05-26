import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Project } from '../domain'
import { Observable, from } from 'rxjs'
import { map, mergeMap, count, switchMap, mapTo, tap } from 'rxjs/operators'

@Injectable()
export class ProjectService {
  private readonly domain = 'projects'
  private headers = new Headers({
    'Content-Type': 'application/json',
  })
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}
  add(project: Project): Observable<Project> {
    project.id = null
    const uri = `${this.config.uri}/${this.domain}`
    return this.http.post(uri, project).pipe(map((res) => res as Project))
  }
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    }
    return this.http.patch(uri, toUpdate).pipe(map((res) => res as Project))
  }
  delete(project: Project): Observable<Project> {
    const delTask$ = from(project.taskLists || [])
      .pipe(
        mergeMap((listId) =>
          this.http.delete(`${this.config.uri}/taskLists/${listId}`)
        )
        // count()
      )
      .pipe(count())
    return delTask$
      .pipe(
        switchMap((_) =>
          this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)
        )
      )
      .pipe(mapTo(project))
  }
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`
    return this.http
      .get(uri, { params: { members_like: userId } })
      .pipe(map((res) => res as Project[]))
  }
}
