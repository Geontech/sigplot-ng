/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 *
 * Example Line Plot component
 */

import {
    Component,
    Input,
    Renderer2,
    ElementRef,
    Optional,
    Inject
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    ConstructorOptions,
    LinePlot,
    LinePlotData
} from 'sigplot-ts';

import {
    BaseSigPlotComponent,
    BASE_SIG_PLOT_COMPONENT_STYLES,
    BASE_SIG_PLOT_COMPONENT_TEMPLATE,
} from '../common/common.module';

import { HighlightCommand } from './highlight-command';
import { HighlightAction } from './highlight-action.enum';
import { defaultLineOptions, LINE_PLOT_OPTIONS } from './line-options';

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

    /** Subscription for the highlight command interface */
    private _highlightSub: Subscription;

    /**
     * @constructor
     * @param renderer The Angular Renderer2 service for editing the DOM.
     * @param el The Angular element reference of this component.
     */
    constructor(
        renderer: Renderer2,
        el: ElementRef,
        @Optional() @Inject(LINE_PLOT_OPTIONS) options: ConstructorOptions
    ) {
        super(renderer, el);
        options = options || defaultLineOptions();
        this.plot = new LinePlot(this.plotRef, options);
    }

    /**
     * Data handler method that forwards the data to the underlying plot instance.
     * @param pd The LinePlotData to plot.
     */
    handleData(pd: LinePlotData) {
        // If the xAxis units are set, update the plot's x-axis units label.
        // Then push the data, settings.
        if (pd.xAxis !== undefined && pd.xAxis.units !== undefined) {
            this.plot.xlab = pd.xAxis.units;
        }
        this.plot.push(pd);
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
