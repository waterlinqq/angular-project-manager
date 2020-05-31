import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { QuoteEffects } from './quote.effects'
import { AuthEffects } from './auth.effect'
import { ProjectEffects } from './project.effect'
import { TaskListEffects } from './task-list.effect'

@NgModule({
  imports: [
    EffectsModule.forRoot([
      QuoteEffects,
      AuthEffects,
      ProjectEffects,
      TaskListEffects,
    ]),
  ],
})
export class AppEffectsModule {}
