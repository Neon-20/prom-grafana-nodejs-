# Prometheus + Grafana with Node.js (TypeScript) Service

This repository demonstrates how to set up Prometheus and Grafana to monitor a Node.js service written in TypeScript. Follow the steps below to get started.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker
- Docker Compose
- Node.js
- npm or yarn

## Steps

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Neon-20/prom-grafana-nodejs-.git
cd prometheus-grafana-nodejs
```

### 2. Install Node.js Dependencies

Navigate to the nodejs-service directory and install the dependencies:

```bash
cd nodejs-service
npm install
# or if you are using yarn
yarn install
```

### 3. Configure Prometheus

Prometheus configuration is located in the prometheus directory. You can modify the prometheus.yml file to scrape the Node.js service metrics:

```bash
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nodejs-service'
    static_configs:
      - targets: ['nodejs-service:3000']
```

### 4. Add DockerFile & docker-compose 

Starting grafana at localhost:3001 and prometheus at localhost:9090

```bash
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npm install --save-dev typescript


# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm","start" ]
```

docker-compose.yml 👇🏻

```bash
version: '3.8'

services:
  node-app:
    build: ./
    ports:
      - "3000:3000"
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./:/etc/prometheus
    ports:
      - "9090:9090"
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    networks:
      - monitoring
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

networks:
  monitoring:
```

### 5. Start the Services

Use Docker Compose to start Prometheus, Grafana, and the Node.js service:

```bash
docker-compose up
```

This command will start all the services in detached mode.
### 6. Access the Services

Prometheus: http://localhost:9090
Grafana: http://localhost:3000
Node.js Service: http://localhost:3001

