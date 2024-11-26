# Game

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

If your served files are in a state of error and you can't quit to reload, you may need to manually kill the process while you sort it out. In that case, you can do `sudo kill -9 $(sudo lsof -t -i:4200)`, or get the PID with `ps aux | grep "ng serve"` and then `kill -9 <PID>` (on mac the -9 is needed).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Manual deployment with Nginx

We need to serve the index file in /dist/whatever/browser.

Set server root to the browser folder and add index.csr.html to the server location for /.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

# Code structure

All the functions and the majority of the variables used are contained within two services, round and habitat.

The starting data is loaded by the landscape component and adjusted via the advanceTime function in the round service which makes calls to everything else.