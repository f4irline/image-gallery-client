# PIEC - Image Gallery

Android Image Gallery application - Share your world!

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Application](#application)

### Introduction

The application was made as a course project. The purpose of the project was to
learn developing cross-platform applications using React Native.

The application also utilizes a backend to store data such as images, comments,
users etc. The backend is implemented in Kotlin with Spring Boot framework. The
backend implementation can be found
[here](https://github.com/f4irline/image-gallery-api).

### Features

-   User can discover images that other users have uploaded
-   User can upload images
-   User can comment on images
-   User can upvote/downvote on images
-   User has own profile to view user's own images and comments

### Technologies

-   React Native
-   Redux
-   Expo

### Setup

The built .apk for Android devices can be downloaded from
[releases](https://github.com/f4irline/image-gallery-client/releases/tag/v1.0.0).
To run the app in development mode:

#### Prerequisites:

1. Node.js (and npm or yarn)
2. Expo
3. Android device or emulator

#### To run:

1. Clone the repository
2. `cd` into the cloned project folder via command line or terminal
3. Run `yarn` or `npm ci` in command line or terminal
4. Run `yarn start` or `npm start` in command line or terminal
5. Run the application on emulator or on a real device via Expo

### Application

![Gif of the App](/doc/app.gif)
