# ThumbForge AI ✨

Generate stunning, AI-powered YouTube thumbnails in seconds. ThumbForge AI leverages a multi-model pipeline to enhance your creative prompts and produce unique, high-quality thumbnails designed to boost your click-through rate.

**[Live Demo](https://thumbforgeai.soynerd.co.in/)**

> **Note:** This is a fully functional application built with a modern, server-centric Next.js stack, featuring secure authentication, serverless database integration, and a multi-step AI generation process.

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Future Work](#future-work)
- [License](#license)
- [Contact](#contact)

---

## About The Project

ThumbForge AI was built to solve a common problem for content creators: the time and creative energy it takes to design an engaging YouTube thumbnail. This application streamlines the entire process. Users can input a simple idea, upload reference images, and use a step-by-step wizard to guide the AI.

The backend uses an intelligent agent powered by OpenAI's GPT-4.1 to refine and expand user prompts, which are then fed to Google's Gemini 2.5 Flash to generate six distinct visual options. The entire application is protected by a secure, session-based authentication system.

---

## Key Features

- ✅ **Secure User Authentication**: Full sign-up, sign-in, and logout functionality using Lucia Auth.
- 🔐 **Protected Routes**: The core generator UI is only accessible to authenticated users.
- 🧠 **AI-Powered Prompt Enhancement**: Uses GPT-4.1 to intelligently rewrite and detail user prompts for better image results.
- 🖼️ **Multi-Model Image Generation**: Leverages Google Gemini to produce six high-quality thumbnail options from a single prompt.
- 🪄 **Multi-Step Generation Wizard**: Guides users through selecting a domain (e.g., Tech, Education) and style (e.g., Realistic, Ghibli) to refine results.
- 💡 **AI-Powered Suggestions**: Provides users with suggestions (e.g., "Add bold text," "Use vibrant colors") to further improve their prompts.
- 📂 **Reference Image Uploads**: Users can upload up to four images to guide the AI's generation.
- 🔄 **Iterative Creation Flow**: "Reuse" a generated image as a new reference, allowing for continuous refinement.
- 👁️ **Image Management**: Includes in-app image preview, selection, and download functionality.
- 🌓 **Dark/Light Mode**: Themed interface using shadcn/ui and Tailwind CSS.

---

## Tech Stack

This project is built with a modern, type-safe, and scalable stack.

| Category           | Technology                                                                                                                       |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**      | [**Next.js 14**](https://nextjs.org/) (with App Router)                                                                          |
| **Frontend**       | [**React**](https://react.dev/), [**TypeScript**](https://www.typescriptlang.org/), [**Tailwind CSS**](https://tailwindcss.com/) |
| **UI Components**  | [**shadcn/ui**](https://ui.shadcn.com/), [**Framer Motion**](https://www.framer.com/motion/)                                     |
| **Database**       | [**Neon**](https://neon.tech/) (Serverless Postgres)                                                                             |
| **ORM**            | [**Prisma**](https://www.prisma.io/)                                                                                             |
| **Authentication** | [**Lucia Auth**](https://lucia-auth.com/)                                                                                        |
| **AI Services**    | [**OpenAI GPT-4.1**](https://openai.com/), [**Google Gemini 2.5 Flash**](https://deepmind.google/technologies/gemini/)           |
| **Deployment**     | Vercel                                                                                                                           |

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or newer recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A [Neon](https://neon.tech/) account for the database.
- API keys for [OpenAI](https://platform.openai.com/) and [Google AI Studio](https://aistudio.google.com/).

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/soynerd/Youtube-Thumbnail-Generator.git
    cd Youtube-Thumbnail-Generator
    ```

2.  **Install dependencies:**

    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and fill in your credentials.

    ```sh
    cp .env.example .env
    ```

    See the [Environment Variables](#environment-variables) section below for details on what to add.

4.  **Push the database schema:**
    This command will sync your Prisma schema with your Neon database, creating the `User` and `Session` tables.

    ```sh
    npx prisma db push
    ```

5.  **Run the development server:**
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## Environment Variables

To run this project, you need to create a `.env` file in the root of your project and add the following variables.

```ini
# .env.example

# Neon Database URLs (Get from your Neon dashboard)
# DATABASE_URL is the POOLED connection string (starts with prisma://) for the app
# DATABASE_URL_UNPOOLED is the DIRECT connection string (starts with postgresql://) for Prisma Migrate
DATABASE_URL="postgres://..."

# Google Gemini API Key (Get from Google AI Studio)
GEMINI_API_KEY="your-google-api-key"

# OpenAI API Key (Get from OpenAI Platform)
OPENAI_API_KEY="your-openai-api-key"
```

---

## Project Structure

The project uses the Next.js App Router. Here is a brief overview of the key directories:

- **/app**: Contains all routes, pages, and layouts.
  - **/app/api**: Houses all backend API routes (e.g., for authentication and image generation).
  - **/app/actions**: Contains all Next.js Server Actions (e.g., `logout`).
- **/components**: Contains all shared React components, including the main UI and `shadcn/ui` components.
- **/lib**: Contains utility functions, authentication logic (`auth.ts`, `session.ts`), and database helpers.
- **/prisma**: Contains the `schema.prisma` file, which defines the database schema.

---

## Future Work

This project has a solid foundation, but there are many potential features to add:

- [ ] **OAuth Integration**: Add "Sign in with Google" functionality.
- [ ] **Credit System**: Implement a credit-based system for API usage.
- [ ] **User Gallery**: Allow users to view and manage their previously generated images.
- [ ] **In-App Editor**: Add a simple editor to add text or overlays to generated images.
- [ ] **More AI Models**: Integrate with other image generation models like Stable Diffusion or DALL-E 3.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

soynerd - [GitHub Profile](https://github.com/soynerd)

Project Link: [https://github.com/soynerd/Youtube-Thumbnail-Generator](https://github.com/soynerd/Youtube-Thumbnail-Generator)
