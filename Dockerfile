FROM node:16 AS build

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]