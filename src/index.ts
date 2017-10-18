/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */
import { NgModule } from '@angular/core';

import { CHILD_MODULES } from './modules';

export * from './common/common.module';
export * from './line/line-component.module';
export * from './raster/raster-component.module';

/**
 * The SigPlotComponentsModule contains components and utilities for 
 * instantiating SigPlot within Angular components.
 */
@NgModule({
    imports: CHILD_MODULES,
    exports: CHILD_MODULES
})
export class SigPlotComponentsModule {}
