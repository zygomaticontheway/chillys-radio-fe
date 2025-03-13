# Используем Node.js для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package.json package-lock.json ./
RUN npm install

# Копируем остальные файлы
COPY . .

# Собираем фронтенд
RUN npm run build

# Новый контейнер для запуска (nginx)
FROM nginx:alpine

# Копируем собранные файлы в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]