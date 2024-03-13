## Steps to bootstrap next-google-auth

### Clone the Repo

```bash
git clone https://github.com/Navin-Jethwani-76/next-google-auth
```

### Installing Dependencies

```bash
npm install
```

**_NOTE:_** Follow [these steps](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) to setup your **Web Application** in [Google Cloud Console](https://console.cloud.google.com).

### Add env variables in `.env.local` file

```bash
GOOGLE_CLIENT_ID=your_client_id
JWT_SECRET=your_jwt_secret
AUTH_TOKEN_NAME=authToken #any other name you prefer
```

### Starting Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you face any issues with this guide, [Open a New Issue on Github](https://github.com/Navin-Jethwani-76/next-google-auth/issues)

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com).

[![Vercel](https://camo.githubusercontent.com/b9ff564d8c311812747f1aacea54cf703d850756f9179f9eff6899da20a701a2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657263656c2d2532333030303030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d76657263656c266c6f676f436f6c6f723d7768697465)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FNavin-Jethwani-76%2Fnext-google-auth&showOptionalTeamCreation=false)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
