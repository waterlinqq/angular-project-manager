// import {MatIconRegistry} from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

export const loadSvgResource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const sidebarDir = `${imgDir}/sidebar`;
  const day = new Date().getDate();
  ir.addSvgIcon(
    'day',
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/days/day${day}.svg`)
  );
  ir.addSvgIcon(
    'month',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`)
  );
  ir.addSvgIcon(
    'project',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`)
  );
  ir.addSvgIcon(
    'week',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`)
  );
  ir.addSvgIcon(
    'projects',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`)
  );
};
