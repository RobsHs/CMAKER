# Localization & Internationalization Guide

CMAKER supports modular locale dictionaries. Currently supported:
- **English (EN)**
- **Bahasa Indonesia (ID)**

## Adding a New Locale
1. Open `src/i18n/translations.ts`.
2. Define a new locale object implementing the `TranslationDictionary` interface.
3. Register the locale code in `src/types/i18n.ts`.
4. Ensure all template names, category labels, and studio tools have corresponding translations.
