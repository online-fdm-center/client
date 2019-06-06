FROM node:10 AS build
WORKDIR /app
COPY package.json package-lock.json webpack.config.js .babelrc ./
RUN npm ci
COPY src ./src
RUN npm run build

FROM httpd:2.4
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
EXPOSE 80