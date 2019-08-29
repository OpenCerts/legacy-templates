# Legacy Renderer Repository

This application serves up the OpenCert template renderers for SSG Accredited institutions submitted prior to 31st Dec 2019.

See also:

* [opencerts-documentation](https://github.com/OpenCerts/opencerts-documentation)
* [open-certificate](https://github.com/OpenCerts/open-certificate)
* [certificate-contract](https://github.com/OpenCerts/certificate-store-contract)
* [certificate-cli](https://github.com/OpenCerts/certificate-cli)

## Setup

### OS X / Linux
```bash
npm install
npm run dev
```

### Windows

For Windows you need to set up the toolchain for node-gyp before installing this repository, follow the instructions in https://github.com/nodejs/node-gyp#on-windows.

```bash
npm install
npm run dev
```

## Development

The expected output of running `npm run dev` is a blank screen, as this page is not a standalone application. It expects the caller to inject the certificate that is meant to be rendered.
For development purposes, there are two methods to effect the rendering of a certificate:
1) Inject the certificate using the browser developer console, by running the command `window.opencerts.renderDocument(certificate)`, where the `certificate` variable has been initialised with the certificate contents
2) Run this `legacy-templates` repository using `npm run dev` and keep it running, then run the `opencerts-website` repository concurrently with the `npm run start:local` command. You can then preview rendering using the usual OpenCerts.io UI at http://localhost:3001.

### Troubleshooting

To enable debug logs in the browser, set `localStorage.debug="*"`

###### Module build failed

If you see module build failure message like:
```
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):
Error: ENOENT: no such file or directory, scandir 'D:\opencerts-website\node_modules\node-sass\vendor'
at Object.readdirSync (fs.js:783:3)
```

Try running `npm rebuild`

