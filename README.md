# Angular Components for SigPlot

## Installation

To install this library, run:

```bash
$ npm install sigplot-ng --save
```

## Usage

In an Angular module where you would like to use the components, import the module:

```typescript
// Import the library
import { SigPlotModule } from 'sigplot-ng';

@NgModule({
  imports: [
    // ...other imports
    SigPlotModule
  ],
})
export class YourModule {}
```

You will then have access to the components defined in this module such as the LinePlot and RasterPlot.
