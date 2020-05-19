// import {MatIconRegistry} from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

export const loadSvgResource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const sidebarDir = `${imgDir}/sidebar`;
  ir.addSvgIcon(
    'day',
    ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`)
  );
};
