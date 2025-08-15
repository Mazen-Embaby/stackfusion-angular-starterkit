// import {
//   Component,
//   ContentChildren,
//   QueryList,
//   AfterContentInit,
// } from '@angular/core';
// import { TabComponent } from './tab.component';
// import { NgFor } from '@angular/common';

// @Component({
//   selector: 'sf-tabview',
//   imports: [NgFor],
//   templateUrl: './tabview.component.html',
//   styleUrls: ['./tabview.component.scss'],
// })
// export class TabviewComponent implements AfterContentInit {
//   @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
//     new QueryList<TabComponent>();

//   constructor() {}

//   ngAfterContentInit() {
//     const activeTabs = this.tabs.filter((tab) => tab.active);
//     if (activeTabs.length === 0) {
//       this.selectTab(this.tabs.first);
//     }
//   }

//   selectTab(tab: TabComponent) {
//     this.tabs.toArray().forEach((t) => (t.active = false));
//     tab.active = true;
//   }
// }
