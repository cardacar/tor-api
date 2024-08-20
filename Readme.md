

# API-TOR


## Proceso de ejecucion

para poder correr el proyecto es necesario definir el archivo .env el cual debe de contar con la estructura del archiv .env.example

El aplicativo esta configurado para correr con docker por lo cual para la ejecucion despues de haber configurado el archivo .env.example se debe de inicializar una consola y ejecutar el comando

```
docker-compose up --build -d

```
## aws

Acontinuacion se explica como se realizaria un despliegue en la nube de aws

#### Paso 1
Configurar la base de datos mongodb
* Crear una cuenta en mongodb Atlas
* Crear un clúster.
* Configurar las IPs que pueden conectarse.
* Crear una base de datos y usuario para la aplicación.
* Obtener la cadena de conexión de MongoDB Atlas y añadirla a las variables e entorno

#### Paso 2
Configurar AWS CLI

* Si no se tiene el CLI de aws se debe de instalar
```
pip install awscli

``` 
* Configurar las credenciales de aws

```
aws configure

``` 
* Crea un repositorio en ECR para almacenar la imagen de Docker
* Despues se debe de Construir y Publicar la Imagen en ECR
* Se debe de etiquetar la imagen con el nombre del repositorio de ECR
* Se sube la imagen

## 🔗 Documentación de la api

### Enlace a la documentación de la api
https://documenter.getpostman.com/view/14008486/2sA3sAfmrk

