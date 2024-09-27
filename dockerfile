#Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
CMD ["ls", "-l"]

# #Prod stage
FROM nginx:1.27.1-alpine AS production
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
