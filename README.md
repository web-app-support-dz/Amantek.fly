# AmanTek Fly — site web

Site vitrine en HTML / CSS / JavaScript classique (aucun framework, aucune étape de build).

## Lancer en local
Ouvrir `index.html` dans le navigateur (double-clic), ou, depuis ce dossier :
`python -m http.server 8000` puis http://localhost:8000

## Structure
```
amantek-fly/
├── index.html          Structure HTML unique (site "une seule page" : go('page') affiche une vue)
├── css/                Chargés dans cet ordre (ordre = cascade d'origine, ne pas inverser)
│   ├── base.css        Reset, tokens, utilitaires, navbar, composants communs, logo
│   ├── home.css        Accueil (pourquoi / comment / CTA)
│   ├── about.css  how.css  listings.css  faq.css  contact.css
│   ├── legal.css       CGU + Politique de confidentialité
│   └── footer.css      Bandeau application + footer
├── js/                 Chargés avec defer, dans l'ordre d'origine
│   ├── home.js about.js how.js listings.js faq.js contact.js legal.js footer.js   (animations par vue)
│   ├── main.js         go(), menu mobile, langue FR/AR, toasts, FAQ, filtres, formulaires, cookies
│   └── icons.js        Initialisation des icônes Lucide (enveloppe go())
└── assets/images/      logoo.jpg · le logo.png · steps-bg-brand.png · app-mobile.png
```

## Vues (ids dans index.html)
home · about · how · listings · faq · contact · login · register · cgu · privacy
Navigation : `onclick="go('about')"` → affiche `#page-about`.

## Points d'attention
- Copier vos 4 images dans `assets/images/` (noms inchangés).
- Les formulaires (contact, connexion, inscription) n'ont aucun backend : ils ne font qu'afficher un retour à l'écran.
- Icônes : Lucide chargé depuis unpkg (`@latest`) → connexion internet requise.
