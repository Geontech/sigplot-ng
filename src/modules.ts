/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import { CommonModule } from './common/common.module';
import { LineComponentModule } from './line/line-component.module';
import { RasterComponentModule } from './raster/raster-component.module';

export const CHILD_MODULES = [
    CommonModule,
    LineComponentModule,
    RasterComponentModule
];
