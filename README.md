# Job Nova

## Prerequisite

1. **Ollama**: Visit [https://ollama.com/download/windows](https://ollama.com/download/windows) to download.
2. **Bun**: Visit [https://bun.sh/docs#install](https://bun.sh/docs#install) to install.

## How to Run

1. **Setup**
   - Run `ollama pull granite4:350m` to pull the model. It will take some time depending on your internet speed.
   - Clone the repository `https://github.com/dshaw0004/jobnova.git`.
   - Open the project in terminal.
   - Run `bun install` to install dependencies.
   - Run `bun run db:migrate` to apply database migration.
   - Run `bun run db:seed` to seed the database.

2. **Run**
   - Run `bun run dev` to start the application.
