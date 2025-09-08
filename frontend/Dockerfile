# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Sirve la aplicación con un servidor estático (puedes usar serve)
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]