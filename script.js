/* ============================================================
   ENERGY 2026 — Concentramos lo mejor para ti
   script.js — Wizard 3 pasos, validación, lógica de opciones
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   CONFIGURACIÓN CENTRAL — editar aquí para cambiar datos
   ────────────────────────────────────────────────────────────── */
const CONFIG = {
  /* Endpoint del formulario.
     Formspree: https://formspree.io/f/XXXXXXXX
     Web3Forms: https://api.web3forms.com/submit  */
  formEndpoint: 'https://formspree.io/f/[CONFIGURAR_ENDPOINT]',

  /* Número WhatsApp (solo dígitos con código país, sin +) */
  whatsappNumber: '569[CONFIGURAR_NÚMERO]',

  /* Sedes que convergen — dropdown "Mi club actual" */
  closingClubs: [
    { id: 'norte',    name: 'Energy Club Mallplaza Norte',    address: 'Av. Américo Vespucio 1737, Huechuraba',     closingDate: '31 mayo 2026',      suggested: 'vitacura'  },
    { id: 'oeste',    name: 'Energy Club Mallplaza Oeste',    address: 'Av. Américo Vespucio 1501, Cerrillos',      closingDate: '31 mayo 2026',      suggested: 'midmall'   },
    { id: 'alameda',  name: 'Energy Club Mallplaza Alameda',  address: "Av. O'Higgins 3470, Mall Estación Central", closingDate: '30 junio 2026',     suggested: 'morande'   },
    { id: 'sur',      name: 'Energy Club Mallplaza Sur',      address: 'Av. Jorge Alessandri 20040, San Bernardo',  closingDate: '30 junio 2026',     suggested: 'midmall'   },
    { id: 'vespucio', name: 'Energy Club Mallplaza Vespucio', address: 'Av. Vicuña Mackenna Ote. 7110, La Florida', closingDate: '30 septiembre 2026', suggested: 'tobalaba'  },
  ],

  /* Clubes destino — solo propios, NUNCA franquicias */
  destinationClubs: [
    { id: 'concepcion',     name: 'Energy Concepción',        location: 'Concepción'       },
    { id: 'costanera',      name: 'Energy Costanera Center',  location: 'Providencia'      },
    { id: 'curauma',        name: 'Energy Curauma',           location: 'Valparaíso'       },
    { id: 'dominicos',      name: 'Energy Los Dominicos',     location: 'Las Condes'       },
    { id: 'mallmarina',     name: 'Energy Mall Marina',       location: 'Viña del Mar'     },
    { id: 'midmall',        name: 'Energy Midmall Maipú',     location: 'Maipú'            },
    { id: 'morande',        name: 'Energy Morandé',           location: 'Santiago Centro'  },
    { id: 'nuevalascondes', name: 'Energy Mallplaza Nueva Las Condes', location: 'Las Condes' },
    { id: 'penalolen',      name: 'Energy Peñalolén',         location: 'Peñalolén'        },
    { id: 'egana',          name: 'Energy Mallplaza Egaña',   location: 'La Reina'         },
    { id: 'tobalaba',       name: 'Energy Mallplaza Tobalaba',location: 'La Florida'       },
    { id: 'sanfernando',    name: 'Energy San Fernando',      location: "O'Higgins"        },
    { id: 'sportclub',      name: 'Energy Sport Club',        location: 'Las Condes'       },
    { id: 'talca',          name: 'Energy Talca',             location: 'Maule'            },
    { id: 'temuco',         name: 'Energy Temuco',            location: 'Araucanía'        },
    { id: 'vitacura',       name: 'Energy Vitacura',          location: 'Las Condes'       },
  ],

  /* Opciones del paso 3 — el orden define el orden de las radio cards */
  options: [
    {
      id: 'cambio',
      title: 'Cambio de club + Pase ALL-CLUB',
      badge: 'Más elegida',
      featured: true,
      bullets: [
        'Define tu nuevo club permanente sin cargo',
        'Mantén el acceso ALL-CLUB a toda la red Energy Club de Chile',
        '3, 4 o 6 meses adicionales según antigüedad',
      ],
    },
    {
      id: 'pausa',
      title: 'Congela tu plan',
      bullets: [
        'Congelamiento de hasta 3 meses',
        'No descuenta saldo del plan',
        'Reactivación en cualquier club Energy Club operativo',
      ],
    },
    {
      id: 'traspaso',
      title: 'Traspasa tu membresía',
      bullets: [
        'Traspaso del plan a una sola persona, sin cargo',
        'Trámite simplificado si es familiar directo',
        'Sujeto a condiciones del cesionario',
      ],
    },
    {
      id: 'otro',
      title: 'Otra solicitud',
      subtle: true,
      bullets: [
        'Para casos especiales no contemplados',
        'Descríbenos tu situación',
        'Evaluación individual por nuestro equipo',
      ],
    },
  ],

  /* FAQ — editar preguntas y respuestas aquí */
  faqGroups: [
    {
      title: 'Sobre la convergencia',
      items: [
        {
          q: 'Mi club no aparece en la lista. ¿Debo preocuparme?',
          a: 'No. Esta comunicación aplica únicamente a 5 sedes: Energy Club Mallplaza Norte, Mallplaza Oeste, Mallplaza Alameda, Mallplaza Sur y Mallplaza Vespucio. Si tu club no está en esa lista, opera con total normalidad y forma parte del grupo de clubes que se fortalecen durante 2026.',
        },
        {
          q: '¿Por qué Energy Club está concentrando su red?',
          a: 'Como parte del proceso de reorganización y estabilización financiera de Energy Club, hemos acordado con Mallplaza la entrega ordenada de cinco clubes ubicados en sus centros comerciales. La medida responde al contexto económico complejo para la operación de esos espacios, y nos permite concentrar nuestros recursos en los clubes que continuarán operando, reforzándolos con mejor equipamiento, más máquinas y una oferta fortalecida de clases grupales.',
        },
        {
          q: '¿Qué sedes convergen y cuándo cierran?',
          a: 'Son 5 sedes con fechas confirmadas: Energy Club Mallplaza Norte (31 mayo 2026), Mallplaza Oeste (31 mayo 2026), Mallplaza Alameda (30 junio 2026), Mallplaza Sur (30 junio 2026) y Mallplaza Vespucio (30 septiembre 2026).',
        },
        {
          q: '¿Las demás sedes están aseguradas?',
          a: 'Sí. Los clubes que se mantienen recibirán equipamiento e infraestructura adicional, ampliación de grilla de clases y mayor apoyo de staff durante 2026.',
        },
        {
          q: '¿Las franquicias se ven afectadas?',
          a: 'No. Los clubes franquiciados (Alto Jahuel, Antofagasta, Calama, Copiapó, Independencia, La Serena, Talagante) son operaciones independientes y no participan de este proceso. Operan con normalidad.',
        },
      ],
    },
    {
      title: 'Sobre tu membresía',
      items: [
        {
          q: '¿Puedo seguir usando mi club actual hasta su cierre?',
          a: 'Sí. Tu club operará normalmente hasta la fecha de cierre confirmada (entre 31 de mayo y 30 de septiembre de 2026 según el club). Adicionalmente, Energy Club ha activado el Pase ALL-CLUB para los socios de los clubes en convergencia, como medida de continuidad para que puedan entrenar en cualquier otra sede de la red durante este período.',
        },
        {
          q: 'Tengo plan anual o semestral. ¿Pierdo lo que pagué?',
          a: 'No. Todas las opciones respetan el saldo de tu plan. Si te cambias de club, el plan continúa íntegro en el nuevo club, más los meses adicionales que correspondan según tu antigüedad.',
        },
        {
          q: '¿Cuántos meses adicionales recibo si me cambio de club?',
          a: '3 meses si llevas menos de 3 años con Energy Club, 4 meses si llevas entre 3 y 5 años, 6 meses si llevas más de 5 años.',
        },
        {
          q: '¿Puedo entrenar en otros clubes mientras decido?',
          a: 'Sí. Como medida de continuidad dispuesta por Energy Club, se ha activado de oficio el Pase ALL-CLUB para todos los socios de los clubes en convergencia, permitiéndoles entrenar en cualquier club de la red Energy Club de Chile durante este período. Esta activación es automática, sin costo adicional y no requiere ningún trámite por parte del socio. No obstante, te recomendamos formalizar tu decisión definitiva mediante una de las 4 alternativas, para que tu situación quede resuelta antes de la fecha de cierre de tu club.',
        },
        {
          q: '¿Puedo traspasarle mi plan a otra persona?',
          a: 'Sí, sin cargo. El plan puede traspasarse a una sola persona. El traspaso a familiar directo tiene un trámite simplificado; para terceros, se requieren los datos del cesionario. El cesionario debe cumplir 4 requisitos: ser mayor de 16 años, no tener un plan Energy Club activo, no tener deuda vigente con Energy Club, y no haber tenido beca activa en los últimos 6 meses.',
        },
        {
          q: 'Tengo plan Banco Estado o corporativo. ¿Cómo aplica?',
          a: 'Las opciones generales aplican también a planes con convenio, sujeto a las condiciones particulares de cada acuerdo corporativo. Nuestro equipo de Convenios Corporativos se pondrá en contacto directamente con cada empresa o institución para coordinar la gestión de las membresías y los beneficios aplicables a sus colaboradores. Te recomendamos completar el formulario indicando tu convenio; la confirmación final de las condiciones que apliquen a tu caso dependerá del acuerdo entre Energy y tu empresa.',
        },
      ],
    },
    {
      title: 'Sobre tu Personal Trainer y clases',
      items: [
        {
          q: 'Mi PT me atiende en uno de los clubes que dejará de operar. ¿Qué pasa con él?',
          a: 'Estamos trabajando para que la mayoría de los PT migren con los socios al club que los reciba. En el formulario puedes indicar si quieres mantener a tu PT actual. Si por alguna razón no es posible, te asignamos uno nuevo y te ofrecemos sesiones de cortesía para la transición.',
        },
        {
          q: '¿Las clases grupales se mantienen?',
          a: 'Sí. Las sedes que se mantienen recibirán una ampliación de grilla con más horarios y nuevas clases gracias a la redistribución de instructores.',
        },
      ],
    },
    {
      title: 'Logística',
      items: [
        {
          q: '¿Qué pasa con mi locker o casillero?',
          a: 'Tendrás 15 días después del cierre de tu club para retirar tus pertenencias. Te enviaremos un recordatorio por correo. Si tienes locker arrendado, el cobro se suspende automáticamente desde la fecha de cierre.',
        },
        {
          q: 'Tengo cobro automático. ¿Lo detienen?',
          a: 'Si eliges congelar tu plan o traspasarlo, el cobro automático se suspende. Si te cambias de club, continúa normal en tu nuevo club. Cualquier cambio se confirma por email.',
        },
        {
          q: 'Mi caso es muy especial y ninguna opción se ajusta. ¿Qué hago?',
          a: 'Selecciona "Otra solicitud" en el formulario y describe tu situación con tus propias palabras. Nuestro equipo revisa cada caso de forma individual y se contacta directamente contigo.',
        },
      ],
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
   ESTADO DEL WIZARD
   ────────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'energy2026_wizard';

const state = {
  currentStep: 1,
  totalSteps: 3,
  data: {
    /* Paso 1 — Identificación */
    nombre: '', rut: '', email: '', telefono: '', clubActual: '',
    /* Paso 2 — Situación */
    importanciaCercania: '', interesMulticlub: '', planEntrenar: '',
    /* Paso 3 — Decisión */
    opcionElegida: '',
    /* Campos condicionales */
    clubDestino: '', mantenerPT: false,
    mesesPausa: '',
    cesionarioNombre: '', cesionarioRut: '', cesionarioEmail: '', cesionarioTelefono: '',
    esFamiliarDirecto: false,
    otroDetalle: '',
    /* Campo libre general */
    comentario: '', aceptaContacto: false,
    /* Confirmación de condiciones del cesionario (solo aplica si opción = traspaso) */
    aceptaCondicionesTraspaso: false,
  },
};

/* ──────────────────────────────────────────────────────────────
   VALIDACIÓN RUT CHILENO — Módulo 11
   ────────────────────────────────────────────────────────────── */
function formatRut(raw) {
  const clean = raw.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return clean;
  const dv   = clean.slice(-1);
  const body = clean.slice(0, -1);
  return body.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

function validateRut(rut) {
  const clean = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return false;
  const dv   = clean.slice(-1);
  const body = clean.slice(0, -1);
  if (!/^\d+$/.test(body)) return false;

  let sum = 0, mult = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum  += parseInt(body[i]) * mult;
    mult  = mult === 7 ? 2 : mult + 1;
  }
  const rem      = sum % 11;
  const expected = rem === 0 ? '0' : rem === 1 ? 'K' : String(11 - rem);
  return dv === expected;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return /^569\d{8}$/.test(digits) || /^9\d{8}$/.test(digits);
}

/* ──────────────────────────────────────────────────────────────
   TICKET
   ────────────────────────────────────────────────────────────── */
function generateTicket() {
  const now     = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const counter = String(Math.floor((now % 86400000) / 1000 + 1000)).padStart(4, '0');
  return `ENERGY-${dateStr}-${counter}`;
}

/* ──────────────────────────────────────────────────────────────
   LOCALSTORAGE
   ────────────────────────────────────────────────────────────── */
function saveToStorage() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: state.currentStep, data: state.data })); } catch (_) {}
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    const parsed = JSON.parse(saved);
    if (parsed.data)             Object.assign(state.data, parsed.data);
    if (parsed.step && parsed.step > 1) { state.currentStep = parsed.step; return true; }
  } catch (_) {}
  return false;
}

function clearStorage() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
}

/* ──────────────────────────────────────────────────────────────
   PRECARGA DE OPCIÓN RECOMENDADA (Paso 2 → Paso 3)
   ────────────────────────────────────────────────────────────── */
function getRecommendedOption() {
  const { planEntrenar } = state.data;
  /* 'cambio' ahora incluye Pase ALL-CLUB, así que cubre tanto a quien busca
     cercanía como a quien quiere flexibilidad multi-club. */
  if (planEntrenar === 'No estoy seguro' || planEntrenar === 'Probablemente no') return 'pausa';
  return 'cambio';
}

function getClubData(clubId) {
  return CONFIG.closingClubs.find(c => c.id === clubId) || null;
}

/* ──────────────────────────────────────────────────────────────
   RENDERIZADO
   ────────────────────────────────────────────────────────────── */
function renderProgressBar() {
  document.querySelectorAll('.progress-step').forEach((el, i) => {
    const s = i + 1;
    el.classList.toggle('active', s === state.currentStep);
    el.classList.toggle('done',   s <  state.currentStep);
  });
  document.querySelectorAll('.progress-label').forEach((el, i) => {
    const s = i + 1;
    el.classList.toggle('active', s === state.currentStep);
    el.classList.toggle('done',   s <  state.currentStep);
  });
  const pb = document.querySelector('.progress-bar');
  if (pb) pb.setAttribute('aria-valuenow', state.currentStep);
}

function showStep(stepNumber, scroll = true) {
  document.querySelectorAll('.wizard__step').forEach(el => el.classList.remove('visible'));
  const target = document.getElementById(`wizard-step-${stepNumber}`);
  if (target) target.classList.add('visible');
  renderProgressBar();
  if (scroll) document.querySelector('.wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function populateClosingClubs() {
  const sel = document.getElementById('campo-club-actual');
  if (!sel) return;
  CONFIG.closingClubs.forEach(club => {
    const opt   = document.createElement('option');
    opt.value   = club.id;
    opt.textContent = club.name;
    sel.appendChild(opt);
  });
}

function populateDestinationClubs(selectEl, preselect) {
  if (!selectEl) return;
  selectEl.innerHTML = '<option value="">Selecciona un club...</option>';
  CONFIG.destinationClubs.forEach(club => {
    const opt   = document.createElement('option');
    opt.value   = club.id;
    opt.textContent = `${club.name} — ${club.location}`;
    if (club.id === preselect) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

function renderFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;
  container.innerHTML = '';

  CONFIG.faqGroups.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'faq-group';
    groupEl.innerHTML = `<h3 class="faq-group__title">${group.title}</h3>`;

    group.items.forEach(item => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      faqItem.innerHTML = `
        <button class="faq-question" aria-expanded="false">
          <span>${item.q}</span>
          <span class="faq-question__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" role="region">${item.a}</div>
      `;
      const btn = faqItem.querySelector('.faq-question');
      btn.addEventListener('click', () => {
        const isOpen = faqItem.classList.contains('open');
        groupEl.querySelectorAll('.faq-item.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) { faqItem.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
      groupEl.appendChild(faqItem);
    });
    container.appendChild(groupEl);
  });
}

function renderRadioCards() {
  const container = document.getElementById('wizard-option-cards');
  if (!container) return;
  container.innerHTML = '';

  const recommended = getRecommendedOption();

  CONFIG.options.forEach(opt => {
    const card = document.createElement('label');
    card.className = `radio-card${opt.subtle ? ' radio-card--subtle' : ''}`;
    card.setAttribute('for', `opt-${opt.id}`);

    const bulletsHTML = opt.bullets.map(b => `<li>${b}</li>`).join('');
    const badgeHTML   = opt.badge ? `<span class="radio-card__badge">${opt.badge}</span>` : '';

    card.innerHTML = `
      <input type="radio" id="opt-${opt.id}" name="opcionElegida" value="${opt.id}"
             ${opt.id === recommended ? 'checked' : ''}>
      ${badgeHTML}
      <div class="radio-card__header">
        <span class="radio-card__check" aria-hidden="true"></span>
        <div>
          <div class="radio-card__title">${opt.title}</div>
        </div>
      </div>
      <ul class="card__list mt-8">${bulletsHTML}</ul>
    `;

    if (opt.id === recommended) card.classList.add('selected');

    card.addEventListener('click', () => {
      document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.data.opcionElegida = opt.id;
      showConditionalFields(opt.id);
      saveToStorage();
    });

    container.appendChild(card);
  });

  state.data.opcionElegida = recommended;
  showConditionalFields(recommended);
}

function showConditionalFields(optionId) {
  document.querySelectorAll('[data-condition]').forEach(el => el.classList.remove('visible'));

  /* Checkbox de condiciones del cesionario: solo si la opción es traspaso */
  const wrapTras = document.getElementById('wrap-acepta-condiciones-traspaso');
  if (wrapTras) wrapTras.style.display = (optionId === 'traspaso') ? 'block' : 'none';

  if (!optionId) return;
  document.querySelector(`[data-condition="${optionId}"]`)?.classList.add('visible');

  if (optionId === 'cambio') {
    const clubData = getClubData(state.data.clubActual);
    populateDestinationClubs(document.getElementById('campo-club-destino'), clubData?.suggested || '');
    if (state.data.clubDestino) {
      const sel = document.getElementById('campo-club-destino');
      if (sel) sel.value = state.data.clubDestino;
    }
  }
}

/* ──────────────────────────────────────────────────────────────
   VALIDACIÓN POR PASO
   ────────────────────────────────────────────────────────────── */
function showFieldError(id, msg) {
  document.getElementById(id)?.classList.add('error');
  const err = document.getElementById(`${id}-error`);
  if (err) { err.textContent = msg; err.classList.add('visible'); }
}

function clearFieldError(id) {
  document.getElementById(id)?.classList.remove('error');
  document.getElementById(`${id}-error`)?.classList.remove('visible');
}

function clearAllErrors() {
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.field__error.visible').forEach(el => el.classList.remove('visible'));
}

function validateStep1() {
  clearAllErrors();
  let ok = true;
  const d = state.data;
  if (!d.nombre || d.nombre.trim().length < 3) { showFieldError('campo-nombre',    'Ingresa tu nombre completo (mínimo 3 caracteres).'); ok = false; }
  if (!d.rut || !validateRut(d.rut))           { showFieldError('campo-rut',       'RUT inválido. Ej: 12.345.678-9.');                   ok = false; }
  if (!d.email || !validateEmail(d.email))     { showFieldError('campo-email',     'Ingresa un correo electrónico válido.');              ok = false; }
  if (!d.telefono || !validatePhone(d.telefono)) { showFieldError('campo-telefono', 'Teléfono inválido. Ej: 9 1234 5678.');              ok = false; }
  if (!d.clubActual)                           { showFieldError('campo-club-actual','Selecciona tu club actual.');                        ok = false; }
  return ok;
}

function validateStep2() {
  clearAllErrors();
  let ok = true;
  const d = state.data;
  if (!d.importanciaCercania) { showFieldError('campo-cercania',     'Por favor responde esta pregunta.'); ok = false; }
  if (!d.interesMulticlub)   { showFieldError('campo-multiclub',    'Por favor responde esta pregunta.'); ok = false; }
  if (!d.planEntrenar)       { showFieldError('campo-plan-entrenar','Por favor responde esta pregunta.'); ok = false; }
  return ok;
}

function validateStep3() {
  clearAllErrors();
  let ok = true;
  const d = state.data;

  if (!d.opcionElegida) {
    const c = document.getElementById('wizard-option-cards');
    if (c) { c.style.outline = '2px solid #FF0000'; c.style.borderRadius = '8px'; setTimeout(() => { c.style.outline = ''; }, 2000); }
    ok = false;
  }

  if (d.opcionElegida === 'cambio' && !d.clubDestino) {
    showFieldError('campo-club-destino', 'Selecciona el club al que quieres cambiarte.'); ok = false;
  }
  if (d.opcionElegida === 'pausa' && !d.mesesPausa) {
    showFieldError('campo-meses-pausa', 'Selecciona los meses de pausa.'); ok = false;
  }
  if (d.opcionElegida === 'traspaso') {
    if (!d.cesionarioNombre)                           { showFieldError('campo-ces-nombre', 'Nombre requerido.'); ok = false; }
    if (!d.cesionarioRut || !validateRut(d.cesionarioRut)) { showFieldError('campo-ces-rut', 'RUT inválido.'); ok = false; }
    if (!d.cesionarioEmail || !validateEmail(d.cesionarioEmail)) { showFieldError('campo-ces-email', 'Email inválido.'); ok = false; }
    if (!d.cesionarioTelefono || !validatePhone(d.cesionarioTelefono)) { showFieldError('campo-ces-tel', 'Teléfono inválido.'); ok = false; }
    if (!d.aceptaCondicionesTraspaso) {
      showFieldError('campo-acepta-condiciones-traspaso', 'Debes confirmar que el cesionario cumple las 4 condiciones.'); ok = false;
    }
  }
  if (d.opcionElegida === 'otro' && !d.otroDetalle?.trim()) {
    showFieldError('campo-otro-detalle', 'Por favor describe tu solicitud para que podamos ayudarte.'); ok = false;
  }

  if (!d.aceptaContacto) {
    showFieldError('campo-acepta-contacto', 'Debes aceptar este punto para continuar.'); ok = false;
  }
  return ok;
}

/* ──────────────────────────────────────────────────────────────
   ENVÍO
   ────────────────────────────────────────────────────────────── */
async function submitForm() {
  const ticket       = generateTicket();
  const clubActualData  = getClubData(state.data.clubActual);
  const clubDestinoData = CONFIG.destinationClubs.find(c => c.id === state.data.clubDestino);
  const optionData      = CONFIG.options.find(o => o.id === state.data.opcionElegida);

  const payload = {
    ticket,
    nombre:        state.data.nombre,
    rut:           state.data.rut,
    email:         state.data.email,
    telefono:      state.data.telefono,
    clubActual:    clubActualData?.name || state.data.clubActual,
    importanciaCercania: state.data.importanciaCercania,
    interesMulticlub:    state.data.interesMulticlub,
    planEntrenar:        state.data.planEntrenar,
    opcionElegida: optionData?.title || state.data.opcionElegida,
    clubDestino:   clubDestinoData?.name || state.data.clubDestino,
    mantenerPT:    state.data.mantenerPT,
    mesesPausa:    state.data.mesesPausa,
    cesionarioNombre:   state.data.cesionarioNombre,
    cesionarioRut:      state.data.cesionarioRut,
    cesionarioEmail:    state.data.cesionarioEmail,
    cesionarioTelefono: state.data.cesionarioTelefono,
    esFamiliarDirecto:  state.data.esFamiliarDirecto,
    otroDetalle:   state.data.otroDetalle,
    comentario:    state.data.comentario,
    aceptaCondicionesTraspaso: state.data.aceptaCondicionesTraspaso,
    _subject: `[Energy 2026] ${ticket} — ${optionData?.title || ''} — ${clubActualData?.name || ''}`,
    _replyto: state.data.email,
  };

  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok && !CONFIG.formEndpoint.includes('[CONFIGURAR')) throw new Error(`HTTP ${res.status}`);
    showSuccessScreen(ticket);
    clearStorage();
  } catch (err) {
    if (CONFIG.formEndpoint.includes('[CONFIGURAR')) {
      /* Modo desarrollo: mostrar éxito aunque no haya endpoint configurado */
      showSuccessScreen(ticket);
      clearStorage();
    } else {
      alert('Hubo un problema al enviar tu solicitud. Por favor inténtalo de nuevo.');
      console.error('Error al enviar formulario:', err);
    }
  }
}

function showSuccessScreen(ticket) {
  document.querySelectorAll('.wizard__step, .wizard__progress, .resume-banner').forEach(el => {
    el.style.display = 'none';
  });
  const el = document.querySelector('.wizard__success');
  if (el) {
    el.classList.add('visible');
    document.getElementById('success-ticket').textContent = ticket;
    document.getElementById('success-email').textContent  = state.data.email;
  }
}

/* ──────────────────────────────────────────────────────────────
   ENLAZAR CAMPOS AL ESTADO
   ────────────────────────────────────────────────────────────── */
function bindField(domId, stateKey) {
  const el = document.getElementById(domId);
  if (!el) return;
  if (state.data[stateKey]) el.value = state.data[stateKey];
  const handler = () => { state.data[stateKey] = el.value; clearFieldError(domId); saveToStorage(); };
  el.addEventListener('input',  handler);
  el.addEventListener('change', handler);
}

function bindRadioGroup(name, stateKey, onChange) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
    if (state.data[stateKey] === radio.value) {
      radio.checked = true;
      radio.closest('.radio-option')?.classList.add('selected');
    }
    radio.addEventListener('change', () => {
      state.data[stateKey] = radio.value;
      document.querySelectorAll(`input[name="${name}"]`).forEach(r =>
        r.closest('.radio-option')?.classList.toggle('selected', r === radio)
      );
      const key = stateKey.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
      clearFieldError(`campo-${key}`);
      saveToStorage();
      if (onChange) onChange(radio.value);
    });
  });
}

function bindCheckbox(domId, stateKey, onChange) {
  const el = document.getElementById(domId);
  if (!el) return;
  const wrapper = el.closest('.checkbox-option');
  if (state.data[stateKey]) { el.checked = true; wrapper?.classList.add('checked'); }
  const toggle = () => {
    state.data[stateKey] = el.checked;
    wrapper?.classList.toggle('checked', el.checked);
    saveToStorage();
    if (onChange) onChange(el.checked);
  };
  el.addEventListener('change', toggle);
  /* Solo agregar toggle manual si el wrapper NO es un <label>: un label con
     input adentro ya hace el toggle nativamente, agregarle un handler manual
     produce doble-toggle y deja el checkbox en su estado original. */
  if (wrapper && wrapper.tagName !== 'LABEL') {
    wrapper.addEventListener('click', e => { if (e.target !== el) { el.checked = !el.checked; toggle(); } });
  }
}

/* ──────────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Header scroll shadow */
  window.addEventListener('scroll', () => {
    document.querySelector('.app-header')?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* Poblar selects y FAQ */
  populateClosingClubs();
  renderFAQ();

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* Cards de opciones → scroll al formulario */
  document.querySelectorAll('[data-option-cta]').forEach(btn => {
    btn.addEventListener('click', () =>
      document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
    );
  });

  /* Banner de reanudación */
  const hasStorage  = loadFromStorage();
  const resumeBanner = document.querySelector('.resume-banner');
  if (hasStorage && resumeBanner) {
    resumeBanner.classList.add('visible');
    document.getElementById('btn-continuar-guardado')?.addEventListener('click', () => {
      resumeBanner.classList.remove('visible');
      showStep(state.currentStep);
      repopulateFields();
    });
    document.getElementById('btn-empezar-nuevo')?.addEventListener('click', () => {
      clearStorage();
      resetState();
      state.currentStep = 1;
      resumeBanner.classList.remove('visible');
      showStep(1);
    });
  }

  /* ── Paso 1 ── */
  bindField('campo-email',     'email');
  bindField('campo-comentario','comentario');

  const rutInput = document.getElementById('campo-rut');
  if (rutInput) {
    if (state.data.rut) rutInput.value = state.data.rut;
    rutInput.addEventListener('input', () => {
      rutInput.value        = formatRut(rutInput.value);
      state.data.rut        = rutInput.value;
      clearFieldError('campo-rut');
      saveToStorage();
    });
  }

  const nombreInput = document.getElementById('campo-nombre');
  if (nombreInput) {
    if (state.data.nombre) nombreInput.value = state.data.nombre;
    nombreInput.addEventListener('input', () => { state.data.nombre = nombreInput.value; clearFieldError('campo-nombre'); saveToStorage(); });
  }

  const telInput = document.getElementById('campo-telefono');
  if (telInput) {
    if (state.data.telefono) telInput.value = state.data.telefono;
    telInput.addEventListener('input', () => { state.data.telefono = telInput.value; clearFieldError('campo-telefono'); saveToStorage(); });
  }

  const clubActualSel = document.getElementById('campo-club-actual');
  if (clubActualSel) {
    if (state.data.clubActual) clubActualSel.value = state.data.clubActual;
    clubActualSel.addEventListener('change', () => { state.data.clubActual = clubActualSel.value; clearFieldError('campo-club-actual'); saveToStorage(); });
  }

  /* ── Paso 2 ── */
  bindRadioGroup('importanciaCercania', 'importanciaCercania');
  bindRadioGroup('interesMulticlub',    'interesMulticlub');
  bindRadioGroup('planEntrenar',        'planEntrenar');

  /* ── Paso 3 — campos condicionales ── */
  const clubDestinoSel = document.getElementById('campo-club-destino');
  if (clubDestinoSel) {
    clubDestinoSel.addEventListener('change', () => { state.data.clubDestino = clubDestinoSel.value; clearFieldError('campo-club-destino'); saveToStorage(); });
  }
  bindCheckbox('campo-mantener-pt', 'mantenerPT');
  bindField('campo-meses-pausa', 'mesesPausa');

  bindField('campo-ces-nombre', 'cesionarioNombre');
  const cesRut = document.getElementById('campo-ces-rut');
  if (cesRut) {
    if (state.data.cesionarioRut) cesRut.value = state.data.cesionarioRut;
    cesRut.addEventListener('input', () => { cesRut.value = formatRut(cesRut.value); state.data.cesionarioRut = cesRut.value; saveToStorage(); });
  }
  bindField('campo-ces-email', 'cesionarioEmail');
  bindField('campo-ces-tel',   'cesionarioTelefono');
  bindCheckbox('campo-familiar-directo', 'esFamiliarDirecto');

  /* Textarea "Otra solicitud" */
  const otroTA    = document.getElementById('campo-otro-detalle');
  const otroCount = document.getElementById('otro-detalle-char-count');
  if (otroTA) {
    if (state.data.otroDetalle) otroTA.value = state.data.otroDetalle;
    otroTA.addEventListener('input', () => {
      state.data.otroDetalle = otroTA.value;
      if (otroCount) otroCount.textContent = `${otroTA.value.length}/1000`;
      clearFieldError('campo-otro-detalle');
      saveToStorage();
    });
    if (otroCount) otroCount.textContent = `${otroTA.value.length}/1000`;
  }

  /* Textarea comentario general */
  const comentTA    = document.getElementById('campo-comentario');
  const comentCount = document.getElementById('comentario-char-count');
  if (comentTA && comentCount) {
    const upd = () => { comentCount.textContent = `${comentTA.value.length}/500`; };
    comentTA.addEventListener('input', upd);
    upd();
  }

  bindCheckbox('campo-acepta-contacto', 'aceptaContacto');
  bindCheckbox('campo-acepta-condiciones-traspaso', 'aceptaCondicionesTraspaso');

  /* ── Botones de navegación ── */
  document.getElementById('btn-step1-next')?.addEventListener('click', () => {
    if (validateStep1()) { state.currentStep = 2; showStep(2); saveToStorage(); }
  });

  document.getElementById('btn-step2-back')?.addEventListener('click', () => { state.currentStep = 1; showStep(1); });
  document.getElementById('btn-step2-next')?.addEventListener('click', () => {
    if (validateStep2()) { state.currentStep = 3; renderRadioCards();
      showStep(3); saveToStorage();
    }
  });

  document.getElementById('btn-step3-back')?.addEventListener('click', () => { state.currentStep = 2; showStep(2); });
  document.getElementById('btn-step3-submit')?.addEventListener('click', () => {
    if (validateStep3()) submitForm();
  });

  /* Botón "Volver al inicio" en pantalla de éxito */
  document.getElementById('btn-volver-inicio')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Arrancar desde el paso correcto */
  if (!hasStorage) showStep(1, false);
});

/* Repoblar campos al reanudar desde localStorage */
function repopulateFields() {
  const d = state.data;
  const sv = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
  sv('campo-nombre',    d.nombre);
  sv('campo-rut',       d.rut);
  sv('campo-email',     d.email);
  sv('campo-telefono',  d.telefono);
  sv('campo-club-actual', d.clubActual);
  sv('campo-comentario', d.comentario);

  const checkRadio = (name, val) => {
    const r = document.querySelector(`input[name="${name}"][value="${val}"]`);
    if (r) { r.checked = true; r.closest('.radio-option')?.classList.add('selected'); }
  };
  checkRadio('importanciaCercania', d.importanciaCercania);
  checkRadio('interesMulticlub',    d.interesMulticlub);
  checkRadio('planEntrenar',        d.planEntrenar);
}

/* Resetear el estado completo */
function resetState() {
  Object.assign(state.data, {
    nombre: '', rut: '', email: '', telefono: '', clubActual: '',
    importanciaCercania: '', interesMulticlub: '', planEntrenar: '',
    opcionElegida: '', clubDestino: '', mantenerPT: false, mesesPausa: '',
    cesionarioNombre: '', cesionarioRut: '', cesionarioEmail: '', cesionarioTelefono: '',
    esFamiliarDirecto: false,
    otroDetalle: '', comentario: '', aceptaContacto: false,
    aceptaCondicionesTraspaso: false,
  });
}
