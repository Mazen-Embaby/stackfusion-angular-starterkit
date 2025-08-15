import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Template } from '../template.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-template-card',
  imports: [RouterLink, NgClass],
  templateUrl: './template-card.component.html',
  styleUrl: './template-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCardPage {
  @Input({ required: true })
  public template!: Template;
}
