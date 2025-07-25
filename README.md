[![Build and deploy](https://github.com/open-pioneer/trails-community/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/open-pioneer/trails-community/actions/workflows/test-and-build.yml) [![Audit dependencies (daily)](https://github.com/open-pioneer/trails-community/actions/workflows/audit-dependencies.yml/badge.svg)](https://github.com/open-pioneer/trails-community/actions/workflows/audit-dependencies.yml)

# Open Pioneer Trails - Community Packages

This repository contains various Open Pioneer Trails packages developed and provided by the Trails community.

Please note that theses packages are managed by the community and not officially part of the Open Pioneer Trails framework. Therefore, the levels of functionality, testing and maintenance can vary greatly for each individual package.  
Please try to get in touch with the author of the package if you have any questions about its use or if you are considering making your own adjustments or extensions.

- Samples: [latest](https://open-pioneer.github.io/trails-demo/community/dev/) | [dev](https://open-pioneer.github.io/trails-demo/community/dev/) 
- API Documentation: [latest](https://open-pioneer.github.io/trails-demo/community/dev/docs/) | [dev](https://open-pioneer.github.io/trails-demo/community/dev/docs/)
- [User manual](https://github.com/open-pioneer/trails-starter/tree/main/docs)

See [See also](#see-also) for API docs of other trails packages.

## Quick start

Ensure that you have [Node](https://nodejs.org/en/) (Version 20 or later) and [pnpm](https://pnpm.io/) (Version 10.x) installed.

Then execute the following commands to get started:

```bash
$ git clone https://github.com/open-pioneer/trails-community.git # Clone the repository
$ cd trails-community
$ pnpm install                                                   # Install dependencies
$ pnpm run dev                                                   # Launch development server
```

Vite will print the project's local address (usually <http://localhost:5173/>).
Point your browser at it and start programming!

## See also

- [Trails Starter](https://github.com/open-pioneer/trails-starter): Project to get started with the Open Pioneer Trails web client framework; contains minimal samples.
- [Core packages](https://github.com/open-pioneer/trails-core-packages): Contains the runtime package and other central packages.
- [OpenLayers base packages](https://github.com/open-pioneer/trails-openlayers-base-packages): Contains packages using OpenLayers to render a map.
- [Build tools](https://github.com/open-pioneer/trails-build-tools): Contains our build tooling such as the Vite plugin.

## Packages

This repository publishes the following packages:

<!--
  List packages:

  $ pnpm ls -r --depth -1 --json | jq ".[].name"

  NPM badges: See https://shields.io/badges/npm-version
-->

| Name                                                                 | Version                                                                                                                                           |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@open-pioneer-community/window](./src/packages/window/)   | [![NPM Version](https://img.shields.io/npm/v/%40open-pioneer-community%2Fwindow)](https://www.npmjs.com/package/@open-pioneer-community/window)   |

## License

Apache-2.0 (see `LICENSE` file)

## How to contribute

The packages contained in this repository are published using the [Apache 2.0 license](#license). All contributions must therefore be compliant with the same license.  
Please also read our [contribution guide](https://github.com/open-pioneer/trails-starter/blob/main/docs/Contributing.md).
