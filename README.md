# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Configuration de l'envoi d'emails

### API PHP Externe

Le projet utilise une **API PHP externe** pour l'envoi d'emails. L'API est appelée directement depuis le frontend.

#### URLs de l'API

- **Développement local** : `http://localhost/mailing/`
- **Production** : `https://www.theta-ingenierie.com/mailing/`

L'URL est automatiquement détectée selon l'environnement (local ou production).

#### Format de l'API

L'API attend un POST JSON avec les paramètres suivants :

```json
{
  "email_from": "email-expediteur@gmail.com",
  "password": "mot-de-passe-smtp",
  "email_to": "thetaingenierie@gmail.com",
  "subject": "Sujet de l'email",
  "body": "<h1>Contenu HTML</h1>",
  "is_html": true,
  "name_from": "Nom Prénom"
}
```

#### Configuration

Le mot de passe pour l'API mailing est configurable via la variable d'environnement `NUXT_PUBLIC_MAILING_PASSWORD`.

**Développement local** :
- Par défaut : `bphe kijp ztyt etqh`
- Vous pouvez créer un fichier `.env` à la racine du projet :
  ```
  NUXT_PUBLIC_MAILING_PASSWORD=bphe kijp ztyt etqh
  ```

**Production** :
- Définir la variable d'environnement `NUXT_PUBLIC_MAILING_PASSWORD` sur votre plateforme d'hébergement avec la valeur : `vlol kqqd ccyg yxah`
- **Important** : Le préfixe `NUXT_PUBLIC_` est nécessaire pour exposer la variable au frontend dans Nuxt 3
- Cette variable est intégrée au moment du build, donc redéployez après l'avoir ajoutée

#### Débogage

Si vous rencontrez des erreurs lors de l'envoi d'emails :

1. **Vérifiez la console du navigateur** (F12) pour les erreurs
2. **Vérifiez que l'API PHP est accessible** à l'URL configurée
3. **Vérifiez que l'API PHP retourne le bon format** (`{ success: true/false, message: "..." }`)
4. **Vérifiez les logs de l'API PHP** côté serveur
