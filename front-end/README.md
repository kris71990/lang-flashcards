# Language Flashcards - Frontend

**Author:** Kris Sakarias

**Version** 2.0.0

## Overview

This is a flaschard app that helps people learn useful vocabulary and terminology in various languages. Users can select a language to practice, along with their desired direction of translation, and are presented with a collection of words and useful vocabulary to practice. 

The frontend is a **React** app with application state managed by **Redux**. **Babel** is used as the transpiler, and **Webpack** as the bundler.

----

## Getting Started

1. Clone the parent repo: `git clone https://github.com/kris71990/lang-flashcards.git`
2. Create a `.env` file in the frontend directory and include the environment variables listed below
3. `npm i` to install necessary node modules

**Environment variables**

- `PORT=9000`
- `NODE_ENV=development`
- `API_URL=http://localhost:3000`

**Start the Webpack Dev Server**

From the root of the frontend directory, start the webpack dev server with `npm run watch`.

----

## Documentation

**Component Architecture**
```
              App
               |
    Header, Footer, Landing
     /         |   /       \
AuthForm       |  /   LanguageMenu
    |          | /    LanguageChoicePanel
ProfileView ---|/     TranslationChoice
                            |    
                      CardsContainer   
                        /       \
                    CardView   WordForm
```

**Component Functionality**

- `App`
  - Root component
  - Renders `Header`, `Footer`
  - Depending on route, renders `Landing`, `ProfileView`, or `CardsContainer`

- `Header`
  - Holds nav menu that links to the homepage, profile, or login/logout

- `AuthForm`
  - Allows user to sign up or log in
  - Signup requires `username`, `password`, and `email`
  - Login requires valid `username` and `password`
  - Successful authentication redirects to `Landing`

- `Landing`
  - Homepage of application
  - Renders `LanguageChoicePanel`, `LanguageMenu`, and `TranslationChoice`

- `LanguageMenu`
  - Toggles to add additional languages to `LanguageChoicePanel`

- `LanguageChoicePanel`
  - User selects a language from this component

- `TranslationChoice`
  - User selects a direction of translation to practice (english to target language or vice versa)

- `CardsContainer`
  - Container component that conditionally renders `CardView` and `WordForm`

- `CardView`
  - Main flashcard component
  - Displays a flashcard section and a language info section
  - Flashcard section allows user to cycle through words, tracks user score, shows hints, and provides function to add more words via `WordForm`

- `WordForm`
  - Adds words to a language 
  - Fill out form with this data:
    - `English` - word in english (required)
    - `{ Local Language }` - word in target language (required)
    - `Latinization` - if language is not in the latin alphabet, latinization if the word
    - `Part of Speech` - dropdown menu to describe the word's part of speech (required) 
    - `Category` - dropdown menu to describe category of word (required)
  - Fields can be added to add more than one word at once

- `ProfileView`
  - Entered from `Header`
  - Displays name and profile age
  - Displays table of languages and language data that the user has practiced


## Testing

