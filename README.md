# tusubtitulo-script
Interfaz de linea de comandos (CLI) para descargar subtítulos de tusubtitulo.com.

# Prerrequisitos
El proyecto tiene dependencias que requieren Node 8 o superior, junto con npm 5 o superior.

# Instalación

```bash
   npm install -g tu-subtitulo-script
```

# Uso
1. Loguearse en [tusubtitulo.com](https://www.tusubtitulo.com/login.php), y copiar Cookie de sesión.
2. Ejecutar:
```bash
   tu-subtitulo config set cookie [value]
   # [value]: Cookie de sesión copiado.
   tu-subtitulo download -i 11111 -l 5
   # 5: Español (España).
   # 6: Español (Latinoamérica).
```

Por defecto se guarda en la carpeta de descargas del usuario, si desea cambiar la ubicación ejecutar:

```bash
tu-subtitulo config set downloadPath [path]
# [path]: puede ser una ruta del estilo 'D:\Users\My User\Downloads'
```
# Documentación

La documentación se puede acceder a través de:

```bash
tu-subtitulo --help
```

# License

Este software usa licencia [MIT](./LICENCE).

Copyright 2017 Linus Norton.