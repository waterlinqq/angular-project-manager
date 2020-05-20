// import {MatIconRegistry} from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'

export const loadSvgResource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img'
  const sidebarDir = `${imgDir}/sidebar`
  const iconDir = `${imgDir}/icons`
  const day = new Date().getDate()
  ir.addSvgIconSetInNamespace(
    'unassigned',
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/avatar/unassigned.svg`)
  )
  ir.addSvgIconSetInNamespace(
    'avatar',
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/avatar/avatars.svg`)
  )
  ir.addSvgIcon(
    'day',
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/days/day${day}.svg`)
  )
  ir.addSvgIcon(
    'month',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`)
  )
  ir.addSvgIcon(
    'project',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`)
  )
  ir.addSvgIcon(
    'week',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`)
  )
  ir.addSvgIcon(
    'projects',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`)
  )
  ir.addSvgIcon(
    'move',
    ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`)
  )
  ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`))
  ir.addSvgIcon(
    'delete',
    ds.bypassSecurityTrustResourceUrl(`${iconDir}/delete.svg`)
  )
}
