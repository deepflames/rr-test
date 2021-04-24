# RR test

## Getting started

To run this project on your local machine, clone this repo and follow the instructions below.

### Prerequisites

Make sure that the [NodeJS](https://nodejs.org/) is installed on your machine.

### Configuration

This project has some configuration:

- `.env` - configuration for the Azure AD
- `.nginx.conf` - nginx configuration

### Installing

- in the project folder make sure to run `install.cmd` or `npm install`
- use `npm run start` to start the development server
- use `npm run build` to build the project for production

### Docker

- make sure that the `.nginx.conf` file contains the correct `proxy_pass` field
- to use ssl, you must create a folder `.nginx/ssl` in the project root and add certificate to it
- use `build-docker.sh` to make the docker image and run a container
