# tusubtitulo-script
Interfaz de linea de comandos (CLI) para descargar subtítulos de tusubtitulo.com.

# Prerrequisitos
El proyecto tiene dependencias que requieren Node 6 o superior, junto con NPM 3 o superior.

# Construcción
Ubicarse en la raiz del proyecto y ejecutar:
```bash
   npm install
```

# Uso
1. Loguearse en [tusubtitulo.com](https://www.tusubtitulo.com/login.php), y copiar Cookie de sesión en la linea 15 de `tu-subtitulo-api.service.ts` (única vez mientras tenga la sesión iniciada).
2. Ejecutar:
```bash
   npm run start -- --id 11111 --lang 5
   # 5: Español (España).
   # 6: Español (Latinoamérica).
```
