/**
 * Author:  Thomas Goodwin
 * Company: Geon Technologies, LLC
 */

import * as core from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BasePlot, IPlotColors, AxisSettings } from 'sigplot-ts';

import { PlotData } from './plot-data';

export const BASE_SIG_PLOT_COMPONENT_STYLES = [`:host { display: block }`];
export const BASE_SIG_PLOT_COMPONENT_TEMPLATE = `<!-- SigPlot -->`;

/**
 * The BaseSigPlot Component provides a basic, abstract class with interfaces
 * for data ingress, foreground/background color control, and x-Axis settings.
 * 
 * NOTE: Ensure your child class also implements DoCheck from angular core so 
 * that the ngDoCheck method gets called.
 * @abstract @class 
 */
@core.Component({
    template: BASE_SIG_PLOT_COMPONENT_TEMPLATE,
    styles:   BASE_SIG_PLOT_COMPONENT_STYLES
})
export abstract class BaseSigPlotComponent<T extends BasePlot>
    implements core.DoCheck, core.OnDestroy {

        /** Data Input interface */
        @core.Input() set data(d: Observable<PlotData>) {
            this.clearDataSubscription();
            if (d !== undefined) {
                this._dataSub = d.subscribe((pd) => this.handleData(pd));
            }
        }

        /**
         * Controls the foreground and background colors of the plot.  The
         * foreground color describes the labels, line markers, etc.
         */
        @core.Input() set colors(c: IPlotColors) {
            if (this.plot === undefined) {
                return;
            }
            this.plot.settings.colors = c;
            this.plot.checkSettings();
        }

        /**
         * X-Axis settings control.
         */
        @core.Input() set xAxisSettings(ax: AxisSettings) {
            if (this.plot === undefined) {
                return;
            }
            this.plot.settings.xinv = ax.inv;
            this.plot.settings.xmax = ax.max;
            this.plot.settings.xmin = ax.min;
            this.plot.settings.autox = ax.autoScale;
            this.plot.checkSettings();
        }

        /** Plot Controller Reference */
        plot:    T;

        /** DOM reference associated with the plot controller */
        plotRef: any;

        /** Data subscription */
        private _dataSub: Subscription;

        constructor(protected _renderer: core.Renderer2, protected _el: core.ElementRef) {
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
         * @abstract
         */
        abstract handleData(pd: PlotData): void;

        /**
         * Unsubscribe from the data subscription to avoid possible memory leaks.
         */
        private clearDataSubscription() {
            if (this._dataSub !== undefined) {
                this._dataSub.unsubscribe();
                this._dataSub = undefined;
            }
        }
}
