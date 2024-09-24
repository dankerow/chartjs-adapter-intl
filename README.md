# chartjs-adapter-intl

[![npm](https://img.shields.io/npm/v/chartjs-adapter-intl.svg?style=flat-square)](https://www.npmjs.com/package/chartjs-adapter-intl)
[![npm](https://img.shields.io/npm/dm/chartjs-adapter-intl.svg?style=flat-square)](https://www.npmjs.com/package/chartjs-adapter-intl)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dankerow/chartjs-adapter-intl/test.yml?branch=master&style=flat-square)](https://github.com/dankerow/chartjs-adapter-intl/actions/workflows/test.yml)

## Introduction

`chartjs-adapter-intl` is a date adapter for [Chart.js](https://www.chartjs.org/) that uses the native `Intl.DateTimeFormat` API for date formatting and parsing.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **3.0.0** or later.

**Note:** once loaded, this adapter overrides the default date-adapter provided in Chart.js (as a side effect).

## Installation

You can install this adapter via pnpm:

```sh
pnpm add chartjs-adapter-intl
```

via npm:

```sh
npm install chartjs-adapter-intl
```

via yarn:

```sh
yarn add chartjs-adapter-intl
```

### CDN

By default, `https://cdn.jsdelivr.net/npm/chartjs-adapter-intl` returns the latest (minified) version, however it's [highly recommended](https://www.jsdelivr.com/features) to always specify a version in order to avoid breaking changes. This can be achieved by appending `@{version}` to the URL:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@^3"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-intl"></script>
```

Read more about jsDelivr versioning on their [website](http://www.jsdelivr.com/).

## Usage

To use this adapter, you need to import it into your project. The adapter will automatically register itself with Chart.js.

```javascript
import { Chart } from 'chart.js';
import 'chartjs-adapter-intl';

const config = {
  type: 'line',
  data: {
    datasets: [{
      data: [
        { x: '2023-01-01T00:00:00Z', y: 10 },
        { x: '2023-01-02T00:00:00Z', y: 20 }
      ]
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  }
};

const myChart = new Chart(document.querySelector('#myChart'), config);
```

## Configuration

This adapter supports the following configuration options:

- `locale`: The locale to use for formatting dates. Defaults to `'en-US'`.

```javascript
const config = {
  type: 'line',
  data: {
    datasets: [{
      data: [
        { x: '2023-01-01T00:00:00Z', y: 10 },
        { x: '2023-01-02T00:00:00Z', y: 20 }
      ]
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        adapters: {
          date: {
            locale: 'fr-FR'
          }
        },
        time: {
          unit: 'day'
        }
      }
    }
  }
};

const myChart = new Chart(document.querySelector('#myChart'), config);
```

## Development

To build the project, run:

```sh
pnpm run build
```

To run tests, use:

```sh
pnpm test
```

## License

`chartjs-adapter-intl` is available under the [MIT license](https://opensource.org/licenses/MIT).
