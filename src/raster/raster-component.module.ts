/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */
import { NgModule } from '@angular/core';
import { RasterComponent } from './raster.component';

export { RasterComponent } from './raster.component';
export { RASTER_PLOT_OPTIONS, defaultRasterOptions } from './raster-options';
/**
 * RasterComponentModule
 */
@NgModule({
    declarations: [ RasterComponent ],
    exports:      [ RasterComponent ]
})
export class RasterComponentModule {}
