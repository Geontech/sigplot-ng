/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import { FormatType, FormatSize, AxisData } from 'sigplot-ts';

/**
 * PlotData interface to simplify and unify component design
 * @interface
 */
export interface PlotData {
    /** Signal ID related to this buffer */
    signalId?:  string;
    /** The data buffer */
    buffer:     number[];
    /** X-Axis data description */
    xAxis?:     AxisData;
    /** Y-Axis data description */
    yAxis?:     AxisData;
    /** Data Format Size */
    dataSize:   FormatSize;
    /** Data Format Type */
    dataType:   FormatType;
}
