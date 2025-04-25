# YouTube Summarizer

A YouTube summarizer web application built with Next.js, MongoDB, ClerkAuth, and TypeScript. This app allows users to input a YouTube video URL, retrieve the transcript (if available), generate a summary using the OpenRouter API, and create flashcards based on the summary. Users can log in to save and access their summaries and flashcards at any time.

## Features

- Input a YouTube video URL and fetch its transcript (if available).
- Generate a concise summary using the OpenRouter API.
- Create flashcards from the video summary for easy review.
- Secure user authentication using ClerkAuth.
- Save and view summaries and flashcards anytime with a user login.

## Technologies Used

- **Next.js**: React framework for building the app.
- **MongoDB**: Database for storing user data, summaries, and flashcards.
- **ClerkAuth**: Authentication service for user login and management.
- **OpenRouter API**: Used to generate summaries from video transcripts.
- **TypeScript**: Typed JavaScript for better development experience.

## Demo

The app is live! Check it out here: [YouTube Summarizer](#)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Dhaliyanoushad/SummarizeTube
    cd SummarizeTube
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root of the project and add the following environment variables:
    ```
    NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
    CLERK_API_KEY=your_clerk_api_key
    MONGODB_URI=your_mongodb_connection_uri
    OPENROUTER_API_KEY=your_openrouter_api_key
    ```

4. Run the application locally:
    ```bash
    npm run dev
    ```

5. Open your browser and go to `http://localhost:3000` to see the app in action.

## Usage

1. Log in/Sign up.
2. Enter a YouTube video URL in the input field.
3. Click "Summarize" to fetch the transcript (if available) and generate a summary.
4. Create flashcards based on the summary and save to review later.
5. All summaries and flashcards are saved to your account for easy access.
