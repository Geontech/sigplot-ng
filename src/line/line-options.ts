import { InjectionToken } from '@angular/core';
import { ConstructorOptions } from 'sigplot-ts';

/**
 * Setup the initial options for the line plot.
 * See comments for what these flags 'do' for a type 1000 plot, as they
 * differ from a type 2000.
 */
export function defaultLineOptions(): ConstructorOptions {
    const options = new ConstructorOptions();
    options.pan = true;          // 1.\   Show specs w/o glitching or 
    options.specs = true;        // 2. -> disappearing, provide legend
    options.show_readout = true; // 3./   toggle button.
    options.grid = true;         // Show the grid
    options.legend = true;       // Show legend initially
    options.show_x_axis = true;  // X Label in title region
    options.show_y_axis = true;  // Y Label in title region
    return options;
}

/** Token for modifying the configuration of the plot instance */
export let LINE_PLOT_OPTIONS = new InjectionToken<ConstructorOptions>('line-plot.options');
