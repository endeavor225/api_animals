# API Animals - AdonisJS

Une API RESTful pour la gestion d'animaux construite avec AdonisJS 6.

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Base de données (PostgreSQL, MySQL, ou SQLite)

## 🚀 Installation

1. **Cloner le projet**

   ```bash
   git clone <url-du-repo>
   cd api_animals
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer l'environnement**

   ```bash
   cp .env.example .env
   ```

   Puis éditer le fichier `.env` avec vos configurations :

   ```env
   PORT=3333
   HOST=localhost
   NODE_ENV=development
   APP_KEY=your-app-key-here

   # Base de données
   DB_CONNECTION=sqlite
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_DATABASE=api_animals
   ```

4. **Générer la clé d'application**

   ```bash
   node ace generate:key
   ```

5. **Exécuter les migrations**
   ```bash
   node ace migration:run
   ```

## 🛠️ Scripts disponibles

### Développement

```bash
# Démarrer le serveur de développement
npm run dev
# ou
node ace serve --watch

# Démarrer le serveur en mode production
npm start
# ou
node bin/server.js
```

### Base de données

```bash
# Créer une nouvelle migration
node ace make:migration create_animals_table

# Exécuter les migrations
node ace migration:run

# Annuler la dernière migration
node ace migration:rollback

# Remettre à zéro la base de données
node ace migration:reset

# Actualiser la base de données (reset + run)
node ace migration:refresh

# Vérifier le statut des migrations
node ace migration:status
```

### Modèles et contrôleurs

```bash
# Créer un modèle
node ace make:model Animal

# Créer un contrôleur
node ace make:controller AnimalsController

# Créer un middleware
node ace make:middleware AuthMiddleware

# Créer un validateur
node ace make:validator CreateAnimalValidator
```

### Tests

```bash
# Exécuter tous les tests
npm test
# ou
node ace test

# Exécuter les tests en mode watch
npm run test:watch
```

### Autres commandes utiles

```bash
# Afficher toutes les routes
node ace list:routes

# Lancer la console interactive (REPL)
node ace repl

# Vérifier la syntaxe TypeScript
npm run typecheck

# Linter le code
npm run lint

# Formater le code
npm run format
```

## 📁 Structure du projet

```
├── app/
│   ├── controllers/          # Contrôleurs de l'API
│   ├── middleware/          # Middlewares personnalisés
│   ├── models/              # Modèles de données
│   ├── validators/          # Validateurs de requêtes
│   └── exceptions/          # Gestionnaires d'exceptions
├── config/                  # Fichiers de configuration
├── database/
│   ├── migrations/          # Migrations de base de données
│   └── seeders/            # Données de test
├── start/                   # Fichiers de démarrage
├── tests/                   # Tests automatisés
├── bin/                     # Scripts exécutables
└── public/                  # Fichiers statiques
```

## 🔧 Configuration

### Base de données

Le projet supporte plusieurs bases de données. Configurez votre connexion dans `.env` :

**SQLite (par défaut)**

```env
DB_CONNECTION=sqlite
DB_DATABASE=./database/database.sqlite
```

**PostgreSQL**

```env
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_DATABASE=api_animals
```

**MySQL**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=api_animals
```

### CORS

Pour configurer CORS, éditez `config/cors.ts` :

```typescript
{
  enabled: true,
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  // ...
}
```

## 🔐 Authentification

Le projet inclut un système d'authentification JWT. Les routes protégées utilisent le middleware `auth`.

### Commandes d'authentification

```bash
# Créer un utilisateur via la console
node ace repl
# Puis dans la console :
# await User.create({email: 'test@example.com', password: 'password'})
```

## 📊 API Endpoints

### Authentification

```
POST /api/auth/login     # Connexion
POST /api/auth/register  # Inscription
POST /api/auth/logout    # Déconnexion
GET  /api/auth/me        # Profil utilisateur
```

### Animals (exemple)

```
GET    /api/animals      # Liste des animaux
GET    /api/animals/:id  # Détail d'un animal
POST   /api/animals      # Créer un animal
PUT    /api/animals/:id  # Modifier un animal
DELETE /api/animals/:id  # Supprimer un animal
```

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests d'un fichier spécifique
node ace test tests/functional/animals.spec.ts
```

## 📦 Déploiement

### Construction pour la production

```bash
npm run build
```

### Variables d'environnement de production

```env
NODE_ENV=production
PORT=3333
APP_KEY=your-production-key
DB_CONNECTION=pg
# ... autres variables
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub ou contactez l'équipe de développement.

---

**Développé avec ❤️ et AdonisJS**
