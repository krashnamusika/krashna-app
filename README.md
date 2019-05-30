# Krashna Members App

A full-stack web application for internal use by the Krashna Musika association (Delft, NL).

## Installation

To get started, you'll need JDK 8 or higher, the [Node.js environment](https://nodejs.org), and the [Yarn package manager](https://yarnpkg.com).

Now, create the following a `config.properties` file in `src/main/resources`:

```text
BASE_URL=http://localhost:3000
FROM_NAME=you@example.com
FROM_EMAIL=you@example.com
MAILGUN_DOMAIN=example.com
MAILGUN_API_KEY=12345...
```

Follow the steps below to get a development or production environment going:

### Development

Open two terminals with this directory as working directory.

In one of them, run the following commands:

```bash
./gradlew 
```

In the other, run the following commands:

```bash
cd frontend
yarn
yarn start
```

### Production

TODO

## Security

If you discover any security-related issues, please email webcie@krashna.nl instead of using the issue tracker.

## Credits

Development by the Krashna WebCie (web commission).
