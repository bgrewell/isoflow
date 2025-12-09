![readme-header](https://user-images.githubusercontent.com/1769678/223572353-788d5d38-cd28-40fa-96cd-9d29226f7e4b.png)

<h4 align="center">
  <a href="https://codesandbox.io/p/sandbox/github/markmanx/isoflow">Online playground</a> |
  <a href="https://isoflow.io/docs">Developer docs</a> |
  <a href="https://github.com/markmanx/isoflow">Github</a> |
  <a href="https://discord.gg/QYPkvZth7D">Discord</a> |
  <a href="https://hub.docker.com/r/markmanx/isoflow/tags">Docker image</a>
</h4>

<div align="center">
    <h1>A React component for drawing network diagrams.</h1>
</div>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![CircleCI](https://circleci.com/gh/markmanx/isoflow.svg?style=shield)

</div>

## About Isoflow Community Edition
Isoflow is an open-core project. We offer the [Isoflow Community Edition](https://github.com/markmanx/isoflow) as fully-functional, open-source software under the MIT license.  In addition, we also support our development efforts by offering **Isoflow Pro** with additional features for commercial use.  You can read more about the differences between Pro and the Community Edition [here](https://isoflow.io/pro-vs-community-edition).

## Key features
- **Drag-and-drop editor** - Express your architecture with icons, regions and connectors.
- **Extensible icon system** - Create your own icon library, or use plugins for existing libraries including AWS, Azure, GCP, Kubernetes, and more.
- **Export options** - Export diagrams as code or images.

## Quick start

Install both the editor and isopacks from [npm](https://www.npmjs.com/package/isoflow):

- `npm install isoflow @isoflow/isopacks`

See our [documentation](https://isoflow.io/docs) for more information.

## Docker development environment

For local development using Docker, you can build and run Isoflow in a containerized environment.

### Building the Docker image

To build the Docker image locally:

```bash
docker build -t isoflow:dev .
```

This will:
1. Install all dependencies from `package.json`
2. Build the application using the `docker:build` script
3. Create a production-ready image with Nginx serving the built files

### Running the container

To run the container locally:

```bash
docker run -d -p 8080:80 --name isoflow-dev isoflow:dev
```

The application will be available at `http://localhost:8080`

### Development workflow with Docker

**Note:** The current Dockerfile uses a multi-stage build optimized for production deployments. It builds the application in one stage and serves the compiled output with Nginx in the final stage. This means the final image doesn't include source files or Node.js, making volume mounting for live development impractical.

For the best development experience with hot-reloading and live updates, we recommend running the development server directly on your host machine:

```bash
# Install dependencies
npm install

# Start the webpack dev server (runs on port 3000)
npm start
```

This will provide:
- Hot module replacement (HMR) for instant feedback
- Source maps for easier debugging
- Faster build times during development

If you prefer to develop entirely in Docker, you would need to create a separate development Dockerfile that keeps the Node.js environment and runs `npm start` instead of building static files.

### Stopping and removing the container

```bash
docker stop isoflow-dev
docker rm isoflow-dev
```

### Accessing the pre-built Docker image

Pre-built Docker images are also available on [Docker Hub](https://hub.docker.com/r/markmanx/isoflow/tags) if you prefer not to build locally.

## Professional support
For professional support, please consider purchasing a license for Isoflow Pro.  Isoflow Pro includes additional features and support options.  For more information, visit [isoflow.io](https://isoflow.io).

## Found a bug or need support?
Please report bugs and issues [here](https://github.com/markmanx/isoflow/issues), or on our [Discord server](https://discord.gg/QYPkvZth7D).