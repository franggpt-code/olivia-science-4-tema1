// =============================================================================
// LÓGICA PRINCIPAL DE LA APLICACIÓN · SCIENCE 4º PRIMARIA · TEMA 1
// =============================================================================

// Helper seguro para localStorage en iPad / Safari (evita excepciones en modo privado)
var safeStorage = {
  get: function(key, fallback) {
    try {
      var val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set: function(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  }
};

class ScienceApp {
  constructor() {
    this.studentName = safeStorage.get("olivia_student_name", "Olivia");
    this.currentMode = "home"; // "home" | "exam" | "sorter" | "study" | "results" | "diploma"
    this.currentExamId = null; // "part1" | "part2" | "express"
    this.currentQuestions = [];
    this.currentIndex = 0;
    this.examResults = [];
    this.userAnswers = {}; // { [questionId]: { value, isCorrect, feedback } }
    this.currentQuestionSubmitted = false;

    // Estado del mini-juego clasificador
    this.sorterActiveCategory = "origin"; // "origin" | "func" | "processing"
    this.sorterIndex = 0;
    this.sorterScore = 0;
    this.sorterStreak = 0;
    this.sorterTotalPlayed = 0;
    this.sorterHistory = [];

    // Variables de sesión
    this.stars = parseInt(safeStorage.get("olivia_stars", "0"), 10);
    this.examsCompleted = parseInt(safeStorage.get("olivia_completed", "0"), 10);

    this.init();
  }

  init() {
    this.renderHeaderStats();
    this.bindGlobalEvents();
    this.navigate("home");
  }

  // Actualiza contadores en cabecera
  renderHeaderStats() {
    const starsEl = document.getElementById("header-stars");
    if (starsEl) starsEl.textContent = this.stars;
    const nameEl = document.getElementById("header-student-name");
    if (nameEl) nameEl.textContent = this.studentName;
  }

  addStars(count) {
    this.stars += count;
    safeStorage.set("olivia_stars", this.stars);
    this.renderHeaderStats();
  }

  setStudentName(newName) {
    const trimmed = (newName || "").trim();
    if (trimmed) {
      this.studentName = trimmed;
      safeStorage.set("olivia_student_name", this.studentName);
      this.renderHeaderStats();
    }
  }

  // Navegación central
  navigate(view, payload = {}) {
    this.currentMode = view;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Resaltar pestañas en barra superior
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      const target = btn.getAttribute("data-target");
      if (target === view || (view === "exam" && target === this.currentExamId)) {
        btn.classList.add("bg-blue-600", "text-white", "shadow");
        btn.classList.remove("text-slate-600", "hover:bg-slate-100");
      } else {
        btn.classList.remove("bg-blue-600", "text-white", "shadow");
        btn.classList.add("text-slate-600", "hover:bg-slate-100");
      }
    });

    const mainContainer = document.getElementById("app-main-content");
    if (!mainContainer) return;

    switch (view) {
      case "home":
        this.renderHome(mainContainer);
        break;
      case "exam":
        this.renderExamView(mainContainer);
        break;
      case "sorter":
        this.renderSorterView(mainContainer);
        break;
      case "study":
        this.renderStudyGuide(mainContainer);
        break;
      case "results":
        this.renderResultsView(mainContainer);
        break;
      case "diploma":
        this.renderDiplomaView(mainContainer);
        break;
      default:
        this.renderHome(mainContainer);
    }
  }

  // ---------------------------------------------------------------------------
  // VISTA: PÁGINA DE INICIO
  // ---------------------------------------------------------------------------
  renderHome(container) {
    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-8 animate-pop-in">
        <!-- Hero Banner Infantil -->
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-3xl p-8 md:p-10 text-white shadow-xl">
          <div class="relative z-10 max-w-2xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs md:text-sm font-semibold tracking-wide">
              <span>🎒 4.º de Primaria</span>
              <span>•</span>
              <span>Editorial Santillana · CLAVES</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-black font-display leading-tight">
              ¡Hola, <span class="text-amber-300 underline decoration-wavy decoration-amber-400 cursor-pointer" id="edit-name-btn" title="Haz clic para cambiar nombre">${this.studentName}</span>! 🌟
            </h1>
            <p class="text-blue-100 text-base md:text-lg leading-relaxed font-medium">
              Prepárate para sacar un <span class="text-yellow-300 font-bold">10 en el examen de Ciencias</span> del <strong>Tema 1: La Salud</strong>.
              Practica con preguntas como las del cole, resuelve la gran misión de la bicicleta y diviértete clasificando alimentos.
            </p>
            <div class="flex flex-wrap gap-3 pt-2">
              <button id="btn-start-p1" class="btn-bouncy px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-2xl font-black text-base shadow-lg flex items-center gap-2">
                <span>🚀 Empezar Parte 1 (Conceptos)</span>
              </button>
              <button id="btn-start-p2" class="btn-bouncy px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 rounded-2xl font-black text-base shadow-lg flex items-center gap-2">
                <span>🚴‍♀️ Misión Caso Práctico (Parte 2)</span>
              </button>
            </div>
          </div>
          <div class="absolute -right-6 -bottom-8 opacity-25 md:opacity-40 select-none text-9xl pointer-events-none">
            🍎🚲
          </div>
        </div>

        <!-- Secciones de Práctica -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>🎯 Elige cómo quieres practicar hoy</span>
            </h2>
            <span class="text-sm font-bold text-slate-500">2 partes oficiales + juegos</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Tarjeta Parte 1 -->
            <div class="card-playful p-6 flex flex-col justify-between hover:shadow-xl group border-t-8 border-t-blue-500">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider">Prueba B Oficial</span>
                  <span class="text-2xl">📝</span>
                </div>
                <h3 class="text-xl font-black text-slate-800 group-hover:text-blue-600 transition">
                  Parte 1: Conceptos Clave
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-medium">
                  10 ejercicios de salud física, mental y social, funciones de los alimentos, vacunas, prevención y ejercicio seguro.
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-blue-600">
                  <span>⏱️ ~10 minutos</span>
                  <span>•</span>
                  <span>⭐ 10 ejercicios</span>
                </div>
              </div>
              <button class="mt-6 w-full btn-bouncy py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2" onclick="app.startExam('part1')">
                <span>Hacer Parte 1</span>
                <span>➡️</span>
              </button>
            </div>

            <!-- Tarjeta Parte 2 -->
            <div class="card-playful p-6 flex flex-col justify-between hover:shadow-xl group border-t-8 border-t-emerald-500">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider">Prueba A Oficial</span>
                  <span class="text-2xl">🚴‍♀️</span>
                </div>
                <h3 class="text-xl font-black text-slate-800 group-hover:text-emerald-600 transition">
                  Parte 2: Misión y Caso Práctico
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-medium">
                  10 preguntas aplicadas sobre la excursión en bici de Ana: el pícnic de salmón, refrescos, mochila adecuada y posturas.
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <span>📖 Caso contextual</span>
                  <span>•</span>
                  <span>⭐ 10 ejercicios</span>
                </div>
              </div>
              <button class="mt-6 w-full btn-bouncy py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2" onclick="app.startExam('part2')">
                <span>Hacer Parte 2</span>
                <span>➡️</span>
              </button>
            </div>

            <!-- Tarjeta Desafío Express -->
            <div class="card-playful p-6 flex flex-col justify-between hover:shadow-xl group border-t-8 border-t-amber-500">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-wider">Entrenamiento Rápido</span>
                  <span class="text-2xl">⚡</span>
                </div>
                <h3 class="text-xl font-black text-slate-800 group-hover:text-amber-600 transition">
                  Desafío Express Aleatorio
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-medium">
                  10 preguntas al azar mezcladas de todo el tema para entrenar la rapidez mental antes del examen real.
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-amber-600">
                  <span>🎲 Preguntas variadas</span>
                  <span>•</span>
                  <span>⭐ Infinito</span>
                </div>
              </div>
              <button class="mt-6 w-full btn-bouncy py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl font-black flex items-center justify-center gap-2" onclick="app.startExam('express')">
                <span>Empezar Desafío</span>
                <span>➡️</span>
              </button>
            </div>

            <!-- Tarjeta Mini-Juego Clasificador -->
            <div class="card-playful p-6 flex flex-col justify-between hover:shadow-xl group border-t-8 border-t-purple-500">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-black uppercase tracking-wider">Mini-Juego</span>
                  <span class="text-2xl">🍎</span>
                </div>
                <h3 class="text-xl font-black text-slate-800 group-hover:text-purple-600 transition">
                  El Supermercado Saludable
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-medium">
                  ¡Pon a prueba tus reflejos! Clasifica 24 alimentos por Origen, Función (Energéticos, Constructores, Reguladores) y Procesado.
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-purple-600">
                  <span>🕹️ Modo Arcade</span>
                  <span>•</span>
                  <span>🔥 Rachas y combos</span>
                </div>
              </div>
              <button class="mt-6 w-full btn-bouncy py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2" onclick="app.navigate('sorter')">
                <span>Jugar al Clasificador</span>
                <span>➡️</span>
              </button>
            </div>

            <!-- Tarjeta Guía de Estudio -->
            <div class="card-playful p-6 flex flex-col justify-between hover:shadow-xl group border-t-8 border-t-rose-500">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-black uppercase tracking-wider">Repaso Teórico</span>
                  <span class="text-2xl">📚</span>
                </div>
                <h3 class="text-xl font-black text-slate-800 group-hover:text-rose-600 transition">
                  Guía Visual del Tema 1
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-medium">
                  Todas las definiciones, tablas del libro CLAVES, trucos para recordar la postura y el semáforo nutricional.
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-rose-600">
                  <span>📖 Lectura fácil</span>
                  <span>•</span>
                  <span>🖨️ Imprimible</span>
                </div>
              </div>
              <button class="mt-6 w-full btn-bouncy py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center justify-center gap-2" onclick="app.navigate('study')">
                <span>Abrir Guía</span>
                <span>➡️</span>
              </button>
            </div>

            <!-- Tarjeta Diploma Oficial -->
            <div class="card-playful p-6 flex flex-col justify-between hover:shadow-xl group border-t-8 border-t-yellow-500 bg-gradient-to-br from-amber-50 to-yellow-100/60">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-xs font-black uppercase tracking-wider">Reconocimiento</span>
                  <span class="text-2xl">🎓</span>
                </div>
                <h3 class="text-xl font-black text-slate-800 group-hover:text-amber-700 transition">
                  Diploma de Olivia
                </h3>
                <p class="text-sm text-slate-700 leading-relaxed font-medium">
                  Consigue tu título oficial de «Especialista en Salud y Ciencias de la Naturaleza» para imprimir y colgar en tu habitación.
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <span>🏆 Certificado Oficial</span>
                  <span>•</span>
                  <span>✨ Con tu nombre</span>
                </div>
              </div>
              <button class="mt-6 w-full btn-bouncy py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-xl font-black flex items-center justify-center gap-2" onclick="app.navigate('diploma')">
                <span>Ver mi Diploma</span>
                <span>⭐</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Eventos de botones
    const editNameBtn = document.getElementById("edit-name-btn");
    if (editNameBtn) {
      editNameBtn.addEventListener("click", () => {
        const nombre = prompt("¿Cómo te llamas?", this.studentName);
        if (nombre) {
          this.setStudentName(nombre);
          this.renderHome(container);
        }
      });
    }

    const bP1 = document.getElementById("btn-start-p1");
    if (bP1) bP1.onclick = () => this.startExam("part1");

    const bP2 = document.getElementById("btn-start-p2");
    if (bP2) bP2.onclick = () => this.startExam("part2");
  }

  // ---------------------------------------------------------------------------
  // INICIO DE EXAMEN
  // ---------------------------------------------------------------------------
  startExam(examId, filterMistakesOnly = false) {
    sound.playClick();
    this.currentExamId = examId;
    this.currentIndex = 0;
    this.examResults = [];
    this.userAnswers = {};
    this.currentQuestionSubmitted = false;

    if (examId === "part1") {
      this.currentQuestions = JSON.parse(JSON.stringify(EXAM_DATA.part1.questions));
    } else if (examId === "part2") {
      this.currentQuestions = JSON.parse(JSON.stringify(EXAM_DATA.part2.questions));
    } else if (examId === "express") {
      // Mezcla 10 preguntas aleatorias de todas las partes
      const pool = [
        ...EXAM_DATA.part1.questions,
        ...EXAM_DATA.part2.questions,
        ...EXAM_DATA.expressPool
      ];
      // Shuffle
      this.currentQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    if (filterMistakesOnly && this.lastMistakeIds && this.lastMistakeIds.length > 0) {
      this.currentQuestions = this.currentQuestions.filter(q => this.lastMistakeIds.includes(q.id));
    }

    this.navigate("exam");
  }

  // ---------------------------------------------------------------------------
  // VISTA: EXAMEN EN CURSO
  // ---------------------------------------------------------------------------
  renderExamView(container) {
    if (!this.currentQuestions || this.currentQuestions.length === 0) {
      this.navigate("home");
      return;
    }

    const question = this.currentQuestions[this.currentIndex];
    const total = this.currentQuestions.length;
    const progressPercent = Math.round(((this.currentIndex) / total) * 100);
    const examMeta = EXAM_DATA[this.currentExamId] || { title: "Desafío Express", badge: "Express" };

    // Caso práctico de historia si es parte 2
    let storyBlockHtml = "";
    if (this.currentExamId === "part2" && EXAM_DATA.part2.story) {
      storyBlockHtml = `
        <div class="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 md:p-5 mb-6 text-slate-800 text-sm md:text-base">
          <div class="flex items-center justify-between mb-2">
            <span class="font-black text-emerald-800 flex items-center gap-1.5">
              <span>📖</span>
              <span>${EXAM_DATA.part2.story.headline}</span>
            </span>
            <button class="text-xs font-bold text-emerald-700 underline" onclick="sound.speakText('${EXAM_DATA.part2.story.text.replace(/['"\n]/g, ' ')}')">
              🗣️ Escuchar historia
            </button>
          </div>
          <p class="whitespace-pre-line text-slate-700 leading-relaxed font-medium">
            ${EXAM_DATA.part2.story.text}
          </p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 animate-pop-in">
        <!-- Barra de progreso superior -->
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider">
                ${examMeta.badge}
              </span>
              <span class="font-extrabold text-slate-800 text-sm md:text-base">
                Pregunta ${this.currentIndex + 1} de ${total}
              </span>
            </div>
            <div class="flex items-center gap-3">
              <button id="btn-read-aloud" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition" title="Escuchar en voz alta">
                <span>🗣️ Leer pregunta</span>
              </button>
              <button class="text-xs font-bold text-slate-400 hover:text-slate-600" onclick="if(confirm('¿Quieres salir al menú principal?')) app.navigate('home')">
                ✕ Salir
              </button>
            </div>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div class="bg-blue-600 h-3 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
          </div>
        </div>

        ${storyBlockHtml}

        <!-- Tarjeta de la Pregunta -->
        <div class="card-playful p-6 md:p-8 space-y-6">
          <div class="space-y-2">
            <h2 class="text-xl md:text-2xl font-black text-slate-800 leading-snug">
              ${question.title}
            </h2>
            <p class="text-base text-slate-600 font-medium">
              ${question.instruction}
            </p>
          </div>

          <!-- Imagen / Visual si la pregunta lo requiere -->
          ${this.getQuestionVisualHtml(question)}

          <!-- Contenido interactivo según tipo -->
          <div id="question-interactive-body" class="space-y-4">
            ${this.renderQuestionBody(question)}
          </div>

          <!-- Caja de Feedback y Explicación -->
          <div id="feedback-box" class="hidden rounded-2xl p-5 border-2 animate-pop-in space-y-3">
            <div id="feedback-title" class="text-lg font-black flex items-center gap-2"></div>
            <div id="feedback-desc" class="text-sm md:text-base text-slate-700 font-medium leading-relaxed"></div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <div class="text-xs font-semibold text-slate-400">
              Ciencias de la Naturaleza 4º · Tema 1
            </div>
            <div class="flex items-center gap-3">
              <button id="btn-check-answer" class="btn-bouncy px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-base shadow flex items-center gap-2">
                <span>Comprobar respuesta</span>
                <span>✨</span>
              </button>
              <button id="btn-next-question" class="hidden btn-bouncy px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-base shadow flex items-center gap-2">
                <span>${this.currentIndex + 1 === total ? 'Ver Mis Resultados 🏆' : 'Siguiente Pregunta ➡️'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Eventos de botones
    const readBtn = document.getElementById("btn-read-aloud");
    if (readBtn) {
      readBtn.onclick = () => {
        sound.speakText(`${question.title}. ${question.instruction}`);
      };
    }

    const checkBtn = document.getElementById("btn-check-answer");
    if (checkBtn) {
      checkBtn.onclick = () => this.submitAnswer(question);
    }

    const nextBtn = document.getElementById("btn-next-question");
    if (nextBtn) {
      nextBtn.onclick = () => this.goToNextQuestion();
    }

    // Inicializar listeners específicos del tipo de pregunta
    this.setupQuestionInteractivity(question);
  }

  // Gráficos e ilustraciones contextuales
  getQuestionVisualHtml(q) {
    if (!q.hasImages) return "";

    if (q.id === "p1_q8") {
      // Pan tradicional vs Yogur
      return `
        <div class="grid grid-cols-2 gap-4 my-2">
          <div class="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
            <div class="text-5xl mb-2">🥖</div>
            <span class="inline-block px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-xs font-black">A: Pan artesanal</span>
          </div>
          <div class="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 text-center">
            <div class="text-5xl mb-2">🥣</div>
            <span class="inline-block px-3 py-1 bg-sky-200 text-sky-900 rounded-full text-xs font-black">B: Yogur natural</span>
          </div>
        </div>
      `;
    }

    if (q.id === "p2_q9") {
      // Mochila de 2 tirantes vs Bolsa de tela
      return `
        <div class="grid grid-cols-2 gap-4 my-2">
          <div class="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-center">
            <div class="text-5xl mb-2">🎒</div>
            <span class="inline-block px-3 py-1 bg-rose-200 text-rose-900 rounded-full text-xs font-black">Opción A: Mochila ergonómica de 2 tirantes</span>
            <p class="text-xs text-slate-500 mt-1">Con tirantes acolchados y pegada a la espalda</p>
          </div>
          <div class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-center">
            <div class="text-5xl mb-2">🛍️</div>
            <span class="inline-block px-3 py-1 bg-slate-200 text-slate-900 rounded-full text-xs font-black">Opción B: Bolsa de tela de un solo asa</span>
            <p class="text-xs text-slate-500 mt-1">Para colgar de un hombro o llevar en una mano</p>
          </div>
        </div>
      `;
    }

    return "";
  }

  // Renderiza el cuerpo de la pregunta según tipo
  renderQuestionBody(q) {
    if (q.type === "single_choice") {
      return `
        <div class="space-y-3" id="options-container">
          ${q.options.map((opt, i) => `
            <div class="option-card p-4 rounded-2xl flex items-center gap-4 cursor-pointer" data-opt-id="${opt.id}" onclick="app.selectSingleOption('${opt.id}')">
              <span class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-700 text-sm border border-slate-300 opt-badge">
                ${String.fromCharCode(65 + i)}
              </span>
              <span class="text-base text-slate-800 font-semibold flex-1">
                ${opt.text}
              </span>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (q.type === "multiple_choice") {
      return `
        <div class="space-y-3" id="options-container">
          <div class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
            📌 Selecciona ${q.requiredCorrectCount || 3} opciones que sean correctas
          </div>
          ${q.options.map((opt, i) => `
            <div class="option-card p-4 rounded-2xl flex items-center gap-4 cursor-pointer" data-opt-id="${opt.id}" onclick="app.toggleMultipleOption('${opt.id}')">
              <input type="checkbox" class="w-5 h-5 rounded text-blue-600 pointer-events-none" id="chk-${opt.id}">
              <span class="text-base text-slate-800 font-semibold flex-1">
                ${opt.text}
              </span>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (q.type === "matching") {
      return `
        <div class="space-y-4" id="matching-container">
          <p class="text-xs font-bold text-slate-500">
            Haz clic en un elemento de la izquierda y luego en su significado a la derecha:
          </p>
          <div class="space-y-3">
            ${q.pairs.map((pair, idx) => `
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <span class="font-extrabold text-blue-700 text-base md:w-1/3">
                  ${pair.left}
                </span>
                <select class="matching-select bg-white border-2 border-slate-300 rounded-xl p-2.5 text-sm font-semibold text-slate-700 focus:border-blue-500 focus:outline-none flex-1" data-pair-idx="${idx}">
                  <option value="">-- Elige la correspondencia correcta --</option>
                  ${this.shuffleArray([...q.pairs]).map(p => `
                    <option value="${p.right}">${p.right}</option>
                  `).join("")}
                </select>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    if (q.type === "fill_blanks") {
      // Reemplaza los HUECOS por slots interactivos
      let sentenceHtml = q.promptText;
      q.slots.forEach(slot => {
        sentenceHtml = sentenceHtml.replace(
          `[${slot}]`,
          `<span class="blank-slot" data-slot="${slot}" onclick="app.clearBlankSlot('${slot}')">____</span>`
        );
      });

      return `
        <div class="space-y-6" id="fill-blanks-container">
          <div class="p-6 bg-blue-50/70 border-2 border-blue-200 rounded-2xl text-slate-800 text-lg md:text-xl font-bold leading-loose">
            ${sentenceHtml}
          </div>

          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">
              Banco de palabras (pulsa para colocar):
            </span>
            <div class="flex flex-wrap gap-2.5 pt-1" id="word-bank-tokens">
              ${q.wordBank.map(w => `
                <button class="word-token" data-word="${w}" onclick="app.insertWordIntoBlank('${w}')">
                  ${w}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      `;
    }

    return `<div class="text-red-500 font-bold">Tipo de pregunta no compatible.</div>`;
  }

  shuffleArray(arr) {
    return arr.sort(() => 0.5 - Math.random());
  }

  // Gestión de selección: Single choice
  selectSingleOption(optId) {
    if (this.currentQuestionSubmitted) return;
    sound.playClick();
    document.querySelectorAll("#options-container .option-card").forEach(c => {
      c.classList.remove("selected");
    });
    const selected = document.querySelector(`[data-opt-id="${optId}"]`);
    if (selected) selected.classList.add("selected");
    this.selectedSingleChoice = optId;
  }

  // Gestión de selección: Multiple choice
  toggleMultipleOption(optId) {
    if (this.currentQuestionSubmitted) return;
    sound.playClick();
    if (!this.selectedMultiChoices) this.selectedMultiChoices = new Set();

    const card = document.querySelector(`[data-opt-id="${optId}"]`);
    const chk = document.getElementById(`chk-${optId}`);

    if (this.selectedMultiChoices.has(optId)) {
      this.selectedMultiChoices.delete(optId);
      if (card) card.classList.remove("selected");
      if (chk) chk.checked = false;
    } else {
      this.selectedMultiChoices.add(optId);
      if (card) card.classList.add("selected");
      if (chk) chk.checked = true;
    }
  }

  // Gestión de Fill Blanks
  insertWordIntoBlank(word) {
    if (this.currentQuestionSubmitted) return;
    sound.playClick();
    if (!this.blankSlotValues) this.blankSlotValues = {};

    const q = this.currentQuestions[this.currentIndex];
    // Encuentra el primer slot vacío
    const emptySlot = q.slots.find(s => !this.blankSlotValues[s]);
    if (!emptySlot) return;

    this.blankSlotValues[emptySlot] = word;
    const slotEl = document.querySelector(`.blank-slot[data-slot="${emptySlot}"]`);
    if (slotEl) {
      slotEl.textContent = word;
      slotEl.classList.add("filled");
    }

    // Marca la ficha como usada
    const tokenBtn = document.querySelector(`.word-token[data-word="${word}"]`);
    if (tokenBtn) tokenBtn.classList.add("used");
  }

  clearBlankSlot(slotKey) {
    if (this.currentQuestionSubmitted) return;
    sound.playClick();
    if (!this.blankSlotValues || !this.blankSlotValues[slotKey]) return;

    const removedWord = this.blankSlotValues[slotKey];
    delete this.blankSlotValues[slotKey];

    const slotEl = document.querySelector(`.blank-slot[data-slot="${slotKey}"]`);
    if (slotEl) {
      slotEl.textContent = "____";
      slotEl.classList.remove("filled");
    }

    const tokenBtn = document.querySelector(`.word-token[data-word="${removedWord}"]`);
    if (tokenBtn) tokenBtn.classList.remove("used");
  }

  setupQuestionInteractivity(q) {
    this.selectedSingleChoice = null;
    this.selectedMultiChoices = new Set();
    this.blankSlotValues = {};
  }

  // ---------------------------------------------------------------------------
  // COMPROBACIÓN DE RESPUESTA
  // ---------------------------------------------------------------------------
  submitAnswer(q) {
    if (this.currentQuestionSubmitted) return;

    let isCorrect = false;
    let studentAnswerSummary = "";

    if (q.type === "single_choice") {
      if (!this.selectedSingleChoice) {
        alert("Por favor, selecciona una de las opciones.");
        return;
      }
      const chosen = q.options.find(o => o.id === this.selectedSingleChoice);
      isCorrect = chosen && chosen.correct;
      studentAnswerSummary = chosen ? chosen.text : "";

      // Resalta opciones
      q.options.forEach(opt => {
        const card = document.querySelector(`[data-opt-id="${opt.id}"]`);
        if (!card) return;
        card.classList.add("disabled");
        if (opt.correct) {
          card.classList.add("correct-reveal");
        } else if (opt.id === this.selectedSingleChoice) {
          card.classList.add("incorrect-reveal");
        }
      });
    } else if (q.type === "multiple_choice") {
      if (this.selectedMultiChoices.size === 0) {
        alert("Por favor, selecciona las opciones correctas.");
        return;
      }
      const correctSet = new Set(q.options.filter(o => o.correct).map(o => o.id));
      const userSet = this.selectedMultiChoices;

      // Correcto si coincide exactamente
      isCorrect = correctSet.size === userSet.size && [...correctSet].every(x => userSet.has(x));

      q.options.forEach(opt => {
        const card = document.querySelector(`[data-opt-id="${opt.id}"]`);
        if (!card) return;
        card.classList.add("disabled");
        if (opt.correct) {
          card.classList.add("correct-reveal");
        } else if (userSet.has(opt.id)) {
          card.classList.add("incorrect-reveal");
        }
      });
    } else if (q.type === "matching") {
      const selects = document.querySelectorAll(".matching-select");
      let allFilled = true;
      let allMatchesCorrect = true;

      selects.forEach(sel => {
        const idx = parseInt(sel.getAttribute("data-pair-idx"), 10);
        const userVal = sel.value;
        if (!userVal) allFilled = false;
        if (userVal !== q.pairs[idx].right) allMatchesCorrect = false;
      });

      if (!allFilled) {
        alert("Por favor, completa todas las correspondencias.");
        return;
      }

      isCorrect = allMatchesCorrect;
      selects.forEach((sel, idx) => {
        sel.disabled = true;
        if (sel.value === q.pairs[idx].right) {
          sel.classList.add("bg-emerald-50", "border-emerald-500", "text-emerald-800");
        } else {
          sel.classList.add("bg-rose-50", "border-rose-500", "text-rose-800");
        }
      });
    } else if (q.type === "fill_blanks") {
      const slots = q.slots;
      const allFilled = slots.every(s => !!this.blankSlotValues[s]);
      if (!allFilled) {
        alert("Por favor, rellena todos los huecos de la frase.");
        return;
      }

      const answersGiven = slots.map(s => this.blankSlotValues[s]);
      isCorrect = JSON.stringify(answersGiven) === JSON.stringify(q.correctAnswers);

      slots.forEach((s, idx) => {
        const el = document.querySelector(`.blank-slot[data-slot="${s}"]`);
        if (el) {
          if (this.blankSlotValues[s] === q.correctAnswers[idx]) {
            el.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-800");
          } else {
            el.classList.add("bg-rose-100", "border-rose-500", "text-rose-800");
          }
        }
      });
    }

    this.currentQuestionSubmitted = true;
    this.examResults.push({
      questionId: q.id,
      title: q.title,
      isCorrect: isCorrect,
      explanation: q.explanation
    });

    // Retroalimentación visual y sonora
    const feedbackBox = document.getElementById("feedback-box");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackDesc = document.getElementById("feedback-desc");
    const checkBtn = document.getElementById("btn-check-answer");
    const nextBtn = document.getElementById("btn-next-question");

    feedbackBox.classList.remove("hidden");
    if (isCorrect) {
      sound.playCorrect();
      this.addStars(1);
      feedbackBox.classList.add("bg-emerald-50", "border-emerald-400");
      feedbackTitle.className = "text-lg font-black text-emerald-800 flex items-center gap-2";
      feedbackTitle.innerHTML = `<span>🎉</span> <span>¡Respuesta Correcta, ${this.studentName}!</span>`;
      // Mini confeti
      if (typeof confetti === "function") {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      sound.playIncorrect();
      feedbackBox.classList.add("bg-amber-50", "border-amber-400");
      feedbackTitle.className = "text-lg font-black text-amber-800 flex items-center gap-2";
      feedbackTitle.innerHTML = `<span>💡</span> <span>¡Casi! Repasemos la respuesta correcta:</span>`;
    }

    feedbackDesc.textContent = q.explanation;

    // Cambia botones
    if (checkBtn) checkBtn.classList.add("hidden");
    if (nextBtn) {
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
    }
  }

  goToNextQuestion() {
    sound.playClick();
    this.currentIndex++;
    if (this.currentIndex >= this.currentQuestions.length) {
      this.finishExam();
    } else {
      this.currentQuestionSubmitted = false;
      this.renderExamView(document.getElementById("app-main-content"));
    }
  }

  // ---------------------------------------------------------------------------
  // FINAL DE EXAMEN Y RESULTADOS
  // ---------------------------------------------------------------------------
  finishExam() {
    this.examsCompleted++;
    safeStorage.set("olivia_completed", this.examsCompleted);

    const total = this.examResults.length;
    const correctCount = this.examResults.filter(r => r.isCorrect).length;
    const scoreGrade = Math.round((correctCount / total) * 10 * 10) / 10;

    this.lastExamSummary = {
      examId: this.currentExamId,
      total,
      correctCount,
      scoreGrade,
      date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    };

    // Guarda IDs fallados para reintentar solo fallos
    this.lastMistakeIds = this.examResults.filter(r => !r.isCorrect).map(r => r.questionId);

    if (scoreGrade >= 8) {
      sound.playFanfare();
      if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      sound.playStreak();
    }

    this.navigate("results");
  }

  renderResultsView(container) {
    const summary = this.lastExamSummary || {
      total: 10,
      correctCount: 10,
      scoreGrade: 10,
      date: new Date().toLocaleDateString("es-ES")
    };

    let gradeWord = "Sobresaliente";
    let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
    let emoji = "🌟";

    if (summary.scoreGrade >= 9) {
      gradeWord = "¡Sobresaliente! 🌟";
      badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
      emoji = "🏆";
    } else if (summary.scoreGrade >= 7) {
      gradeWord = "¡Notable! 👏";
      badgeColor = "bg-blue-100 text-blue-800 border-blue-300";
      emoji = "⭐";
    } else if (summary.scoreGrade >= 5) {
      gradeWord = "¡Bien / Aprobado! 👍";
      badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
      emoji = "📚";
    } else {
      gradeWord = "¡Podemos Mejorar! 💪";
      badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
      emoji = "🌱";
    }

    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-8 animate-pop-in">
        <!-- Tarjeta de Calificación Principal -->
        <div class="card-playful p-8 md:p-10 text-center space-y-6 bg-gradient-to-b from-white to-slate-50">
          <div class="text-6xl">${emoji}</div>
          <div class="space-y-2">
            <span class="inline-block px-4 py-1.5 rounded-full text-sm font-black border uppercase tracking-wider ${badgeColor}">
              ${gradeWord}
            </span>
            <h1 class="text-3xl md:text-5xl font-black font-display text-slate-900">
              ¡Buen trabajo, ${this.studentName}!
            </h1>
            <p class="text-slate-600 font-medium max-w-md mx-auto">
              Has completado los ${summary.total} ejercicios de ciencias de la salud. ¡Mira tu nota oficial!
            </p>
          </div>

          <!-- Cuadro de Nota Numérica -->
          <div class="flex items-center justify-center gap-6 py-4">
            <div class="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 min-w-[160px]">
              <span class="text-xs font-black uppercase tracking-wider text-blue-600 block mb-1">Nota Oficial</span>
              <span class="text-5xl md:text-6xl font-black text-blue-700">${summary.scoreGrade}</span>
              <span class="text-slate-400 font-bold text-lg"> / 10</span>
            </div>
            <div class="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 min-w-[160px]">
              <span class="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">Aciertos</span>
              <span class="text-5xl md:text-6xl font-black text-emerald-700">${summary.correctCount}</span>
              <span class="text-slate-400 font-bold text-lg"> / ${summary.total}</span>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            ${this.lastMistakeIds && this.lastMistakeIds.length > 0 ? `
              <button class="btn-bouncy px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-2xl font-black text-base shadow flex items-center gap-2" onclick="app.startExam('${summary.examId}', true)">
                <span>🔁 Repasar solo los fallos (${this.lastMistakeIds.length})</span>
              </button>
            ` : ''}

            <button class="btn-bouncy px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-base shadow flex items-center gap-2" onclick="app.startExam('${summary.examId}')">
              <span>🔄 Repetir examen completo</span>
            </button>

            <button class="btn-bouncy px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-2xl font-black text-base shadow flex items-center gap-2" onclick="app.navigate('diploma')">
              <span>📜 Ver mi Diploma Oficial</span>
            </button>
          </div>
        </div>

        <!-- Desglose Pregunta a Pregunta -->
        <div class="space-y-4">
          <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>📋 Revisión detallada de cada ejercicio</span>
          </h2>
          <div class="space-y-3">
            ${this.examResults.map((r, i) => `
              <div class="bg-white p-5 rounded-2xl border-2 ${r.isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'} flex items-start gap-4">
                <span class="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${r.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
                  ${r.isCorrect ? '✓' : '✗'}
                </span>
                <div class="space-y-1.5 flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="font-bold text-slate-800 text-base">
                      Ejercicio ${i + 1}: ${r.title}
                    </h3>
                    <span class="text-xs font-black uppercase ${r.isCorrect ? 'text-emerald-700' : 'text-rose-700'}">
                      ${r.isCorrect ? 'Acertada' : 'Fallada'}
                    </span>
                  </div>
                  <p class="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    ${r.explanation}
                  </p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Botón para volver a casa -->
        <div class="text-center pt-4">
          <button class="btn-bouncy px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold" onclick="app.navigate('home')">
            🏠 Volver al Menú Principal
          </button>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // VISTA: DIPLOMA OFICIAL IMPRIMIBLE
  // ---------------------------------------------------------------------------
  renderDiplomaView(container) {
    const today = new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6 animate-pop-in">
        <!-- Barra de herramientas superior -->
        <div class="flex items-center justify-between no-print bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <button class="btn-bouncy px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-sm" onclick="app.navigate('home')">
            ⬅️ Volver
          </button>
          <div class="flex items-center gap-3">
            <button class="btn-bouncy px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-sm" onclick="const n = prompt('Cambiar nombre del diploma:', app.studentName); if(n){ app.setStudentName(n); app.navigate('diploma'); }">
              ✏️ Cambiar Nombre
            </button>
            <button class="btn-bouncy px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm shadow flex items-center gap-2" onclick="window.print()">
              <span>🖨️ Imprimir / Guardar en PDF</span>
            </button>
          </div>
        </div>

        <!-- Contenedor del Diploma Físico Oficial -->
        <div id="diploma-printable" class="bg-amber-50/50 p-8 md:p-12 rounded-3xl border-8 border-double border-amber-600 shadow-2xl relative overflow-hidden text-center space-y-6">
          <!-- Decoraciones de esquina clásicas -->
          <div class="absolute top-4 left-4 text-3xl select-none">🌿</div>
          <div class="absolute top-4 right-4 text-3xl select-none">🌿</div>
          <div class="absolute bottom-4 left-4 text-3xl select-none">🌿</div>
          <div class="absolute bottom-4 right-4 text-3xl select-none">🌿</div>

          <!-- Encabezado de la Institución -->
          <div class="space-y-2">
            <span class="text-xs font-black tracking-widest uppercase text-amber-800">
              CIENCIAS DE LA NATURALEZA · 4.º DE EDUCACIÓN PRIMARIA
            </span>
            <h1 class="text-3xl md:text-5xl font-black font-display text-slate-900 tracking-tight">
              DIPLOMA DE HONOR
            </h1>
            <p class="text-sm md:text-base font-serif italic text-amber-900">
              Se certifica formalmente que el alumno/a
            </p>
          </div>

          <!-- Nombre del Estudiante con gran caligrafía -->
          <div class="py-2">
            <div class="text-4xl md:text-6xl font-black text-blue-700 underline decoration-amber-400 decoration-wavy decoration-2 font-display">
              ${this.studentName}
            </div>
          </div>

          <!-- Mérito Académico -->
          <div class="max-w-xl mx-auto space-y-3">
            <p class="text-base md:text-lg text-slate-800 leading-relaxed font-medium">
              Ha superado con éxito las evaluaciones y casos prácticos de la unidad didáctica
              <strong>«Tema 1: La Salud»</strong>, demostrando un excelente dominio de los hábitos saludables,
              la clasificación de alimentos por origen y función, la prevención y la higiene postural.
            </p>
            <div class="inline-block px-4 py-1 bg-amber-200/80 text-amber-950 font-black rounded-full text-xs uppercase tracking-wider">
              Especialista Oficial en Salud y Bienestar
            </div>
          </div>

          <!-- Sellos y Firmas -->
          <div class="grid grid-cols-2 gap-8 pt-8 max-w-lg mx-auto items-end">
            <div class="space-y-2">
              <div class="text-4xl">🏵️</div>
              <div class="h-0.5 bg-slate-400 w-36 mx-auto"></div>
              <span class="text-xs font-bold text-slate-600 block">Fecha de expedición</span>
              <span class="text-xs font-semibold text-slate-800">${today}</span>
            </div>
            <div class="space-y-2">
              <div class="font-serif italic text-2xl text-blue-800">Olivia Team</div>
              <div class="h-0.5 bg-slate-400 w-36 mx-auto"></div>
              <span class="text-xs font-bold text-slate-600 block">Equipo Docente de Ciencias</span>
              <span class="text-xs font-semibold text-slate-800">Proyecto CLAVES · 4.º Primaria</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // VISTA: MINI-JUEGO DEL CLASIFICADOR ("El Supermercado Saludable")
  // ---------------------------------------------------------------------------
  renderSorterView(container) {
    const foods = EXAM_DATA.sorterFoods;
    const currentFood = foods[this.sorterIndex % foods.length];
    const total = foods.length;

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-pop-in">
        <!-- Encabezado Arcade -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-6 shadow-lg flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              🕹️ Mini-Juego Arcade
            </span>
            <h1 class="text-2xl md:text-3xl font-black">
              El Supermercado Saludable
            </h1>
            <p class="text-xs md:text-sm text-purple-200 font-medium">
              ¡Clasifica cada alimento rápidamente antes de que se agote la comida!
            </p>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-purple-200 block">Puntos</span>
            <span class="text-3xl font-black text-amber-300" id="sorter-score-val">${this.sorterScore}</span>
          </div>
        </div>

        <!-- Selector de Categoría a clasificar -->
        <div class="flex rounded-2xl bg-slate-100 p-1.5 font-bold text-xs md:text-sm gap-1">
          <button class="sorter-cat-btn flex-1 py-2.5 rounded-xl transition ${this.sorterActiveCategory === 'origin' ? 'bg-white shadow text-purple-700' : 'text-slate-600 hover:text-slate-900'}" onclick="app.setSorterCategory('origin')">
            🌱 Por Origen
          </button>
          <button class="sorter-cat-btn flex-1 py-2.5 rounded-xl transition ${this.sorterActiveCategory === 'func' ? 'bg-white shadow text-purple-700' : 'text-slate-600 hover:text-slate-900'}" onclick="app.setSorterCategory('func')">
            ⚡ Por Función
          </button>
          <button class="sorter-cat-btn flex-1 py-2.5 rounded-xl transition ${this.sorterActiveCategory === 'processing' ? 'bg-white shadow text-purple-700' : 'text-slate-600 hover:text-slate-900'}" onclick="app.setSorterCategory('processing')">
            🥗 Por Procesado
          </button>
        </div>

        <!-- Tarjeta Central del Alimento Actual -->
        <div class="card-playful p-8 text-center space-y-6 relative overflow-hidden" id="sorter-food-card">
          <div class="text-xs font-black uppercase tracking-wider text-slate-400">
            Alimento ${ (this.sorterIndex % total) + 1 } de ${total}
          </div>

          <div class="w-32 h-32 mx-auto rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-7xl shadow-inner animate-pop-in">
            ${currentFood.icon}
          </div>

          <div class="space-y-1">
            <h2 class="text-2xl md:text-3xl font-black text-slate-800">
              ${currentFood.name}
            </h2>
            <p class="text-xs md:text-sm text-slate-500 font-medium">
              ${this.getSorterCategoryPrompt()}
            </p>
          </div>

          <!-- Botones de Clasificación Dinámicos -->
          <div class="grid grid-cols-3 gap-3 pt-2" id="sorter-buttons-container">
            ${this.renderSorterOptionButtons()}
          </div>

          <!-- Mensaje de Feedback -->
          <div id="sorter-feedback-box" class="hidden p-4 rounded-2xl text-sm font-bold animate-pop-in"></div>
        </div>

        <!-- Racha y Estadísticas -->
        <div class="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
          <span>🔥 Racha actual: <strong class="text-amber-600" id="sorter-streak-val">${this.sorterStreak}</strong></span>
          <button class="text-purple-600 hover:underline" onclick="app.resetSorter()">Reiniciar juego</button>
        </div>
      </div>
    `;
  }

  getSorterCategoryPrompt() {
    if (this.sorterActiveCategory === "origin") return "¿De qué origen procede este alimento?";
    if (this.sorterActiveCategory === "func") return "¿Cuál es su función predominante en el cuerpo?";
    if (this.sorterActiveCategory === "processing") return "¿Qué grado de transformación tiene?";
    return "";
  }

  renderSorterOptionButtons() {
    if (this.sorterActiveCategory === "origin") {
      return `
        <button class="btn-bouncy py-4 px-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('animal')">
          <span class="text-xl">🐟</span>
          <span>Animal</span>
        </button>
        <button class="btn-bouncy py-4 px-2 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('vegetal')">
          <span class="text-xl">🌱</span>
          <span>Vegetal</span>
        </button>
        <button class="btn-bouncy py-4 px-2 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('mineral')">
          <span class="text-xl">💧</span>
          <span>Mineral</span>
        </button>
      `;
    }

    if (this.sorterActiveCategory === "func") {
      return `
        <button class="btn-bouncy py-4 px-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('energetico')">
          <span class="text-xl">⚡</span>
          <span>Energético</span>
        </button>
        <button class="btn-bouncy py-4 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('constructor')">
          <span class="text-xl">🧱</span>
          <span>Constructor</span>
        </button>
        <button class="btn-bouncy py-4 px-2 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('regulador')">
          <span class="text-xl">🛡️</span>
          <span>Regulador</span>
        </button>
      `;
    }

    if (this.sorterActiveCategory === "processing") {
      return `
        <button class="btn-bouncy py-4 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('natural')">
          <span class="text-xl">🍏</span>
          <span>Natural</span>
        </button>
        <button class="btn-bouncy py-4 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('procesado')">
          <span class="text-xl">🥖</span>
          <span>Procesado</span>
        </button>
        <button class="btn-bouncy py-4 px-2 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm flex flex-col items-center gap-1 shadow" onclick="app.answerSorter('ultraprocesado')">
          <span class="text-xl">🥤</span>
          <span>Ultraprocesado</span>
        </button>
      `;
    }

    return "";
  }

  setSorterCategory(cat) {
    sound.playClick();
    this.sorterActiveCategory = cat;
    this.renderSorterView(document.getElementById("app-main-content"));
  }

  answerSorter(choice) {
    const foods = EXAM_DATA.sorterFoods;
    const currentFood = foods[this.sorterIndex % foods.length];
    let correctValue = "";

    if (this.sorterActiveCategory === "origin") correctValue = currentFood.origin;
    if (this.sorterActiveCategory === "func") correctValue = currentFood.func;
    if (this.sorterActiveCategory === "processing") correctValue = currentFood.processing;

    const isMatch = choice === correctValue;
    const fb = document.getElementById("sorter-feedback-box");

    if (isMatch) {
      sound.playCorrect();
      this.sorterScore += 10;
      this.sorterStreak++;
      this.addStars(1);
      if (fb) {
        fb.classList.remove("hidden", "bg-rose-100", "text-rose-800");
        fb.classList.add("bg-emerald-100", "text-emerald-800");
        fb.innerHTML = `¡Correcto! 🎉 ${currentFood.detail}`;
      }
    } else {
      sound.playIncorrect();
      this.sorterStreak = 0;
      if (fb) {
        fb.classList.remove("hidden", "bg-emerald-100", "text-emerald-800");
        fb.classList.add("bg-rose-100", "text-rose-800");
        fb.innerHTML = `¡Ups! No era esa. 💡 ${currentFood.detail}`;
      }
    }

    // Actualiza indicadores
    const scoreVal = document.getElementById("sorter-score-val");
    if (scoreVal) scoreVal.textContent = this.sorterScore;
    const streakVal = document.getElementById("sorter-streak-val");
    if (streakVal) streakVal.textContent = this.sorterStreak;

    // Deshabilita botones temporalmente y pasa al siguiente
    setTimeout(() => {
      this.sorterIndex++;
      this.renderSorterView(document.getElementById("app-main-content"));
    }, 1300);
  }

  resetSorter() {
    sound.playClick();
    this.sorterIndex = 0;
    this.sorterScore = 0;
    this.sorterStreak = 0;
    this.renderSorterView(document.getElementById("app-main-content"));
  }

  // ---------------------------------------------------------------------------
  // VISTA: GUÍA DE ESTUDIO VISUAL Y RESUMEN DEL TEMA
  // ---------------------------------------------------------------------------
  renderStudyGuide(container) {
    const guides = EXAM_DATA.studyGuide;

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-8 animate-pop-in">
        <!-- Encabezado de la Guía -->
        <div class="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
          <div class="space-y-2 max-w-xl">
            <span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
              📖 Resumen Oficial del Libro CLAVES
            </span>
            <h1 class="text-3xl md:text-4xl font-black font-display">
              Todo lo que necesitas saber del Tema 1
            </h1>
            <p class="text-rose-100 text-sm md:text-base font-medium">
              Repasa estos 8 bloques visuales antes de hacer el examen. Contiene todas las definiciones, clasificaciones y normas de salud.
            </p>
          </div>
          <button class="hidden md:flex btn-bouncy px-5 py-3 bg-white text-rose-700 hover:bg-rose-50 rounded-2xl font-black text-sm shadow items-center gap-2" onclick="window.print()">
            <span>🖨️ Imprimir Guía</span>
          </button>
        </div>

        <!-- Secciones de Estudio -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${guides.map((g, i) => `
            <div class="card-playful p-6 space-y-4 border-l-8 border-l-blue-500 hover:shadow-xl transition">
              <div class="flex items-center gap-3">
                <span class="text-3xl">${g.icon}</span>
                <h2 class="text-lg font-black text-slate-800 leading-snug">
                  ${g.title}
                </h2>
              </div>
              <p class="text-xs font-bold text-slate-500">
                ${g.summary}
              </p>
              <div class="space-y-2.5 text-xs md:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                ${g.points.map(pt => `
                  <div class="flex items-start gap-2">
                    <span class="text-blue-500 font-bold shrink-0">•</span>
                    <div>${pt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Botón de práctica directa -->
        <div class="text-center pt-4">
          <button class="btn-bouncy px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-base shadow-lg" onclick="app.startExam('part1')">
            🚀 ¡Ya me lo sé todo! Hacer el Examen Ahora
          </button>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // EVENTOS GLOBALES
  // ---------------------------------------------------------------------------
  bindGlobalEvents() {
    // Sonido toggle
    const soundBtn = document.getElementById("toggle-sound-btn");
    if (soundBtn) {
      soundBtn.onclick = () => {
        const enabled = sound.toggleSound();
        soundBtn.textContent = enabled ? "🔊" : "🔇";
        soundBtn.title = enabled ? "Sonido activado" : "Sonido desactivado";
      };
    }

    // Botones de pestañas de navegación
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        const target = btn.getAttribute("data-target");
        if (target === "part1") {
          this.startExam("part1");
        } else if (target === "part2") {
          this.startExam("part2");
        } else {
          this.navigate(target);
        }
      };
    });
  }
}

// Inicialización automática
let app = null;
window.addEventListener("DOMContentLoaded", () => {
  app = new ScienceApp();
});
