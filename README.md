# 10 Minutos con DesdeLinux
Este sitio es para el proyecto [10 minutos](http://10minutos.desdelinux.net/) de [DesdeLinux](http://desdelinux.net)

Es una simple aplicación web que toma los datos del [API pública de Vimeo](http://developer.vimeo.com/apis/simple), funciona con [Middleman](http://middlemanapp.com/) y [Backbone](http://backbonejs.org/).

#### Entorno de desarrollo
Para correr el entorno de desarrollo es necesario tener instalado [ruby](https://www.ruby-lang.org/en/) en el sistema.
Una vez instalado ruby ejecuta los siguientes comandos en la raiz del proyecto.

```sh
bundle
middleman
```

El servidor de desarrollo lo puedes ver en [0.0.0.0:4567](http://0.0.0.0:4567/)

### Compilar para produccion
Para poner esto en produccion es necesario compilar la aplicacion con `middleman`, para esto ejecutamos:

```sh
middleman build
```

Eso nos creara un directorio `build` con nuestra aplicacion lista para produccion.

#### ¿Cómo contribuir?
Para contribuir haz un fork al repositorio, crea un branch con tus cambios y manda un pull-request.
