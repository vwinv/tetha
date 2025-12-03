# Configuration des Variables d'Environnement sur O2switch

## Variable à configurer : `NUXT_PUBLIC_MAILING_PASSWORD`

### Valeur en production
```
vlol kqqd ccyg yxah
```

### Instructions pour O2switch

O2switch ne permet pas toujours de configurer des variables d'environnement de manière standard. Voici plusieurs méthodes selon votre configuration :

#### Option 1 : Via le Panneau d'Administration O2switch

1. **Connectez-vous à votre espace client O2switch**
2. **Recherchez la section "Variables d'environnement"** ou **"Environment Variables"**
3. **Ajoutez une nouvelle variable** :
   - **Nom** : `NUXT_PUBLIC_MAILING_PASSWORD`
   - **Valeur** : `vlol kqqd ccyg yxah`
4. **Sauvegardez** et **redéployez** votre site

#### Option 2 : Via SSH (si disponible)

Si vous avez accès SSH à votre serveur O2switch :

1. **Connectez-vous via SSH** :
   ```bash
   ssh votre-utilisateur@votre-domaine.com
   ```

2. **Créez ou modifiez le fichier `.env`** dans le dossier de votre projet :
   ```bash
   cd ~/votre-dossier-projet
   echo "NUXT_PUBLIC_MAILING_PASSWORD=vlol kqqd ccyg yxah" >> .env
   ```

3. **Redéployez votre site** (ou redémarrez le serveur si nécessaire)

#### Option 3 : Configuration dans le code (non recommandé pour la sécurité)

⚠️ **Attention** : Cette méthode expose le mot de passe dans le code. Utilisez-la uniquement en dernier recours.

Modifiez `nuxt.config.ts` :

```typescript
public: {
  mailingPassword: process.env.NUXT_PUBLIC_MAILING_PASSWORD || 'vlol kqqd ccyg yxah' // Production par défaut
}
```

**Puis reconstruisez le site** :
```bash
npm run build
```

### Vérification

Pour vérifier que la variable est bien configurée :

1. **Ouvrez votre site en production**
2. **Ouvrez la console du navigateur** (F12)
3. **Dans l'onglet Network**, vérifiez les requêtes à `/mailing/`
4. **Dans le payload de la requête**, vérifiez que le champ `password` contient bien `vlol kqqd ccyg yxah`

### Important

- ⚠️ Le préfixe `NUXT_PUBLIC_` est **obligatoire** pour que la variable soit accessible côté client
- ⚠️ Les variables `NUXT_PUBLIC_*` sont **intégrées au moment du build**
- ⚠️ Si vous ajoutez la variable **après le build**, vous devez **reconstruire** et **redéployer** le site
- ⚠️ Le mot de passe sera **visible dans le code JavaScript** côté client (c'est une variable publique)

### Contact Support O2switch

Si vous ne trouvez pas comment configurer les variables d'environnement :

1. **Contactez le support O2switch** et demandez comment configurer des variables d'environnement pour Nuxt.js
2. **Indiquez** que vous avez besoin de configurer `NUXT_PUBLIC_MAILING_PASSWORD`
3. **Mentionnez** que c'est pour un site Nuxt 3 avec un preset `static`

### Alternative : Modifier directement dans le code pour la production

Si O2switch ne permet pas de configurer des variables d'environnement, vous pouvez créer un fichier de configuration différent pour la production :

1. Créer `nuxt.config.prod.ts` avec le mot de passe de production
2. Utiliser une logique conditionnelle pour détecter l'environnement
3. Ou simplement changer la valeur par défaut avant de build pour la production

### Commandes utiles

**Build pour la production** :
```bash
npm run build
```

**Vérifier les variables d'environnement** :
```bash
# Dans votre terminal local
echo $NUXT_PUBLIC_MAILING_PASSWORD
```

**Build avec variable spécifique** :
```bash
NUXT_PUBLIC_MAILING_PASSWORD="vlol kqqd ccyg yxah" npm run build
```

