# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.


# Form Builder Application

A fully-featured form builder system built with **React Remix**, **Tailwind CSS**, and **Redux**.  
This project enables users to visually build multi-step forms with drag-and-drop fields, live preview, validation, and shareable form links.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Bonus Features](#bonus-features)  
- [Future Improvements](#future-improvements)  
- [Live Demo](#live-demo)  
- [Video Walkthrough](#video-walkthrough)  
- [License](#license)

---

## Project Overview

This project is an interactive form builder that allows users to:

- Add fields via drag-and-drop  
- Reorder fields dynamically  
- Configure field properties (label, placeholder, validation, options)  
- Preview the form live in desktop, tablet, and mobile modes  
- Create multi-step forms with validation and progress indicators  
- Save forms locally and generate shareable links  
- Load predefined templates (Contact Us, Feedback, Job Application)  
- Fill and submit generated forms via a public shareable URL

---

## Features

### Core Features

- **Drag and Drop**: Add and reorder fields (`text`, `textarea`, `checkbox`, `dropdown`, `date`) visually  
- **Field Settings Panel**: Configure label, placeholder, required, options, and validation patterns  
- **Real-time Preview**: Live form preview with validation for required, min/max length, and patterns  
- **Multi-Step Forms**: Navigate through multiple steps with validation and progress bar  
- **Templates**: Load pre-built form templates to jump-start form creation  
- **Shareable Forms**: Generate a unique form ID and share a URL to access a public form filler  
- **Local Storage**: Save form data locally for persistence between sessions  

### Bonus Features

- Dark and Light Theme toggle support  
- Auto-save form state to localStorage on change  
- Undo and redo actions (planned)  
- Viewing submitted form responses (planned)

---

## Tech Stack

- **Framework**: [React Remix](https://remix.run/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **State Management**: Redux Toolkit  
- **UUID Generation**: [uuid](https://github.com/uuidjs/uuid)  
- **Storage**: localStorage for persistence and shareable forms  

---

## Getting Started
