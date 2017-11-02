import { InjectionToken } from '@angular/core';
import { ConstructorOptions } from 'sigplot-ts';

/**
 * Setup the initial options for a (falling) raster plot.
 * See comments for what these flags 'do' for a type 2000 plot, as they
 * differ from type 1000.
 */
export function defaultRasterOptions(): ConstructorOptions {
    let options = new ConstructorOptions();
    // Provides area for and enables x, y labels, axes w/ ticks, etc.
    options.specs = true;
    // Shows scroll bars, specs panel, colorbar, legend button
    options.pan = true;
    // Show legend initially with signal name.
    options.legend = true;
    return options;
}

/** Token for modifying the configuration of the plot instance */
export let RASTER_PLOT_OPTIONS = new InjectionToken<ConstructorOptions>('raster-plot.options');
