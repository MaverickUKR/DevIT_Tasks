include .env
docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(docker_bin) compose
compose_config := --env-file=./.env

SOURCE_VOLUME := $(shell pwd)/source:/app

# Проверка конфигурации Docker Compose
check: 
	$(docker_compose_bin) $(compose_config) config

# Запуск всех сервисов в фоне
up: check
	$(docker_compose_bin) $(compose_config) up -d

# Остановка и удаление всех сервисов
down:
	$(docker_compose_bin) $(compose_config) down

# Просмотр статуса всех контейнеров
ps:
	$(docker_compose_bin) $(compose_config) ps -a

# Запуск команды в контейнере remix с остановкой текущего контейнера
run:
	$(docker_compose_bin) $(compose_config) stop remix
	$(docker_compose_bin) $(compose_config) run --rm -v $(SOURCE_VOLUME) -p 3003:3000 remix bash
	$(docker_compose_bin) $(compose_config) start remix