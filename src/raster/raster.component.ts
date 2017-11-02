/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import {
    Component,
    Input,
    Renderer2,
    ElementRef,
    Optional,
    Inject
} from '@angular/core';

import {
    IColorMap,
    ConstructorOptions,
    RasterPlot,
    RasterPlotData,
    Mc
} from 'sigplot-ts';

import {
    BaseSigPlotComponent,
    BASE_SIG_PLOT_COMPONENT_STYLES,
    BASE_SIG_PLOT_COMPONENT_TEMPLATE
} from '../common/common.module';

import { defaultRasterOptions, RASTER_PLOT_OPTIONS } from './raster-options';

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

    constructor(
        renderer: Renderer2,
        el: ElementRef,
        @Optional() @Inject(RASTER_PLOT_OPTIONS) options: ConstructorOptions
    ) {
        super(renderer, el);
        options = options || defaultRasterOptions();
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
