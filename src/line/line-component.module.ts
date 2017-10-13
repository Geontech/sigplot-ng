/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */
import { NgModule } from '@angular/core';
import { LineComponent } from './line.component';

export { HighlightAction } from './highlight-action.enum';
export { HighlightCommand } from './highlight-command';

/**
 * This module provides the Line Component and helper interfaces, enums,
 * for drawing line plots containing potentially multiple lines.
 * @class
 */
@NgModule({
    declarations: [ LineComponent ],
    exports:      [ LineComponent ]
})
export class LineComponentModule {}
