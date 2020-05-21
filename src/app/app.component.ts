import { Component } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
const DARKTHEMECLASS = 'unicorn-dark-theme'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkTheme = true
  constructor(private oc: OverlayContainer) {}
  onToggleTheme(isDarkTheme) {
    this.darkTheme = isDarkTheme
    const overlayContainerClasses = this.oc.getContainerElement().classList
    if (isDarkTheme) {
      overlayContainerClasses.add(DARKTHEMECLASS)
    }
  }
}
