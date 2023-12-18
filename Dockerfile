# Paso 1: Utilizar una imen de Node.js como base
FROM node:16.20.0

# Paso 2: Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Paso 3: Copiar el archivo 'package.json' y 'package-lock.json' (si está disponible)
COPY package*.json ./

# Paso 4: Instalar las dependencias del proyecto
RUN npm install

# Paso 5: Copiar los archivos y directorios restantes al directorio de trabajo
COPY . .

# Paso 6: Construir la aplicación para producción
RUN npm run build

# Paso 7: Exponer el puerto que utiliza Vite (por defecto es el 3000)
EXPOSE 8080

# Paso 8: Comando para ejecutar la aplicación
CMD ["npm", "run", "serve"]
