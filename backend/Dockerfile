# === STAGE: development ===
FROM node:22.17-alpine3.22

WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

# code will come from bind-mount 

EXPOSE 3000
CMD ["npm", "run", "dev"]