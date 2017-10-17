/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import { Component, Input, Renderer2, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    AxisSettings,
    IColorMap,
    ConstructorOptions,
    RasterPlot,
    RasterPlotData,
    Mc,
    Units
} from 'sigplot-ts';

import {
    BaseSigPlotComponent,
    BASE_SIG_PLOT_COMPONENT_STYLES,
    BASE_SIG_PLOT_COMPONENT_TEMPLATE
} from '../common/index';

/**
 * The RasterComponent implements the RasterPlot controller by extending
 * the BaseSigPlotComponent.  Additional interfaces are provided for controlling
 * the color map (cmap) and Y-Axis settings.
 */
@Component({
    selector: 'sigplot-raster',
    styles:   BASE_SIG_PLOT_COMPONENT_STYLES,
    template: BASE_SIG_PLOT_COMPONENT_TEMPLATE
})
export class RasterComponent extends BaseSigPlotComponent<RasterPlot> {

    /**
     * The color map (gradient, usually) to use for drawing the data.  This can
     * be the string name or number (via the Mc enumeration) of a pre-existing
     * color map, or your own using the IColorMap interface.
     */
    @Input() set cmap(c: IColorMap | string | number | Mc) {
        if (this.plot === undefined) {
            return;
        }
        this.plot.settings.cmap = c;
        this.plot.checkSettings();
    }

    /**
     * Configures the Y-Axis' settings
     */
    @Input() set yAxisSettings(ay: AxisSettings) {
        if (this.plot === undefined) {
            return;
        }
        this.plot.settings.yinv = ay.inv;
        this.plot.settings.ymax = ay.max;
        this.plot.settings.ymin = ay.min;
        this.plot.settings.autoy = ay.autoScale;
        this.plot.checkSettings();
    }

    constructor(protected _renderer: Renderer2, protected _el: ElementRef) {
        super(_renderer, _el);
        /**
         * Setup the initial options for a (falling) raster plot.
         * See comments for what these flags 'do' for a type 2000 plot, as they
         * differ from type 1000.
         */
        let options = new ConstructorOptions();
        // Provides area for and enables x, y labels, axes w/ ticks, etc.
        options.specs = true;
        // Shows scroll bars, specs panel, colorbar, legend button
        options.pan = true;
        // Show legend initially with signal name.
        options.legend = true;
        this.plot = new RasterPlot(this.plotRef, options);
    }

    handleData(pd: RasterPlotData) {
        // If the units are set, update the plot's related axis units label.
        // Then push the data, settings.
        if (pd.xAxis !== undefined && pd.xAxis.units !== undefined) {
            this.plot.xlab = pd.xAxis.units;
        }
        if (pd.yAxis !== undefined && pd.yAxis.units !== undefined) {
            this.plot.ylab = pd.yAxis.units;
        }
        this.plot.push(pd);
    }
}
