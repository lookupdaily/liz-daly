# My developer website

[lizdaly.dev](https://lizdaly.dev/)

About me as a developer—my interests, experience and projects. Built with [11ty](https://www.11ty.dev/).

## Local development

The project can be setup using npm, or scripts to rule them all

### Requirements

- Npm
- Node.js 20.x

### Getting started 

First, install dependencies by opening a terminal and running:

```bash
script/setup
```

To build project and and run on a local server, open a terminal inside the project and run:


```bash
script/server
```

To run linting checks type:

```bash
script/test
```

## Docker

Alternatively, you can run the application in a docker container. This will prevent the need to set up dependencies locally. 

1. Start the docker engine
2. Open a terminal inside the project and run:

```bash
# start
npm run docker:start

#stop
npm run docker:stop
```

You will need to stop and start docker to reflect any changes in the project.

## Tests

This project does not have any unit tests, as it made up of static views with some minimal JavaScript imported from my [@lookupdaily/styles](https://github.com/lookupdaily/styles) package. 

I have a suite of automated Playwright Tests to enable automated a11y testing for each page and for any interactivity (such as the collapsed menu on small screens).

### Run tests

1. Copy `.env.example` to a new `.env` file in the route of the project. 
2. Make sure you have installed dependencies by running `script/setup`.
3. Start the app, either [from the command line](#local-development) or [using Docker](#docker).
4. Open a new terminal inside the project and run any of the following:

```bash
# run all tests in all browsers
npm run test:e2e 

# run all tests in chromium and record a trace
npm run test:e2e:trace

# run tests in UI mode
npm run test:e2e:ui
```

See the Playwright docs for [different ways to run and debug tests](https://playwright.dev/docs/running-tests).