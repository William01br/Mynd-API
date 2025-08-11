# === STAGE: development ===
FROM node:22-alpine3.22

WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

# code will come from bind-mount 
EXPOSE 3000
CMD ["npm", "run", "start:dev"]