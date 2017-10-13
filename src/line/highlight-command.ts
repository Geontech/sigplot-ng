/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import { IHighlight } from 'sigplot-ts';

import { HighlightAction } from './highlight-action.enum';

/**
 * The HighlightCommand interface allows for dynamically highlighting sections 
 * of a line in the LinePlot.
 * @interface
 */
export interface HighlightCommand {
    /** The unique ID for the signal that was pushed to the plot */
    signalId?:  string;
    /** Add, remove, or clear (all) for that signal ID */
    action?:    HighlightAction;
    /** Description of the highlight (only required if adding) */
    highlight?: IHighlight;
}
