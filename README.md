# Krashna Members App

A full-stack MERN application for internal use by the Krashna Musika association (Delft, NL).

## Installation

To get started, you'll need the [Node.js environment](https://nodejs.org) and the [Yarn package manager](https://yarnpkg.com).

Now, create the following configuration files:

**A `.env` file in the `server`:**

```text
SERVER_PORT=3333
JWT_SECRET=aUniqueSecret
BASE_URL=http://localhost:3000
FROM_EMAIL=you@example.com
MAILGUN_DOMAIN=example.com
MAILGUN_API_KEY=12345...
```

**A `valid-emails.json` file in the `server` folder:**

```json
["emailno1thatyouallow@example.com", "emailno2thatyouallow@example.com"]
```

You can now follow the steps below to get a development or production environment going:

### Development

First, run the following command from this directory:

```bash
yarn
```

Open two terminals with this directory as working directory.

In one of them, run the following commands:

```bash
cd frontend
yarn
yarn start
```

In the other, run the following commands:

```bash
cd server
yarn
yarn start
```

### Production

Run the following commands for a production run:

```bash
yarn
cd frontend
yarn
yarn build
cd server
yarn
yarn start
```

## Security

If you discover any security-related issues, please email webcie@krashna.nl instead of using the issue tracker.

## Credits

Development by the Krashna WebCie (web commission).

Authentication setup inspired by [this GitHub repository](https://github.com/paigen11/mysql-registration-passport).
