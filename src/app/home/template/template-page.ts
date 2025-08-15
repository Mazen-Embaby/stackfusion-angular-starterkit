import { Component, OnInit, inject } from '@angular/core';
import { TemplateCardPage } from './template-card/template-card.component';

import { Template } from './template.interface';
import { TemplateService } from './template.service';

@Component({
  selector: 'app-template',
  imports: [TemplateCardPage],
  templateUrl: './template-page.html',
  styleUrl: './template-page.scss',
})
export class TemplatePage implements OnInit {
  private templateService = inject(TemplateService);

  templates: Template[] = [];
  ngOnInit(): void {
    this.templateService.getTemplates().subscribe((templates) => {
      this.templates = templates;
    });
  }
}
