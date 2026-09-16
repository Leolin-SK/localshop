# LocalShop

Application web de commerce local simplifié.

LocalShop permet aux clients de consulter un catalogue de produits, d'ouvrir une fiche détail et de gérer un panier. Un espace administrateur permet d'ajouter, modifier et supprimer des produits.

## Technologies

- **Frontend :** React (Vite), React Router, Context API, Tailwind CSS
- **Backend :** Laravel (API REST), Laravel Sanctum
- **Base de données :** SQLite (développement)

## Fonctionnalités

### Front-office
- Catalogue de produits visibles
- Fiche détail produit
- Panier (ajout, modification de quantité, suppression)
- Inscription et connexion

### Back-office (admin)
- Liste des produits
- Ajout d'un produit
- Modification d'un produit
- Suppression d'un produit
- Gestion de la visibilité et du stock

## Prérequis

- PHP 8.2+
- Composer
- Node.js 18+
- npm

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Leolin-SK/localshop.git
cd localshop
```

### 2. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configurer la base dans `.env` (exemple SQLite) :

```env
DB_CONNECTION=sqlite
```

Créer le fichier SQLite si besoin :

```bash
# Windows
type nul > database\database.sqlite

# Linux / Mac
touch database/database.sqlite
```

Lancer les migrations et le seeder :

```bash
php artisan migrate:fresh --seed
php artisan serve
```

API disponible sur : `http://127.0.0.1:8000`

### 3. Frontend (React)

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

Application disponible sur : `http://localhost:5173`

## Comptes de test

| Rôle  | Email                 | Mot de passe |
|-------|------------------------|--------------|
| Admin | admin@localshop.test   | password     |
| Client| client@localshop.test  | password     |

## API principale

| Méthode | Route                      | Accès        | Description                |
|---------|----------------------------|--------------|----------------------------|
| GET     | /api/products              | Public       | Liste des produits visibles|
| GET     | /api/products/{id}         | Public       | Détail d'un produit        |
| POST    | /api/register              | Public       | Inscription                |
| POST    | /api/login                 | Public       | Connexion                  |
| GET     | /api/admin/products        | Admin        | Liste admin                |
| POST    | /api/admin/products        | Admin        | Créer un produit           |
| PUT     | /api/admin/products/{id}   | Admin        | Modifier un produit        |
| DELETE  | /api/admin/products/{id}   | Admin        | Supprimer un produit       |

## Tests

### Backend

```bash
cd backend
php artisan test
```

### Frontend (Selenium IDE)

Scénarios enregistrés dans le fichier `LocalShop.side` :
- Accueil
- Fiche produit

## Auteur

Projet réalisé dans le cadre du cours **Développement Web — Niveau Approfondi** par KAMENI Léolin Styve.
