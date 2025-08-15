import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template } from '../template.interface';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-detail',
  imports: [],
  templateUrl: './template-detail.html',
  styleUrl: './template-detail.scss',
})
export class TemplateDetail implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private templateService = inject(TemplateService);

  template?: Template;

  ngOnInit(): void {
    const title = this.activatedRoute.snapshot.params['title'];
    this.templateService.getTemplateByDashTitle(title).subscribe((template) => {
      if (template) {
        this.template = template;
      } else {
        console.error('Template not found for title:', title);
      }
    });
    console.log('TemplateDetail initialized with title:', title);
  }
}
