import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import TabItem from './models/tab-item.model';
import TabsOptions from './models/tabs-option.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sf-tab',
  imports: [NgClass, MatIconModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @Input() tabs: TabItem[] = [];
  @Input() options: TabsOptions = {
    activeClasses: 'text-blue-600 border-b-2 border-blue-600',
    inactiveClasses: 'text-gray-500 hover:text-gray-700',
  };

  ngOnInit(): void {
    const defaultTab = this.tabs.find((tab) => tab.id === this.options.defaultTabId);
    if (defaultTab) {
      this.selectTab(this.tabs.indexOf(defaultTab));
    } else if (this.tabs.length) {
      this.selectTab(0);
    }
  }

  selectTab(index: number): void {
    this.tabs.forEach((tab, i) => {
      tab.active = i === index;
    });
  }
}
