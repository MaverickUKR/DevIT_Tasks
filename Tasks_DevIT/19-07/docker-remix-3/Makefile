# check: 
# 	docker compose config
# up: check
# 	docker compose up -d
# down:
# 	docker compose down
# ps:
# 	docker compose ps -a
# run:
# 	docker compose stop remix
# 	docker compose run --rm -v ./source:/app -p 3001:3000 remix bash
# 	docker compose start remix

# Проверка конфигурации Docker Compose
check: 
	docker compose config

# Запуск всех сервисов в фоне
up: check
	docker compose up -d

# Остановка и удаление всех сервисов
down:
	docker compose down

# Просмотр статуса всех контейнеров
ps:
	docker compose ps -a

# Запуск команды в контейнере remix с остановкой текущего контейнера
run:
	docker compose stop remix
	docker compose run --rm -v $(PWD)/source:/app -p 3001:3000 remix bash
	docker compose start remix

# Выполнение миграций базы данных
migrate:
	docker compose run --rm remix npx prisma migrate dev --name init

# Генерация Prisma Client
generate:
	docker compose run --rm remix npx prisma generate

# Перезапуск сервиса Remix
restart-remix:
	docker compose restart remix

# Логи для сервиса Remix
logs-remix:
	docker compose logs -f remix
