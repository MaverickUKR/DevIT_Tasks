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