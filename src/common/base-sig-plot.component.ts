/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import {
    Component,
    DoCheck,
    OnDestroy,
    Input,
    Renderer2,
    ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BasePlot, IPlotColors, AxisSettings, PlotData, Units } from 'sigplot-ts';

export const BASE_SIG_PLOT_COMPONENT_STYLES = [`:host { display: block }`];
export const BASE_SIG_PLOT_COMPONENT_TEMPLATE = `<!-- SigPlot -->`;

/**
 * The BaseSigPlot Component provides a basic class with interfaces
 * for data ingress, foreground/background color control, and x-Axis settings.
 */
@Component({
    template: BASE_SIG_PLOT_COMPONENT_TEMPLATE,
    styles:   BASE_SIG_PLOT_COMPONENT_STYLES
})
export class BaseSigPlotComponent<T extends BasePlot>
    implements DoCheck, OnDestroy {

        /** Data Input interface */
        @Input() set data$(d$: Observable<PlotData>) {
            this.clearDataSubscription();
            if (d$ !== undefined) {
                this._dataSub = d$.subscribe((pd) => this.handleData(pd));
            }
        }

        /**
         * Controls the foreground and background colors of the plot.  The
         * foreground color describes the labels, line markers, etc.
         */
        @Input() set colors(c: IPlotColors) {
            this.plot.settings.colors = c;
            this.plot.checkSettings();
        }

        /**
         * X-Axis settings control.
         */
        @Input() set xAxisSettings(ax: AxisSettings) {
            this.plot.settings.xinv = ax.inv;
            this.plot.settings.xmax = ax.max;
            this.plot.settings.xmin = ax.min;
            this.plot.settings.autox = ax.autoScale;
            this.plot.checkSettings();
        }

        /**
         * Configures the Y-Axis' settings
         */
        @Input() set yAxisSettings(ay: AxisSettings) {
            this.plot.settings.yinv = ay.inv;
            this.plot.settings.ymax = ay.max;
            this.plot.settings.ymin = ay.min;
            this.plot.settings.autoy = ay.autoScale;
            this.plot.checkSettings();
        }

        /**
         * X-axis Units.  This will update the label for the axis.
         */
        @Input() set xAxisUnits(units: Units) {
            this.plot.xlab = units;
        }

        /**
         * Y-axis Units.  This will update the label for the axis.
         */
        @Input() set yAxisUnits(units: Units) {
            this.plot.xlab = units;
        }

        /**
         * Toggle for the legend panel without touching the on-screen button.
         */
        @Input() set legend(legend: boolean) {
            legend = legend || false; // default false if undefined.
            this.plot.settings.legend = legend;
            this.plot.checkSettings();
        }

        /** Plot Controller Reference */
        plot: T;

        /** DOM reference associated with the plot controller */
        plotRef: any;

        /** DOM renderer service */
        protected _renderer: Renderer2;

        /** This Component's element reference */
        protected _el: ElementRef;

        /** Data subscription */
        protected _dataSub: Subscription;

        constructor(renderer: Renderer2, el: ElementRef) {
            this._renderer = renderer;
            this._el = el;
            this.plotRef = this._renderer.createElement('div');
            this._renderer.appendChild(this._el.nativeElement, this.plotRef);
        }

        /**
         * Checks the width of the outer element vs. the plot space to determine if
         * the plot needs to be resized.
         *
         * Note: If implemented in a subclass, you should call super first.
         */
        ngDoCheck() {
            if (this.plot !== undefined && this.plotRef !== undefined) {
                const plotHeight = this.plotRef.offsetHeight;
                const plotWidth = this.plotRef.offsetWidth;
                const elHeight = this._el.nativeElement.offsetHeight;
                const elWidth  = this._el.nativeElement.offsetWidth;
                if ((elHeight !== plotHeight) || (elWidth !== plotWidth)) {
                    this._renderer.setStyle(this.plotRef, 'height', elHeight + 'px');
                    this._renderer.setStyle(this.plotRef, 'width', elWidth + 'px');
                    this.plot.checkResize();
                }
            }
        }

        /**
         * Destroys the subscription if necessary.
         * 
         * Note: If implemented in a subclass, you should call super first.
         */
        ngOnDestroy() {
            this.clearDataSubscription();
        }

        /**
         * Handle the incoming plot data structure.
         * Derived classes should implement this method.
         */
        handleData(pd: PlotData): void {
            console.log('Received data');
        };

        /**
         * Unsubscribe from the data subscription to avoid possible memory leaks.
         */
        protected clearDataSubscription() {
            if (this._dataSub !== undefined) {
                this._dataSub.unsubscribe();
                this._dataSub = undefined;
            }
        }
}
