/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 *
 * Common module for components
 */
import { NgModule } from '@angular/core';

import { BaseSigPlotComponent } from './base-sig-plot.component';

export * from './base-sig-plot.component';

@NgModule({
    declarations: [ BaseSigPlotComponent ],
    exports:      [ BaseSigPlotComponent ]
})
export class CommonModule {}
