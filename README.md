# Angular Components for SigPlot

This package contains Angular Components that integrate with [SigPlot][sigplot] by way of [sigplot-ts][sigplot-ts].  

## Installation

To install this library, run:

```bash
$ npm install sigplot-ng --save
```

## Usage

In an Angular module where you would like to use the components, import the module:

```typescript
// Import the library
import { SigPlotComponentsModule } from 'sigplot-ng';

@NgModule({
  imports: [
    // ...other imports
    SigPlotComponentsModule
  ],
})
export class YourModule {}
```

You will then have access to the components, directives, etc. defined in this module.

## Available Components

The current list of components is described in the following table.

| Name | Selector | Description |
| ---- | -------- | ----------- |
| LineComponent | sigplot-line | A 1D line plot suitable for signals, FFTs, etc. |
| RasterComponent | sigplot-raster | A 2D (falling) raster plot (a.k.a., waterfall) |

Each of these components inherits from the BaseSigPlot Component, which provides basic data ingress and X-Axis controls as well as the instantiation of the associated plot controller class from [sigplot-ts][sigplot-ts].

Please see the associated documentation (in `docs`) for more details on usage and parameterization.


[sigplot]: https://github.com/LGSInnovations/sigplot
[sigplot-ts]: https://github.com/GeonTech/sigplot-ts

