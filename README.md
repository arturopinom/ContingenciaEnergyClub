# Energy 2026 — Landing de Transición

Landing page para la comunicación de convergencia de sedes Energy, con wizard
de formulario de 4 pasos, FAQ dinámico y lógica de precarga de opciones por perfil.

---

## Archivos

```
transicion/
├── index.html     Página principal
├── styles.css     Estilos (mobile-first, Energy Design System)
├── script.js      Lógica del wizard, validaciones, datos configurables
└── README.md      Este archivo
```

---

## 1. Configurar el endpoint del formulario

Abre `script.js` y busca el objeto `CONFIG` al inicio del archivo.

```js
formEndpoint: 'https://formspree.io/f/[CONFIGURAR_ENDPOINT]',
```

**Opción A — Formspree (recomendado)**
1. Crea una cuenta en https://formspree.io
2. Crea un nuevo formulario
3. Copia el ID (formato `xxxxxxxx`) y reemplaza la URL completa:
   ```js
   formEndpoint: 'https://formspree.io/f/xxxxxxxx',
   ```
4. En Formspree, activa la opción "Auto-response" para que el usuario reciba
   un email de confirmación automático con su número de ticket.

**Opción B — Web3Forms**
1. Obtén un access key en https://web3forms.com
2. Cambia el endpoint y agrega el key al payload dentro de la función `submitForm()`:
   ```js
   formEndpoint: 'https://api.web3forms.com/submit',
   // En submitForm(), agrega al payload:
   access_key: 'TU_ACCESS_KEY',
   ```

---

## 2. Configurar número de WhatsApp

En `script.js`, en el objeto `CONFIG`:
```js
whatsappNumber: '569XXXXXXXXX',  // Solo dígitos, con código de país
```

En `index.html`, busca el enlace del botón flotante y actualiza el número:
```html
<a href="https://wa.me/569XXXXXXXXX?text=...">
```

---

## 3. Modificar textos del FAQ

Todos los textos del FAQ están centralizados en `script.js`, dentro de `CONFIG.faqGroups`.
Cada grupo tiene un `title` y un array de `items` con `q` (pregunta) y `a` (respuesta).

```js
faqGroups: [
  {
    title: 'Sobre la convergencia',
    items: [
      { q: '¿Por qué Energy...?', a: 'Estamos enfocando...' },
      // Agregar, editar o eliminar preguntas aquí
    ],
  },
  // Agregar grupos nuevos aquí
],
```

Los cambios se reflejan automáticamente — no hay que tocar el HTML.

---

## 4. Modificar los textos de las opciones (cards)

En `script.js`, dentro de `CONFIG.options`:

```js
options: [
  {
    id: 'cambio',
    title: 'Cámbiate al club de tu elección',
    badge: 'Más elegida',   // null para quitar el badge
    featured: true,          // true = card oscura destacada
    bullets: [
      '3 meses gratis sumados a tu plan actual',
      // Editar bullets aquí
    ],
  },
  // ...
],
```

Las cards se renderizan en el paso 4 del wizard y en la sección de opciones del HTML
(esa sección está en el HTML directamente — editar ambos si cambias textos de bullets).

---

## 5. Agregar o quitar clubes

### Sedes que convergen (dropdown "Mi club actual")

En `script.js`, array `CONFIG.closingClubs`:
```js
closingClubs: [
  {
    id: 'norte',             // ID interno (no cambia)
    name: 'Energy Plaza Norte',
    address: 'Av. Américo Vespucio 1737, Huechuraba',
    suggested: 'vitacura',  // ID del club destino sugerido (ver destinationClubs)
    isSpecial: false,        // true activa el banner especial de Rancagua
  },
  // Agregar o quitar clubes aquí
],
```

También actualizar la sección "Sedes que convergen" en `index.html` (sección `#cambia`).

### Clubes destino disponibles

En `script.js`, array `CONFIG.destinationClubs`:
```js
destinationClubs: [
  { id: 'alameda', name: 'Energy Alameda', location: 'Estación Central' },
  // Agregar o quitar clubes aquí
  // NUNCA incluir franquicias (Alto Jahuel, Antofagasta, Calama, etc.)
],
```

También actualizar la lista "Clubes que se fortalecen" en `index.html` (sección `#cambia`).

---

## 6. Agregar imagen al hero

En `styles.css`, busca la variable `--hero-image` en el selector `.hero`:

```css
.hero {
  /* Actualmente usa un degradado como placeholder */
}
.hero::before {
  background-image: var(--hero-image, none);
}
```

**Opción A — Variable CSS inline en el HTML:**
```html
<section class="hero" style="--hero-image: url('assets/foto-gimnasio.jpg')">
```

**Opción B — Directamente en CSS:**
```css
.hero::before {
  background-image: url('../assets/foto-gimnasio.jpg');
}
```

La imagen debe ser horizontal, buena iluminación, formato JPG o WebP.
Dimensión mínima recomendada: 1920×900px.

---

## 7. Agregar el logo real

En `index.html`, busca:
```html
<span class="header__logo-text">ENERGY<span>.</span></span>
```

Reemplazar por:
```html
<img src="assets/logo-energy.svg" alt="Energy Club" height="36">
```

Lo mismo en el footer:
```html
<div class="footer__logo">ENERGY<span>.</span></div>
```

---

## 8. Actualizar enlaces del footer

En `index.html`, en la sección `<footer>`, actualizar:
- Redes sociales: `href="#"` → URLs reales de Instagram, Facebook, YouTube, TikTok
- Correo de contacto: `[CORREO_CONTACTO]`
- Teléfono de contacto: `[TELÉFONO_CONTACTO]`
- Términos y condiciones: `href="#"` → URL real
- Política de privacidad: `href="#"` → URL real

---

## 9. Placeholders que requieren revisión legal

Buscar en todos los archivos el texto `[CONFIRMAR CON LEGAL]`:

- **FAQ — Plazo devolución**: `"El plazo es de hasta [CONFIRMAR CON LEGAL] días hábiles..."`
  → Reemplazar con el plazo real según contrato y revisión legal.

---

## 10. Lógica de precarga de opción (Paso 3 → Paso 4)

La función `getRecommendedOption()` en `script.js` determina qué opción se preselecciona
en el paso 4 según las respuestas del paso 3:

| Condición | Opción precargada |
|---|---|
| Cercanía = "Muy importante" **y** planEntrenar = "Definitivamente sí" | Cámbiate de club |
| interesMulticlub = "Sí" | Upgrade a plan ALL-CLUB |
| planEntrenar = "No estoy seguro" o "Probablemente no" | Pausa tu plan |
| Ninguna de las anteriores | Cámbiate de club (fallback) |

Club de origen = Rancagua → muestra un banner especial informativo (no cambia la opción sugerida).

Para modificar esta lógica, editar la función directamente en `script.js`.

---

## 11. Notas técnicas

- **Persistencia**: el wizard guarda el progreso en `localStorage` con clave `energy2026_wizard`.
  Si el usuario cierra y vuelve, aparece el banner de reanudación.
- **Validación RUT**: usa el algoritmo Módulo 11 estándar chileno.
- **Ticket**: formato `ENERGY-YYYYMMDD-XXXX`, generado en el cliente con timestamp.
  Para producción real, reemplazar con un ID generado server-side.
- **Sin dependencias externas**: no usa jQuery, Vue, React ni ningún framework.
  Solo HTML, CSS y JavaScript vanilla. Funciona sin proceso de build.
- **Accesibilidad**: labels asociados a inputs, roles ARIA, focus visible, live regions
  para errores, contraste WCAG AA.

---

## Checklist antes de publicar

- [ ] Endpoint del formulario configurado y probado
- [ ] Número de WhatsApp actualizado en `CONFIG` y en el HTML del botón flotante
- [ ] Imagen del hero agregada
- [ ] Logo real reemplazando el texto placeholder
- [ ] URLs de redes sociales en el footer actualizadas
- [ ] Correo y teléfono de contacto en el footer
- [ ] URLs de Términos y Política de privacidad
- [ ] `[CONFIRMAR CON LEGAL]` — plazo de devolución completado
- [ ] Prueba en mobile (Safari iOS, Chrome Android)
- [ ] Prueba en desktop (Chrome, Firefox, Safari)
- [ ] Envío de formulario de prueba completo end-to-end
