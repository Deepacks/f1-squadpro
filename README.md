# F1 SquadPro

A web app to manage a seasonal championship with your friends on EA's F1 games.

## Run Locally

Clone the project

```bash
  # with ssh
  git clone git@github.com:Deepacks/f1-squadpro.git

  # with http
  git clone https://github.com/Deepacks/f1-squadpro.git
```

Go to the project directory

```bash
  cd f1-squadpro
```

Run project

```bash
  # with make
  make compose-up

  # with docker
  docker compose build
  docker compose up --no-attach mongo
```

Stop project

```bash
  # with make
  make compose-down

  # with docker
  docker compose down
```
