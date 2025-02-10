# Game interface to test acceptability of an expert elicitation on effective responses to meet 2030 wild pollinator abundance and diversity goals

This repository is the codebase for a web application based on [Angular](https://angular.dev/overview) which requires [npm package manager](https://www.npmjs.com/). 

Our pilot run trialled the single-player game at a workshop with policymakers at the European Land Owners Conference - ELO2024 - using the [v1.0.0](https://github.com/rosemckeon/elo2024/releases/tag/v1.0.0) codebase.

[The game](https://elo2024.rosemckeon.uk/A) is a tool which can be used to stimulate discussion around land management topics that effect wild pollinator populations. The model behind the game allows the user to interact with some of [the data gained from the expert elicitation](https://github.com/rosemckeon/elo2024/blob/main/R/meanscores.csv) in a visual manner. The user is presented with a landscape made of 3 habitat types (urban, agricultural and semi-natural). They are given the ability to enable and disable a handful of responses which were deemed effective by experts and they can see how the state of each habitat was predicted to change based on how the responses were scored. The user can be presented with two starting scenarios: 1) [degraded](https://elo2024.rosemckeon.uk/A), or: 2) [somewhat restored](https://elo2024.rosemckeon.uk/B). The purpose of these scenarios is to highlight how sustainability efforts have greater initial impact on degraded systems.

Led by [INRAE](https://www.inrae.fr/) for [SafeGuard](https://www.safeguard.biozentrum.uni-wuerzburg.de/), in collaboration with: [BioAgora](https://bioagora.eu/), [IUCN](https://iucn.org/), [ELO](https://europeanlandowners.org/), [University of Stirling](https://www.stir.ac.uk/), [Myreton](https://rosemckeon.uk/), and [Pen&Paper Science](https://www.penandpaper-sci.com/).

## Initial setup

Download a stable tagged version of this repository (Latest: [v1.0.0](https://github.com/rosemckeon/elo2024/releases/tag/v1.0.0)). A clone of `main` will include new development features not yet included in an official release and may not work as expected.

In the root directory:

1. Run `npm install` to install package dependencies (untracked).
2. Run `ng serve` to see a locally served version of the web application based on your clone.
3. Run `ng build` to build a deployable version of the web application based on your changes.

## Code structure

This application is built mainly in [TypeScript](https://www.typescriptlang.org/) using [Angular](https://angular.dev/overview). Services contain the majority of the functions and parameters, with some functionality being controlled by components. 

[Starting JSON data](https://github.com/rosemckeon/elo2024/blob/main/src/data/scenario-A.json) is loaded by the [landscape component](https://github.com/rosemckeon/elo2024/tree/main/src/app/landscape) and adjusted via the `advanceTime` function in the [round service](https://github.com/rosemckeon/elo2024/blob/main/src/app/round.service.ts). Most other services - for example, those that store player data, are required and utilised by the round service which is at the core of everything the application does.

Scripts in the [R folder](https://github.com/rosemckeon/elo2024/tree/main/R) generate JSON files from the [mean expert scoring data](https://github.com/rosemckeon/elo2024/blob/main/R/meanscores.csv) (and associated filtered subsets) provided in CSV format.

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
