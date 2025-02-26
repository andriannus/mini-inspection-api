# Mini Inspection API

Mini Inspection API to provides car inspection services data.

## How to run locally

Start the development server on `http://localhost:3000`:

```bash
# Install dependencies
yarn install

# Create environment variables
cp .env.example .env

# Start development server
yarn start:dev
```

### Notes

- Please use the latest version of Node.js
- Please fill the `AWS_*` with your AWS S3 data and `MONGO_*` with your MongoDB data
