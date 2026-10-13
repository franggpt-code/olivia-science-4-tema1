# 🔬 Science 4.º de Primaria · Tema 1: «La Salud»

Aplicación web interactiva, pedagógica y lúdica diseñada especialmente para **Olivia (4.º de Educación Primaria)** para practicar y sacar un 10 en el examen de Ciencias de la Naturaleza / Conocimiento del Medio sobre el **Tema 1: «La Salud»** (Colección *CLAVES · World Makers*, Grazalema–Santillana).

---

## 🌟 Características Principales

1. **📝 Parte 1: Conceptos Clave (Inspirada en la Prueba B Oficial)**
   - 10 ejercicios interactivos: definiciones de salud física, mental y social; medidas de prevención; vacunas y revisiones; funciones de los alimentos (energéticos, constructores, reguladores); procedencia (animal, vegetal, mineral); procesados y ultraprocesados; ejercicios antes y después del deporte.
   - Retroalimentación formativa inmediata con explicaciones claras adaptadas a 9-10 años.

2. **🚴‍♀️ Parte 2: Misión en la Naturaleza (Inspirada en la Prueba A Oficial - Caso Práctico)**
   - 10 ejercicios aplicados a una historia contextual: la excursión cicloturista de Ana y sus amigos.
   - Análisis del menú del pícnic (salmón ahumado, pan de cereales, fruta, agua).
   - Consejos sobre bebidas (agua vs. refrescos azucarados).
   - Higiene postural: elección de la mochila ergonómica de dos tirantes vs. bolsa de un solo asa.
   - Pautas de seguridad en bicicleta y postura para dormir y cuidar la espalda.

3. **⚡ Desafío Express (Entrenamiento Infinito)**
   - Generador de pruebas aleatorias de 10 preguntas extraídas de un banco ampliado con nuevas situaciones (postura al estudiar, recoger pesos del suelo, las 5 raciones de fruta, etc.).

4. **🍎 El Supermercado Saludable (Mini-Juego Arcade de Clasificación)**
   - Juego rápido para clasificar 24 alimentos diferentes con contador de puntos, combos y rachas en 3 modalidades:
     - 🌱 Por Origen (*Animal, Vegetal, Mineral*).
     - ⚡ Por Función (*Energético, Constructor, Regulador*).
     - 🥗 Por Grado de Procesado (*Natural, Procesado, Ultraprocesado*).

5. **📚 Guía Visual de Repaso y Resumen**
   - Resumen visual con los 8 bloques esenciales del libro *CLAVES*, tablas comparativas, ejemplos reales y formato imprimible para repasar antes del control.

6. **🎓 Diploma Oficial Imprimible de Olivia**
   - Diploma personalizable de «Especialista en Salud y Bienestar» con su nombre, nota, fecha y sello oficial, listo para imprimir o guardar en PDF (`Ctrl + P` / botón directo).

7. **🔊 Audio y Accesibilidad**
   - Efectos sonoros sintetizados nativos con **Web Audio API** (sin archivos de audio pesados ni dependencias externas).
   - Lector de preguntas en voz alta en español (**Web Speech Synthesis**) para que Olivia pueda escuchar la pregunta y las opciones.
   - Celebración con lluvia de confeti en notas sobresalientes.

---

## 🚀 Cómo Ejecutar en Local

No requiere instalaciones complejas ni node_modules. Funciona de manera nativa en cualquier navegador:

### Opción 1: Con Python (Recomendado)
```bash
python -m http.server 3000
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### Opción 2: Doble clic directo
Haz doble clic sobre el archivo `index.html` en cualquier ordenador, tablet o portátil.

---

## ☁️ Despliegue en Vercel

La aplicación está preparada con `vercel.json` para desplegarse automáticamente:

1. El repositorio está subido a GitHub en: `https://github.com/franggpt-code/olivia-science-4-tema1`.
2. En [vercel.com](https://vercel.com):
   - Haz clic en **"Add New..."** -> **"Project"**.
   - Conecta con tu cuenta de GitHub y selecciona el repositorio `olivia-science-4-tema1`.
   - Vercel detectará automáticamente que es un proyecto web estático.
   - Pulsa **"Deploy"**.
3. ¡Listo! En menos de 10 segundos tendrás la URL pública en internet para abrirla desde el iPad, la tablet o el móvil de Olivia.

---

## 📁 Estructura del Proyecto

```text
├── index.html            # Interfaz principal de la aplicación
├── css/
│   └── style.css         # Estilos lúdicos, tipografía y responsive
├── js/
│   ├── data.js           # Banco de preguntas (Partes 1, 2, Express, Mini-juego y Guía)
│   ├── audio.js          # Síntesis Web Audio FX y lector por voz
│   └── app.js            # Lógica de navegación, examen, corrección y diploma
├── vercel.json           # Configuración de despliegue para Vercel
├── package.json          # Metadatos del proyecto
├── Science/
│   └── Tema1/            # Material de examen original (capturas y resumen Markdown)
└── README.md
```
