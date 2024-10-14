This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the docker compose

```bash
docker compose up
```

Export the database url to the environment

```bash
    export DATABASE_URL="postgres://postgres:postgres@localhost:5005/postgres"
```

Create a metamask wallet and add bloxberg network using the following credentials:

- RPC URL: https://core.bloxberg.org
- ChainID: 8995
- Currency symbol: bloxberg

## NOTE

Add your public key to the internalAccess array within utils/constants

##

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Cron Job for API Call in Docker Container
### Overview

This project contains a cron job that periodically calls an API to update validator details. The cron job is implemented in a Docker container and is scheduled to run every 5 minutes. Below is a detailed explanation of the setup.
### Cron Job Setup

The cron job is defined in the crontab file and is scheduled to run every 5 minutes:

```bash
*/5 * * * * /validator_dapp/callApi.sh 2>> /validator_dapp/logg.log
```

This command executes the callApi.sh script, which triggers a Node.js script that sends a POST request to the validator update API. Any errors encountered during execution are logged into logg.log.
### Dockerfile Setup

The cron job is copied into the Docker container using the following command in the Dockerfile.

```bash
COPY crontab /etc/crontabs/root
```

This ensures that the cron job is configured when the Docker container is built.
### API Call Script

The cron job executes a shell script (callApi.sh) which triggers the following Node.js code to make a POST request to the specified API endpoint.

```javascript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');


const callApi = async () => {

    try {

        const response = await axios.post('https://bloxberg-qa-traefik.mpdl.mpg.de/api/update-validators-details');

        console.log('API called successfully:', response.data);

    } catch (error) {

        console.log('Error calling API:', error);

    }

};


callApi();
```

### Note: SSL certificate verification is disabled for testing purposes by setting process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'. This should be removed in production.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
