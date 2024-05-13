# Proyecto de API para Aplicativo Educativo Yanapay Yachacuyta

<img src="https://static.vecteezy.com/system/resources/previews/005/250/903/original/llama-with-sunglasses-free-vector.jpg" alt="Logo" width="200" height="200"/>

Este proyecto consiste en una API desarrollada con Nest.Js para un aplicativo dirigido a estudiantes de segundo grado de secundaria. El aplicativo tiene como objetivo ayudar a los estudiantes a repasar los cursos y el plan de estudios proporcionado por el Ministerio de Educación del país.

## Características principales

- **Material educativo:** Los estudiantes pueden acceder a material educativo relacionado con cada curso para repasar y reforzar sus conocimientos.
- **Simulación de exámenes:** Los estudiantes pueden simular exámenes por cada módulo para evaluar su aprendizaje.
- **Registro y validación de profesores:** Los profesores pueden registrarse en la plataforma y su registro con el rol de profesor será validado con su inscripción en el colegio de profesores del Perú para certificar su condición de profesor.
- **Interacción entre alumnos y profesores:** Los alumnos pueden agregar dudas en cada módulo de los cursos, las cuales pueden ser respondidas por profesores o incluso por otros alumnos.

## Configuración del proyecto

Para levantar el proyecto, se deben crear dos archivos de configuración: `.dev.env` y `.prod.env`. A continuación, se detallan las variables de entorno que deben contener cada archivo:

### `.dev.env`

```plaintext
DB_URI=mongodb://localhost:27017/nombre_base_datos
PORT=3030
LINK_CPPE_CONSULTA=https://enlace_cppe_consulta.com
JWT_SECRET_KEY=clave_secreta_para_jwt
IMAGES_DIRECTORY=/ruta/directorio/imagenes
```

### `.prod.env`

```plaintext
DB_URI=mongodb://servidor_mongodb:puerto/nombre_base_datos
PORT=3030
LINK_CPPE_CONSULTA=https://enlace_cppe_consulta.com
JWT_SECRET_KEY=clave_secreta_para_jwt
IMAGES_DIRECTORY=/ruta/directorio/imagenes
```

Asegúrate de reemplazar los valores de ejemplo con los valores específicos de tu entorno y configuración.

## Instalación y ejecución

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto utilizando npm o yarn:

```bash
npm install
# o
yarn install
```

3. Inicia el servidor en modo desarrollo:

```bash
npm run start:dev
# o
yarn start:dev
```

4. Para producción, puedes compilar el proyecto y ejecutarlo con:

```bash
npm run build
npm run start:prod
# o
yarn build
yarn start:prod
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estas pautas:
- Haz un fork del proyecto.
- Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
- Realiza tus cambios y haz commits (`git commit -am 'Agrega nueva funcionalidad'`).
- Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
- Crea un nuevo Pull Request.
