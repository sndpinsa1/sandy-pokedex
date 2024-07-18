# Pokedex Project

Welcome to the Pokedex project! This is a modern web application built using React and TypeScript, with TailwindCSS for styling. The project follows a mobile-first approach to ensure a great user experience on all devices.

## Table of Contents

[Features](#features)
[Demo](#demo)
[Installation](#installation)
[Usage](#usage)
[Technologies Used](#technologies-used)


## Features

Browse and search for Pokémon.
View detailed information about each Pokémon.
Responsive design, optimized for mobile devices first.
Fast and efficient user interface.


## Installation

To get a local copy up and running, follow these steps:

Clone the repository:
    bash
    git clone https://github.com/sndpinsa1/sandy-pokedex.git
    cd sandy-pokedex
    


Install dependencies:
    bash
    npm install
    


Start the development server:
    bash
    npm start
    


Open your browser and visit:
    
    http://localhost:3000
    


## Usage

Once the application is up and running, you can start browsing and searching for Pokémon. Click on any Pokémon to view detailed information about it.

## Technologies and libraries Used

##### React: A JavaScript library for building user interfaces.
##### TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
##### TailwindCSS: A utility-first CSS framework for rapidly building custom designs.
##### PokeAPI: The RESTful API used to fetch Pokémon data.
##### pokenode-ts: PokeAPI with typescript support and caching
##### Redux/Toolkit: Used for managing state inside app

## Implementation Details:
The application is built using React with TypeScript. The UI is styled using TailwindCSS, a utility.
##### On Page load we are loading 24 pokemons at first
##### Using infinite scroll to load next 24 pokemons, when user reach the bottom of scroll we are make pokeAPI call with offset and limit.
##### Redux Toolkit is used to manage state of the app where we are managing all the filter, search, next and previous pokemon features state.
##### Used a pokenode-ts library which providing typed response for pokemon data
##### TailwindCSS is used for responsive mobile first apporach UI design.
##### Created shimmer UI for loading page to provide better user experience.
##### Project is deployed on Netlify (https://6686884148bdb3d142407404--tubular-scone-5ba8bc.netlify.app/)
