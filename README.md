# Svelte & Bun Application Setup

This guide will walk you through the process of cloning, installing, and running a **Svelte** application with **Bun** from GitHub.

## Prerequisites

Before setting up the project, make sure you have the following installed on your machine:

1. **Bun**: A fast JavaScript runtime like Node.js, but optimized for performance.
2. **Svelte**

## Clone the repo

```bash
    git clone https://github.com/danielxoates/yt_downloader.git
```
You can then run the frontend using the command
```bash
    bun dev
```

# Setting Up and Running the Node.js Backend

## Prerequisites

1. **Install Node.js**
   - Download and install Node.js from the [official website](https://nodejs.org/):
     - For Windows and macOS, download the installer and follow the installation instructions.
     - For Linux:
       ```bash
       # Debian/Ubuntu
       sudo apt update
       sudo apt install -y nodejs npm

       # Or use Node Version Manager (NVM)
       curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
       source ~/.bashrc
       nvm install --lts
       ```

2. **Verify Installation**
   - Check if Node.js and npm are installed correctly:
     ```bash
     node -v   # Should output the Node.js version
     npm -v    # Should output the npm version
     ```

## Setting Up the Backend

1. **Download the Code**
   - Clone the repository:
     ```bash
     git clone https://github.com/danielxoates/yt_downloader.git
     ```

2. **Navigate to the Project Directory**
   ```bash
   cd backend
   ```

3. **Install Dependencies**
   - Run the following command to install all necessary Node.js packages:
     ```bash
     npm install
     ```

---

## Running the Backend

1. **Start the Server**
   - Use the following command to start the backend server:
     ```bash
     node backend/server.js
     ```

2. **Verify the Server is Running**
   - The server should display a message like:
     ```
     listening on 2222
     ```
   - By default, it runs on `http://localhost:2222`.

3. **Access the API**
   - Test the backend by sending requests to the appropriate endpoints (e.g., `http://localhost:2222/?url=<your-url>&type=<mp3/mp4>`).

   This should now allow you to download YouTube videos or audio either from the frontend hosted website or through Postman.

---


