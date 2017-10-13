/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 *
 * Example Line Plot component
 */

import { Component, Input, Renderer2, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    AxisSettings,
    IPlotColors,
    ConstructorOptions,
    LinePlot,
    Units
} from 'sigplot-ts';

import {
    BaseSigPlotComponent,
    BASE_SIG_PLOT_COMPONENT_STYLES,
    BASE_SIG_PLOT_COMPONENT_TEMPLATE,
    PlotData,
} from '../common/index';

import { HighlightCommand } from './highlight-command';
import { HighlightAction } from './highlight-action.enum';

/**
 * The LineComponent implements the LinePlot and exposes a number of 
 * observable interfaces for pushing data and settings changes into the 
 * LinePlot.  The plot supports multi-line plotting with legend.
 * @class
 */
@Component({
    selector: 'sigplot-line',
    styles:   BASE_SIG_PLOT_COMPONENT_STYLES,
    template: BASE_SIG_PLOT_COMPONENT_TEMPLATE
})
export class LineComponent extends BaseSigPlotComponent<LinePlot> {

    /**
     * Highlight command interface for dynamically highlighting the plot.
     */
    @Input() set highlight(h: Observable<HighlightCommand>) {
        if (this._highlightSub !== undefined) {
            this._highlightSub.unsubscribe();
            this._highlightSub = undefined;
        }
        if (h !== undefined) {
            this._highlightSub = h.subscribe((hc) => this.handleHighlight(hc));
        }
    }

    /**
     * Toggle for showing and hiding the legend panel without touching the
     * on-screen button.
     */
    @Input() set showLegend(legend: boolean) {
        if (this.plot === undefined) {
            return;
        }
        this.plot.settings.legend = legend;
        this.plot.checkSettings();
    }

    /** Subscription for the highlight command interface */
    private _highlightSub: Subscription;

    /**
     * @constructor
     * @param _renderer The Angular Renderer2 service for editing the DOM.
     * @param _el The Angular element reference of this component.
     */
    constructor(protected _renderer: Renderer2, protected _el: ElementRef) {
        super(_renderer, _el);
        /**
         * Setup the initial options for the line plot.
         * See comments for what these flags 'do' for a type 1000 plot, as they
         * differ from a type 2000.
         */
        const options = new ConstructorOptions();
        options.pan = true;          // 1.\   Show specs w/o glitching or 
        options.specs = true;        // 2. -> disappearing, provide legend
        options.show_readout = true; // 3./   toggle button.
        options.grid = true;         // Show the grid
        options.legend = true;       // Show legend initially
        options.show_x_axis = true;  // X Label in title region
        options.show_y_axis = true;  // Y Label in title region
        this.plot = new LinePlot(this.plotRef, options);
    }

    /**
     * Data handler method that forwards the data to the underlying plot instance.
     * @param pd The PlotData to plot.
     */
    handleData(pd: PlotData) {
        // If the xAxis units are set, update the plot's x-axis units label.
        // Then push the data, settings.
        if (pd.xAxis !== undefined && pd.xAxis.units !== undefined) {
            this.plot.xlab = pd.xAxis.units;
        }
        this.plot.push(pd.buffer, pd.dataSize, pd.dataType, pd.xAxis, pd.signalId);
    }

    /**
     * Highlight command handler
     * @param hc The highlight command to process.
     */
    handleHighlight(hc: HighlightCommand) {
        switch (hc.action) {
            case HighlightAction.add:
                this.plot.addHighlight(hc.highlight, hc.signalId);
                break;
            case HighlightAction.remove:
                this.plot.removeHighlight(hc.highlight, hc.signalId);
                break;
            case HighlightAction.clear:
                this.plot.clearHighlights(hc.signalId);
                break;
            default:
                break;
        }
    }
}
