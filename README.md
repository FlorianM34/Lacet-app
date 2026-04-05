# Lacet — Site web

Site marketing et d'administration pour [lacet.app](https://lacet.app), l'application mobile de matching pour randonnées en groupe.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** strict
- **Tailwind CSS**
- **Supabase** (mêmes variables que l'app mobile)
- Déployable sur **Vercel** sans configuration supplémentaire

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local
# → Remplir les valeurs dans .env.local

# 3. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Variables d'environnement

Copier `.env.local.example` → `.env.local` et remplir :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase (anon) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role (serveur uniquement) |
| `ADMIN_PASSWORD` | Mot de passe de la zone admin |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` ne doit **jamais** être exposé côté client. Il est utilisé uniquement dans les Server Components et API Routes.

## Structure des routes

```
/                       → Landing page publique
/privacy                → Politique de confidentialité
/terms                  → Conditions générales d'utilisation
/support                → Page support + formulaire de contact
/admin                  → Login admin (pas de lien public)
/admin/dashboard        → Stats générales (protégé par cookie)
/admin/dashboard/users  → Liste des utilisateurs paginée
```

## Déploiement sur Vercel

1. Pousser le repo sur GitHub
2. Importer le projet sur [vercel.com](https://vercel.com)
3. Dans **Settings → Environment Variables**, ajouter les 4 variables ci-dessus
4. Déployer — c'est tout

Vercel détecte automatiquement Next.js, aucune configuration supplémentaire n'est nécessaire.

## Schéma Supabase attendu

Le dashboard admin lit les tables suivantes. Adapter `lib/supabase-admin.ts` si les noms de colonnes diffèrent.

### `profiles`
| Colonne | Type | Description |
|---|---|---|
| `id` | uuid | Identifiant utilisateur |
| `created_at` | timestamptz | Date d'inscription |
| `display_name` | text | Nom affiché |
| `email` | text | Email |
| `avatar_url` | text | URL de l'avatar |
| `platform` | text | `'ios'` ou `'android'` |

### `hikes`
| Colonne | Type | Description |
|---|---|---|
| `id` | uuid | Identifiant de la rando |
| `created_at` | timestamptz | Date de création |
| `user_id` | uuid | FK → `profiles.id` |

## Sécurité admin

- Authentification via cookie `admin_session` (httpOnly, sameSite strict, 8h)
- Le token de session est un SHA-256 de `ADMIN_PASSWORD + ':lacet_admin_v1'`
- Le middleware Next.js (`middleware.ts`) protège toutes les routes `/admin/dashboard/*`
- Aucun lien vers `/admin` dans la navigation publique

## Pages légales

Les pages `/privacy`, `/terms` et `/support` contiennent des placeholders avec des commentaires `TODO`. À compléter avant le lancement.
