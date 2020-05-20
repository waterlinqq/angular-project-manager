import { NgModule, SkipSelf, Optional } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { FooterComponent } from './footer/footer.component'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'

import { SharedModule } from '../shared/shared.module'
import { loadSvgResource } from '../utils/svg.util'

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [HttpClientModule, SharedModule],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('Module has been loaded already.')
    }
    loadSvgResource(ir, ds)
  }
}
