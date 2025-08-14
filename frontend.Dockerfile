FROM node:20

WORKDIR /app

COPY frontend/ /app

RUN npm install && npm run build && npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
