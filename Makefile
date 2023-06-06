compose-up:
	docker compose build
	docker compose up --no-attach mongo

compose-up-nobuild:
	docker compose up --no-attach mongo

compose-down:
	docker compose down