# Etapa 1: Build do React

# Usa a imagem Node.js do Docker Hub como base
FROM node:latest as build-stage

# Cria o diretório para o frontend
RUN mkdir /usr/share/nginx
RUN mkdir /usr/share/nginx/html

# Define o diretório de trabalho
WORKDIR /usr/share/nginx/html

# Copia inicialmente apenas package.json e yarn.lock para o contêiner
COPY ./frontend/package.json ./frontend/yarn.lock ./

# Instala as dependências com Yarn
RUN yarn install

# Copia todos os arquivos para o contêiner
COPY ./frontend .
COPY .env ./.env

# Executa o build do React (gera a pasta 'build')
RUN yarn build

# Etapa 2: Configuração do NGINX

# Usa a imagem NGINX:apine do Docker Hub como base
FROM nginx:alpine as production-stage

# Copia o arquivo de configuração do NGINX
COPY ./frontend/nginx.conf /etc/nginx/nginx.conf

# Copia o build gerado na etapa anterior para o diretório padrão do NGINX
COPY --from=build-stage /usr/share/nginx/html/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
