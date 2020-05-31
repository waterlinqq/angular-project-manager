import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TaskList, Task, Project } from '../domain'
import { map, mapTo, reduce } from 'rxjs/operators'
import { Observable, concat, merge } from 'rxjs'

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists'
  private headers = new Headers({
    'Content-Type': 'application/json',
  })
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}
  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`
    return this.http.post(uri, taskList).pipe(map((res) => res as TaskList))
  }
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`
    const toUpdate = {
      name: taskList.name,
    }
    return this.http.patch(uri, toUpdate).pipe(map((res) => res as TaskList))
  }
  delete(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`
    return this.http.delete(uri).pipe(mapTo(taskList))
  }
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`
    return this.http
      .get(uri, { params: { projectId } })
      .pipe(map((res) => res as TaskList[]))
  }
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`
    const drag$ = this.http.patch(
      dragUri,
      JSON.stringify({ order: target.order })
    )
    const drop$ = this.http.patch(dropUri, JSON.stringify({ order: src.order }))
    return concat(drag$, drop$).pipe(
      reduce((arrs, list) => [...arrs, list], [])
    )
  }
  initializeTaskLists(prj: Project): Observable<Project> {
    const id = prj.id
    return merge(
      this.add({ name: '待處理', projectId: id, order: 1 }),
      this.add({ name: '進行中', projectId: id, order: 2 }),
      this.add({ name: '已完成', projectId: id, order: 3 })
    ).pipe(
      reduce((r, x) => {
        return [...r, x]
      }, []),
      map((tls) => ({ ...prj, taskLists: tls.map((tl) => tl.id) }))
    )
  }
}
