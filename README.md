# Game interface to test acceptability of an expert elicitation on effective responses to meet 2030 wild pollinator abundance and diversity goals

Our pilot run trialled the game at a workshop with policymakers at the European Land Owners Conference - ELO2024.

It requires [npm package manager](https://www.npmjs.com/). 

## Initial setup

Clone a stable tagged version of this repository. In the root directory:

1. Run `npm install` to install package dependencies (untracked).
2. Run `ng serve` to see a locally served version of the web application based on your clone.
3. Run `ng build` to build a deployable version of the web application based on your changes.

## Code structure

This application is built mainly in TypeScript using [Angular](https://github.com/angular/angular-cli). Services contain the majority of the functions and parameters. 

Starting JSON data is loaded by the landscape component and adjusted via the `advanceTime` function in the round service. Most other services - for example, those that store player data, are required and utilised by the round service which is at the core of everything the application does.

Scripts in the R folder generate JSON files from data provided in CSV format.

This application is set up to optionally store played game history via an API. Any API can be used by adjusting the save data service.

## Angular Basics

The base project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

### Development server

Run `ng serve` in the root folder for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

If your served files are in a state of error and you can't quit to reload, you may need to manually kill the process while you sort it out. In that case, you can do `sudo kill -9 $(sudo lsof -t -i:4200)`, or get the PID with `ps aux | grep "ng serve"` and then `kill -9 <PID>` (on mac the -9 is needed).

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

NB: New files with randomised names are generated each build - they will not directly overwirite previous server files.

#### Manual deployment with Nginx

Serve the index file in `/dist/whatever/browser` by setting the server root to point to that path and add `index.csr.html` to the server location for `/`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
