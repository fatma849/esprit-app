import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-dash1',
  template: `
    
    <iframe [src]="embedUrl" width="100%" height="900" frameborder="0" allowfullscreen></iframe>
  `
})
export class Dash1Page {
  embedUrl: SafeResourceUrl;
  constructor(private s: DomSanitizer) {
    const url = 'https://app.powerbi.com/reportEmbed?reportId=68288e7d-594a-44f1-8076-b727659cc34f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&pageName=d4c9d679780cc49022cd&filterPaneEnabled=false&navContentPaneEnabled=false';
    this.embedUrl = this.s.bypassSecurityTrustResourceUrl(url);
  }
}
    