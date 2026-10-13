// =============================================================================
// BANCO DE DATOS · SCIENCE / CONOCIMIENTO DEL MEDIO · 4º PRIMARIA · TEMA 1
// Editorial Santillana · Proyecto CLAVES World Makers · "La Salud"
// =============================================================================

const EXAM_DATA = {
  // ---------------------------------------------------------------------------
  // PARTE 1: CONCEPTOS Y FUNDAMENTOS (Inspirada en Prueba B oficial)
  // ---------------------------------------------------------------------------
  part1: {
    id: "part1",
    title: "Parte 1: Conceptos Clave",
    subtitle: "Entrenamiento de fundamentos (Basado en la Prueba B)",
    description: "10 ejercicios interactivos para dominar las definiciones, grupos de alimentos, medidas de prevención y hábitos saludables.",
    badge: "Prueba B",
    questions: [
      {
        id: "p1_q1",
        number: 1,
        title: "Completa la definición de Salud",
        instruction: "Según la Organización Mundial de la Salud y tu libro de Ciencias, ¿cuándo decimos que una persona está verdaderamente sana?",
        type: "single_choice",
        options: [
          { id: "a", text: "Cuando tenemos una buena salud física, mental y social.", correct: true },
          { id: "b", text: "Únicamente cuando no tenemos fiebre ni dolor de garganta.", correct: false },
          { id: "c", text: "Cuando hacemos deporte tres veces al día sin descansar.", correct: false },
          { id: "d", text: "Solo cuando comemos verduras en todas las comidas.", correct: false }
        ],
        explanation: "¡Exacto! Estar sano no es solo no estar enfermo. La salud incluye el bienestar del cuerpo (física), de nuestras emociones (mental) y de nuestras relaciones con los demás (social)."
      },
      {
        id: "p1_q2",
        number: 2,
        title: "¿Qué significa tener buena salud física y social?",
        instruction: "Relaciona cada dimensión de la salud con su significado correcto:",
        type: "matching",
        pairs: [
          { left: "Salud física", right: "Nuestro cuerpo y órganos funcionan bien en las actividades diarias." },
          { left: "Salud mental", right: "Reconocemos y gestionamos nuestras emociones y nos sentimos bien con nosotros mismos." },
          { left: "Salud social", right: "Nos relacionamos de forma respetuosa y positiva con los demás." }
        ],
        explanation: "¡Muy bien! Los tres aspectos se complementan. Por ejemplo, jugar al baloncesto con amigos cuida tu salud física (haces ejercicio), mental (te diviertes) y social (convives en equipo)."
      },
      {
        id: "p1_q3",
        number: 3,
        title: "Medidas de prevención",
        instruction: "La prevención consiste en actuar antes para reducir el riesgo de enfermar o lesionarse. ¿Cuáles son las tres medidas de prevención fundamentales que enseña el tema?",
        type: "multiple_choice",
        options: [
          { id: "a", text: "Mantener hábitos saludables cotidianos (higiene, alimentación, descanso).", correct: true },
          { id: "b", text: "Acudir a las revisiones médicas y odontológicas periódicas.", correct: true },
          { id: "c", text: "Ponerse las vacunas recomendadas en el calendario infantil.", correct: true },
          { id: "d", text: "Tomar antibióticos sin que el médico los haya recetado.", correct: false },
          { id: "e", text: "No salir nunca a la calle para no entrar en contacto con el aire.", correct: false }
        ],
        requiredCorrectCount: 3,
        explanation: "¡Perfecto! Las tres medidas clave son: 1) Mantener hábitos saludables a diario, 2) Acudir a las revisiones del pediatra, y 3) Vacunarse según el calendario médico de la infancia."
      },
      {
        id: "p1_q4",
        number: 4,
        title: "¿Qué nos aportan los alimentos?",
        instruction: "Completa la frase seleccionando las palabras que faltan en el orden correcto:",
        promptText: "Los alimentos nos proporcionan [HUECO_1] para crecer y reparar los tejidos, y [HUECO_2] para realizar nuestras actividades diarias.",
        type: "fill_blanks",
        slots: ["HUECO_1", "HUECO_2"],
        correctAnswers: ["materiales", "energía"],
        wordBank: ["materiales", "energía", "vacunas", "gérmenes", "descanso", "medicinas"],
        explanation: "¡Excelente! Los alimentos aportan materiales de construcción (para crecer de estatura y reparar heridas o músculos) y energía (para correr, jugar, estudiar y que lata el corazón)."
      },
      {
        id: "p1_q5",
        number: 5,
        title: "El origen de los alimentos: ¿De dónde proceden?",
        instruction: "¿En qué tres grupos se clasifican los alimentos según su procedencia, y en cuál de ellos se incluyen el agua y la sal?",
        type: "single_choice",
        options: [
          { id: "a", text: "De origen animal, vegetal y mineral. El agua y la sal se incluyen en el origen mineral.", correct: true },
          { id: "b", text: "De origen dulce, salado y ácido. El agua y la sal se incluyen en el origen salado.", correct: false },
          { id: "c", text: "De origen caliente, frío y templado. El agua y la sal se incluyen en el origen frío.", correct: false },
          { id: "d", text: "De origen vegetal y animal únicamente. El agua no es un alimento.", correct: false }
        ],
        explanation: "¡Correcto! Los tres orígenes son: Animal (leche, carne, pescado, huevo), Vegetal (frutas, legumbres, arroz, trigo) y Mineral (agua y sal)."
      },
      {
        id: "p1_q6",
        number: 6,
        title: "Clasificación de los alimentos según su FUNCIÓN",
        instruction: "¿Cómo se llama cada grupo de alimentos según el trabajo principal que realiza en nuestro cuerpo?",
        type: "matching",
        pairs: [
          { left: "Alimentos energéticos", right: "Aportan energía para realizar actividades físicas y pensar (pan, arroz, aceite)." },
          { left: "Alimentos constructores", right: "Aportan materiales para crecer y reparar tejidos (pescado, huevos, legumbres)." },
          { left: "Alimentos reguladores", right: "Aportan sustancias (vitaminas y minerales) para que todo funcione bien (frutas y verduras)." }
        ],
        explanation: "¡Brillante! Esta clasificación responde a la pregunta «¿Para qué sirve principalmente este alimento en el organismo?»."
      },
      {
        id: "p1_q7",
        number: 7,
        title: "Alimentos ultraprocesados",
        instruction: "¿Qué son los alimentos ultraprocesados y cómo debemos consumirlos en nuestra vida diaria?",
        type: "single_choice",
        options: [
          { id: "a", text: "Son productos elaborados industrialmente con muchos ingredientes y aditivos (refrescos, bollería); conviene limitar su consumo.", correct: true },
          { id: "b", text: "Son frutas y verduras que crecen muy rápido en el campo; debemos comerlos 5 veces al día.", correct: false },
          { id: "c", text: "Son alimentos tradicionales cocinados en casa a fuego lento con ingredientes frescos.", correct: false },
          { id: "d", text: "Son alimentos que tienen minerales como el agua y la sal y se deben tomar en litros.", correct: false }
        ],
        explanation: "¡Muy bien! Los ultraprocesados (como refrescos, patatas de bolsa y bollería) han sido muy transformados en fábricas con aditivos, grasas y azúcares. No son alimentos naturales y hay que consumirlos de manera muy puntual."
      },
      {
        id: "p1_q8",
        number: 8,
        title: "Identificación de alimentos en fotografías",
        instruction: "Observa estos dos alimentos habituales: un trozo de PAN tradicional y un VASO DE YOGUR natural. ¿Cómo se clasifican según su transformación?",
        type: "single_choice",
        hasImages: true,
        imageNotes: "A: Pan tradicional | B: Yogur natural",
        options: [
          { id: "a", text: "El pan es un alimento procesado (elaborado a partir de harina de trigo, agua y levadura) y el yogur es procesado/natural derivado de la leche.", correct: true },
          { id: "b", text: "El pan es un alimento mineral que se saca de las minas y el yogur es una verdura.", correct: false },
          { id: "c", text: "Ambos son ultraprocesados perjudiciales que no se deben comer jamás.", correct: false },
          { id: "d", text: "El pan es de origen animal y el yogur es de origen vegetal.", correct: false }
        ],
        explanation: "¡Exacto! El pan se elabora transformando cereales (procesado) y aporta energía. El yogur procede de la leche (origen animal) y aporta materiales constructores (proteínas y calcio)."
      },
      {
        id: "p1_q9",
        number: 9,
        title: "¿Qué entendemos por Dieta?",
        instruction: "¿Cuál es la definición científica correcta de la palabra «dieta»?",
        type: "single_choice",
        options: [
          { id: "a", text: "La dieta es la cantidad y el conjunto de alimentos y bebidas que una persona consume habitualmente cada día.", correct: true },
          { id: "b", text: "La dieta significa pasar hambre y comer solo lechuga durante un mes.", correct: false },
          { id: "c", text: "La dieta es una medicina amarga que nos manda el doctor cuando tenemos gripe.", correct: false },
          { id: "d", text: "La dieta es únicamente la comida que tomamos en Navidad y cumpleaños.", correct: false }
        ],
        explanation: "¡Así es! Todos tenemos una dieta, porque la dieta es simplemente lo que comemos y bebemos habitualmente. Para que sea una DIETA SALUDABLE, debe ser variada, equilibrada y rica en alimentos naturales y agua."
      },
      {
        id: "p1_q10",
        number: 10,
        title: "Ejercicio físico: Antes y Después",
        instruction: "¿Qué dos prácticas de seguridad y salud debemos realizar obligatoriamente antes de empezar una actividad física intensa y al terminarla?",
        type: "single_choice",
        options: [
          { id: "a", text: "Antes: ejercicios de calentamiento. Al terminar: ejercicios de estiramiento y vuelta a la calma.", correct: true },
          { id: "b", text: "Antes: dormir una siesta en el campo. Al terminar: comer una hamburguesa gigante.", correct: false },
          { id: "c", text: "Antes: hacer un sprint de 50 metros sin avisar. Al terminar: tumbarse en el suelo mojado.", correct: false },
          { id: "d", text: "Antes: beber un refresco con mucho gas. Al terminar: ponerse abrigo de lana.", correct: false }
        ],
        explanation: "¡Genial! El calentamiento prepara el corazón, los pulmones y los músculos para no sufrir tirones ni lesiones. Al terminar, los estiramientos y la relajación ayudan a que los músculos recuperen su flexibilidad."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // PARTE 2: MISIÓN Y CASO PRÁCTICO (Inspirada en Prueba A oficial)
  // ---------------------------------------------------------------------------
  part2: {
    id: "part2",
    title: "Parte 2: Misión en la Naturaleza",
    subtitle: "Caso práctico aplicado (Basado en la Prueba A)",
    description: "Acompaña a Olivia, Ana y sus amigos en su jornada ciclista y pícnic en el campo resolviendo 10 casos reales de salud, postura y nutrición.",
    badge: "Prueba A",
    story: {
      headline: "📖 Caso Práctico: «La Gran Ruta en Bici y el Pícnic Saludable»",
      text: "En el colegio de Olivia y Ana se ha organizado una divertida ruta en bicicleta de montaña para el próximo sábado con sus compañeros de clase. Ana hace tiempo que no practica con la bici, pero tiene muchísima ilusión por pasar el día conviviendo y pedaleando con sus amigas.\n\nPara reponer fuerzas a mitad de camino en una pradera junto al río, Ana ha preparado su fiambrera con:\n• Sándwiches de pan de cereales con salmón ahumado.\n• Manzanas frescas crujientes.\n• Cantimploras con abundante agua fresca.\n\nDurante los preparativos surgen varias dudas sobre cómo equiparse, qué llevar en la mochila y cómo cuidar la postura."
    },
    questions: [
      {
        id: "p2_q1",
        number: 1,
        title: "Salud social y hábitos de Ana",
        instruction: "Teniendo en cuenta el texto de la historia, ¿podrías decir que Ana demuestra tener buena salud social?",
        type: "single_choice",
        options: [
          { id: "a", text: "Sí, porque muestra interés y alegría por quedar, colaborar y compartir actividades positivas con sus amigas.", correct: true },
          { id: "b", text: "No, porque la salud social solo se tiene si te quedas sola en tu habitación jugando con la consola.", correct: false },
          { id: "c", text: "Solo si gana la carrera de bicicletas a todas sus compañeras.", correct: false },
          { id: "d", text: "No, porque no ha invitado a todo el colegio entero a la ruta.", correct: false }
        ],
        explanation: "¡Correcto! La salud social consiste en cultivar relaciones positivas, sentirse integrada en el grupo y convivir con alegría y respeto con los demás."
      },
      {
        id: "p2_q2",
        number: 2,
        title: "Origen de los alimentos del pícnic",
        instruction: "Clasifica los alimentos que ha preparado Ana en su fiambrera según su ORIGEN:",
        type: "matching",
        pairs: [
          { left: "Salmón ahumado", right: "Origen animal (pescado de río/mar)." },
          { left: "Pan de cereales y manzanas", right: "Origen vegetal (plantas y cultivos)." },
          { left: "Agua de las botellas", right: "Origen mineral (sustancia mineral natural)." }
        ],
        explanation: "¡Perfecto! Un análisis impecable: el pescado proviene de animales, el pan y la fruta provienen de plantas, y el agua es un elemento mineral esencial."
      },
      {
        id: "p2_q3",
        number: 3,
        title: "Función de los alimentos del pícnic",
        instruction: "¿Qué función principal cumple cada uno de los alimentos que Ana eligió para su comida campestre?",
        type: "matching",
        pairs: [
          { left: "El pan del sándwich", right: "Alimento energético (hidratos de carbono para dar fuerza a los pedales)." },
          { left: "El salmón ahumado", right: "Alimento constructor (proteínas para reparar y fortalecer los músculos)." },
          { left: "Las manzanas frescas", right: "Alimento regulador (vitaminas y fibra para el buen funcionamiento)." }
        ],
        explanation: "¡Magnífico! Ana ha preparado un almuerzo completísimo que reúne las tres funciones: energía (pan), construcción (salmón) y regulación (manzanas)."
      },
      {
        id: "p2_q4",
        number: 4,
        title: "El salmón ahumado: ¿Natural o procesado?",
        instruction: "¿Cómo clasificarías el salmón ahumado según el grado de transformación de los alimentos y por qué?",
        type: "single_choice",
        options: [
          { id: "a", text: "Es un alimento procesado, porque se le ha aplicado una técnica de conservación (ahumado y salado) que facilita su almacenamiento sin dejar de ser nutritivo.", correct: true },
          { id: "b", text: "Es un ultraprocesado perjudicial lleno de tintes artificiales que hay que tirar a la papelera.", correct: false },
          { id: "c", text: "Es un alimento 100% natural sin manipular, exactamente igual que un pez nadando en el río.", correct: false },
          { id: "d", text: "Es un alimento de origen mineral como la sal.", correct: false }
        ],
        explanation: "¡Exacto! El salmón fresco es un alimento natural; al someterse a ahumado se convierte en procesado para conservarse mejor. Pero recuerda: ¡procesado no significa malo!"
      },
      {
        id: "p2_q5",
        number: 5,
        title: "¿Por qué la comida de Ana es saludable?",
        instruction: "Según lo que has estudiado sobre la dieta saludable, ¿por qué la comida de Ana puede considerarse un excelente ejemplo de alimentación sana?",
        type: "single_choice",
        options: [
          { id: "a", text: "Porque combina alimentos de los tres grupos (energéticos, constructores y reguladores), prioriza ingredientes frescos y agua, y prescinde de ultraprocesados.", correct: true },
          { id: "b", text: "Porque Ana no va a comer nada en todo el día para adelgazar.", correct: false },
          { id: "c", text: "Porque solo lleva dulces de repostería que dan mucha azúcar.", correct: false },
          { id: "d", text: "Porque las manzanas son rojas y es el color de la salud.", correct: false }
        ],
        explanation: "¡Muy bien! Una comida saludable destaca por la variedad, el equilibrio y la presencia de nutrientes protectores, huyendo de excesos de azúcares y grasas industriales."
      },
      {
        id: "p2_q6",
        number: 6,
        title: "El consejo para la amiga de los refrescos",
        instruction: "Una de las amigas de Ana va a llevar dos latas de refrescos con gas y azúcar para beber durante la ruta en bicicleta. ¿Qué consejo saludable le darías según tu libro?",
        type: "single_choice",
        options: [
          { id: "a", text: "Aconsejarle que beba agua mineral (entre 1,5 y 2 litros) como bebida principal, y que no sustituya el agua por refrescos azucarados ultraprocesados.", correct: true },
          { id: "b", text: "Decirle que beba cuatro latas de refresco más rápido para tener más burbujas en el estómago.", correct: false },
          { id: "c", text: "Decirle que no beba nada de líquido durante toda la excursión ciclista.", correct: false },
          { id: "d", text: "Animarla a cambiar el agua por café o bebidas energéticas para mayores.", correct: false }
        ],
        explanation: "¡Fenomenal! Durante el ejercicio físico el cuerpo pierde agua mediante el sudor. El agua es la mejor bebida para hidratarse. Los refrescos llevan demasiado azúcar y no sacian la sed real del organismo."
      },
      {
        id: "p2_q7",
        number: 7,
        title: "Beneficios de la actividad física",
        instruction: "¿Cuáles de los siguientes son beneficios demostrados de practicar ejercicio físico con regularidad?",
        type: "multiple_choice",
        options: [
          { id: "a", text: "Fortalece los huesos y los músculos.", correct: true },
          { id: "b", text: "Mejora el funcionamiento del corazón y los pulmones.", correct: true },
          { id: "c", text: "Ayuda a descansar mejor por las noches y mejora el estado de ánimo.", correct: true },
          { id: "d", text: "Provoca que los huesos se vuelvan frágiles como el cristal.", correct: false },
          { id: "e", text: "Hace que el corazón se detenga por completo al descansar.", correct: false }
        ],
        requiredCorrectCount: 3,
        explanation: "¡Exacto! El ejercicio físico regular mejora la fuerza muscular, cuida el sistema cardiovascular, aumenta la capacidad pulmonar y libera endorfinas que nos hacen sentir contentos y dormir genial."
      },
      {
        id: "p2_q8",
        number: 8,
        title: "Consejos para la bicicleta: Antes, Durante y Después",
        instruction: "Ana dice que hace mucho que no monta en bicicleta. Para evitar riesgos y accidentes, relaciona el consejo con el momento correspondiente:",
        type: "matching",
        pairs: [
          { left: "Antes de empezar la ruta", right: "Revisar frenos y ruedas, ponerse el casco ajustado y hacer ejercicios de calentamiento." },
          { left: "Durante la ruta en bici", right: "Respetar las normas, mantener la distancia, beber agua y avisar si aparece fatiga." },
          { left: "Al terminar la excursión", right: "Bajar el ritmo de pedaleo progresivamente, realizar estiramientos e hidratarse." }
        ],
        explanation: "¡Completamente acertado! La seguridad y prevención salvan de accidentes: el casco y la revisión previa son indispensables, la hidratación durante la marcha y los estiramientos al final."
      },
      {
        id: "p2_q9",
        number: 9,
        title: "¿Qué bolsa o mochila elegirías para llevar la comida?",
        instruction: "Observa las dos opciones: (A) Mochila ergonómica de espalda con dos tirantes ajustables. (B) Bolsa de tela con asa simple para llevar colgada de un hombro o en la mano. ¿Cuál elegirías y por qué?",
        type: "single_choice",
        hasImages: true,
        imageNotes: "A: Mochila con dos tirantes acolchados | B: Bolsa de tela de un solo asa",
        options: [
          { id: "a", text: "Elegiría la opción A (mochila con dos tirantes), porque se apoya en ambos hombros y permite repartir el peso de manera equilibrada pegada a la espalda.", correct: true },
          { id: "b", text: "Elegiría la opción B (bolsa de un asa), porque sobrecargar un solo hombro hace que crezcas torcido y más rápido.", correct: false },
          { id: "c", text: "Cualquiera de las dos, porque el peso nunca influye en la columna vertebral ni produce dolor de espalda.", correct: false },
          { id: "d", text: "Llevaría la comida en una mano en el manillar mientras pedaleo con la otra.", correct: false }
        ],
        explanation: "¡Respuesta de diez! La mochila con dos tirantes acolchados bien ajustados reparte la carga de forma simétrica sobre la espalda, evitando sobrecargas en un lado y posibles desviaciones de columna."
      },
      {
        id: "p2_q10",
        number: 10,
        title: "La postura indicada para dormir",
        instruction: "Al llegar a casa agotados después de la excursión, ¿qué postura recomiendan los médicos y tu libro de Ciencias como la más indicada para dormir y cuidar la columna?",
        type: "single_choice",
        options: [
          { id: "a", text: "Dormir de lado o bocarriba, con una almohada adecuada que apoye el cuello y las rodillas ligeramente flexionadas.", correct: true },
          { id: "b", text: "Dormir boca abajo con tres almohadas gigantes que doblen el cuello hacia atrás.", correct: false },
          { id: "c", text: "Dormir sentado en una silla dura con la cabeza colgando hacia delante.", correct: false },
          { id: "d", text: "Dormir en el suelo sin almohada enrollado como una bola apretada.", correct: false }
        ],
        explanation: "¡Enhorabuena! Dormir de lado (con una ligera flexión de piernas) o bocarriba mantiene alineadas la columna vertebral y el cuello, permitiendo que los músculos y discos vertebrales descansen aliviados."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // PARTE 3: DESAFÍO EXPRESS (Banco adicional para entrenar infinitas veces)
  // ---------------------------------------------------------------------------
  expressPool: [
    {
      id: "exp_1",
      title: "¿Qué grupo nutricional predomina en las legumbres?",
      instruction: "Las lentejas, los garbanzos y las alubias son fundamentales en la dieta. ¿Qué tipo de alimentos son según su función principal?",
      type: "single_choice",
      options: [
        { id: "a", text: "Constructores, porque aportan proteínas vegetales para crecer y formar tejidos.", correct: true },
        { id: "b", text: "Exclusivamente minerales como el agua de manantial.", correct: false },
        { id: "c", text: "Ultraprocesados que no debemos comer.", correct: false },
        { id: "d", text: "Alimentos de origen animal.", correct: false }
      ],
      explanation: "Las legumbres son ricas en proteínas vegetales y hierro, por lo que pertenecen al grupo de constructores."
    },
    {
      id: "exp_2",
      title: "Higiene postural al recoger una caja del suelo",
      instruction: "Si tienes que levantar una mochila o una caja pesada del suelo, ¿cuál es el movimiento correcto para no lastimarte?",
      type: "single_choice",
      options: [
        { id: "a", text: "Flexionar las rodillas, mantener la espalda recta y levantar el peso cerca del cuerpo.", correct: true },
        { id: "b", text: "Mantener las piernas tiesas y doblar la cintura haciendo fuerza con el cuello.", correct: false },
        { id: "c", text: "Dar un tirón brusco girando el tronco al mismo tiempo.", correct: false },
        { id: "d", text: "Patear la caja con fuerza hasta la habitación.", correct: false }
      ],
      explanation: "¡Siempre flexionar las rodillas! Las piernas tienen los músculos más potentes de tu cuerpo; doblar la cintura sin flexionar rodillas daña las lumbares."
    },
    {
      id: "exp_3",
      title: "¿El aceite de oliva qué función predominante tiene?",
      instruction: "El aceite de oliva virgen extra es una joya de la dieta mediterránea. ¿Cuál es su función predominante y su origen?",
      type: "single_choice",
      options: [
        { id: "a", text: "Función energética y origen vegetal (procede de la aceituna).", correct: true },
        { id: "b", text: "Función constructora y origen animal.", correct: false },
        { id: "c", text: "Función mineral y origen sintético.", correct: false },
        { id: "d", text: "Función reguladora y origen lácteo.", correct: false }
      ],
      explanation: "El aceite de oliva se extrae de la aceituna (vegetal) y aporta lípidos saludables, que son una fuente concentrada de energía."
    },
    {
      id: "exp_4",
      title: "¿Cuántas raciones de fruta y verdura se recomiendan al día?",
      instruction: "En una dieta saludable equilibrada para niños y niñas de primaria, ¿cuál es la recomendación diaria de frutas y verduras?",
      type: "single_choice",
      options: [
        { id: "a", text: "Al menos 5 raciones al día entre frutas y verduras frescas.", correct: true },
        { id: "b", text: "Una sola uva al mes.", correct: false },
        { id: "c", text: "Solamente en los días de fiesta.", correct: false },
        { id: "d", text: "Cero, porque los caramelos las sustituyen.", correct: false }
      ],
      explanation: "La famosa regla de '5 al día': tomar al menos 5 piezas o raciones de fruta y verdura cada día aporta todas las vitaminas, minerales y fibra que tu cuerpo necesita."
    },
    {
      id: "exp_5",
      title: "¿Por qué el agua es imprescindible en el cuerpo humano?",
      instruction: "El agua es un componente vital de nuestro organismo. ¿Por qué debemos beber entre 1,5 y 2 litros al día?",
      type: "single_choice",
      options: [
        { id: "a", text: "Porque transporta nutrientes, regula la temperatura corporal y ayuda a eliminar desechos.", correct: true },
        { id: "b", text: "Para evitar que los huesos se conviertan en arena.", correct: false },
        { id: "c", text: "Porque es un alimento ultraprocesado muy sabroso.", correct: false },
        { id: "d", text: "Solo sirve para que podamos nadar en verano.", correct: false }
      ],
      explanation: "Más del 60% de nuestro cuerpo es agua. Sin agua nuestras células no pueden respirar ni funcionar correctamente."
    },
    {
      id: "exp_6",
      title: "Postura correcta al estudiar y sentarse en clase",
      instruction: "Cuando estás sentada en tu pupitre escribiendo o escuchando en clase, ¿cómo debe colocarse tu cuerpo?",
      type: "single_choice",
      options: [
        { id: "a", text: "Espalda apoyada en el respaldo de la silla, hombros relajados y ambos pies apoyados en el suelo.", correct: true },
        { id: "b", text: "Sentarse sobre una pierna doblada con la cabeza apoyada en la mesa.", correct: false },
        { id: "c", text: "Deslizarse hacia abajo hasta casi resbalar al suelo.", correct: false },
        { id: "d", text: "Balancearse sobre las dos patas traseras de la silla.", correct: false }
      ],
      explanation: "Apoyar la espalda en el respaldo y los pies planos en el suelo reparte el esfuerzo de la columna y evita sobrecargas en las lumbares y cuello."
    },
    {
      id: "exp_7",
      title: "Salud mental: ¿Qué hacer cuando sentimos tristeza o rabia?",
      instruction: "Dentro del bienestar emocional y la salud mental, ¿cuál es la actitud más sana ante una emoción difícil?",
      type: "single_choice",
      options: [
        { id: "a", text: "Reconocer lo que sentimos, hablarlo con alguien de confianza (familia o profes) y buscar la calma.", correct: true },
        { id: "b", text: "Guardar el enfado dentro durante meses sin decírselo a nadie.", correct: false },
        { id: "c", text: "Gritar a los amigos y romper los cuadernos de clase.", correct: false },
        { id: "d", text: "Fingir que no pasa nada y no pedir ayuda nunca.", correct: false }
      ],
      explanation: "La salud mental consiste en comprender nuestras emociones: todas las emociones son normales, y expresarlas con respeto y buscar ayuda es señal de madurez."
    },
    {
      id: "exp_8",
      title: "Hábito saludable vs Medida de prevención",
      instruction: "¿Cuál de estas opciones describe la diferencia exacta entre ambos conceptos?",
      type: "single_choice",
      options: [
        { id: "a", text: "Un hábito saludable es una conducta que repetimos a diario (como lavarse los dientes); una medida de prevención busca evitar un daño o enfermedad concreta (como vacunarse).", correct: true },
        { id: "b", text: "Son exactamente lo contrario: los hábitos son peligrosos y la prevención no sirve para nada.", correct: false },
        { id: "c", text: "La prevención solo existe en los hospitales para ancianos.", correct: false },
        { id: "d", text: "Los hábitos saludables son comer golosinas después de cenar.", correct: false }
      ],
      explanation: "Muchos hábitos saludables son a la vez medidas preventivas (como lavarse las manos para no contagiar virus)."
    },
    {
      id: "exp_9",
      title: "Alimentos constructores: los huevos",
      instruction: "Un huevo cocido es un alimento clásico. ¿Cómo lo clasificarías según su origen y su función?",
      type: "single_choice",
      options: [
        { id: "a", text: "Origen Animal + Función Constructora (aporta proteínas para los tejidos).", correct: true },
        { id: "b", text: "Origen Vegetal + Función Energética.", correct: false },
        { id: "c", text: "Origen Mineral + Función Reguladora.", correct: false },
        { id: "d", text: "Origen Químico + Alimento Ultraprocesado.", correct: false }
      ],
      explanation: "Procede de las aves (animal) y su clara y yema tienen proteínas de altísima calidad para construir células nuevas."
    },
    {
      id: "exp_10",
      title: "Las vacunas infantiles",
      instruction: "¿Por qué las vacunas que nos ponen en el centro de salud son tan importantes para la salud pública?",
      type: "single_choice",
      options: [
        { id: "a", text: "Porque entrenan a nuestras defensas (sistema inmunitario) para protegernos contra enfermedades graves antes de que nos ataquen.", correct: true },
        { id: "b", text: "Porque sirven para que los niños crezcan 10 centímetros en un día.", correct: false },
        { id: "c", text: "Porque cambian el color de los ojos.", correct: false },
        { id: "d", text: "Porque sustituyen a la necesidad de comer fruta.", correct: false }
      ],
      explanation: "Las vacunas enseñan al cuerpo a fabricar defensas (anticuerpos) contra microorganismos peligrosos sin necesidad de pasar la enfermedad."
    }
  ],

  // ---------------------------------------------------------------------------
  // MINI-JUEGO: EL CLASIFICADOR DE ALIMENTOS (24 alimentos para el juego)
  // ---------------------------------------------------------------------------
  sorterFoods: [
    {
      id: "food_1",
      name: "Manzana fresca",
      icon: "🍎",
      origin: "vegetal",
      func: "regulador",
      processing: "natural",
      detail: "Rica en vitaminas, agua y fibra. ¡Reguladora de origen vegetal natural!"
    },
    {
      id: "food_2",
      name: "Filete de merluza",
      icon: "🐟",
      origin: "animal",
      func: "constructor",
      processing: "natural",
      detail: "Pescado fresco. Aporta proteínas para los músculos. ¡Constructor de origen animal!"
    },
    {
      id: "food_3",
      name: "Plato de macarrones",
      icon: "🍝",
      origin: "vegetal",
      func: "energetico",
      processing: "procesado",
      detail: "Pasta elaborada con trigo. Proporciona hidratos para tener energía durante todo el día."
    },
    {
      id: "food_4",
      name: "Botella de agua mineral",
      icon: "💧",
      origin: "mineral",
      func: "regulador",
      processing: "natural",
      detail: "Elemento mineral básico de la naturaleza. Imprescindible para la hidratación."
    },
    {
      id: "food_5",
      name: "Huevo campero",
      icon: "🥚",
      origin: "animal",
      func: "constructor",
      processing: "natural",
      detail: "Origen animal. Proteínas completas para crecer y reparar tejidos."
    },
    {
      id: "food_6",
      name: "Aceite de oliva virgen",
      icon: "🫒",
      origin: "vegetal",
      func: "energetico",
      processing: "procesado",
      detail: "Grasa cardiosaludable vegetal que aporta mucha energía para el organismo."
    },
    {
      id: "food_7",
      name: "Zanahoria crujiente",
      icon: "🥕",
      origin: "vegetal",
      func: "regulador",
      processing: "natural",
      detail: "Hortaliza fresca con betacarotenos y vitamina A para la vista y la piel."
    },
    {
      id: "food_8",
      name: "Sal marina",
      icon: "🧂",
      origin: "mineral",
      func: "regulador",
      processing: "natural",
      detail: "Mineral puro que procede del mar o de minas terrestres."
    },
    {
      id: "food_9",
      name: "Plato de lentejas",
      icon: "🍲",
      origin: "vegetal",
      func: "constructor",
      processing: "natural",
      detail: "Legumbre vegetal con abundantes proteínas y hierro."
    },
    {
      id: "food_10",
      name: "Pan tradicional de trigo",
      icon: "🥖",
      origin: "vegetal",
      func: "energetico",
      processing: "procesado",
      detail: "Alimento procesado elaborado horneando harina, levadura y agua. Rico en energía."
    },
    {
      id: "food_11",
      name: "Vaso de leche entera",
      icon: "🥛",
      origin: "animal",
      func: "constructor",
      processing: "natural",
      detail: "Origen animal (vaca/oveja/cabra). Calcio y proteínas para los huesos."
    },
    {
      id: "food_12",
      name: "Lata de refresco azucarado",
      icon: "🥤",
      origin: "vegetal",
      func: "energetico",
      processing: "ultraprocesado",
      detail: "Líquido industrial con exceso de azúcar, colorantes y gas. ¡Ultraprocesado a limitar!"
    },
    {
      id: "food_13",
      name: "Racimo de uvas",
      icon: "🍇",
      origin: "vegetal",
      func: "regulador",
      processing: "natural",
      detail: "Fruta natural llena de antioxidantes y agua fresca."
    },
    {
      id: "food_14",
      name: "Salmón ahumado",
      icon: "🍣",
      origin: "animal",
      func: "constructor",
      processing: "procesado",
      detail: "Pescado con proceso de ahumado y salado para alargar su vida útil."
    },
    {
      id: "food_15",
      name: "Bolsa de patatas fritas industriales",
      icon: "🍟",
      origin: "vegetal",
      func: "energetico",
      processing: "ultraprocesado",
      detail: "Producto industrial con fritura a altas temperaturas, sal excesiva y aditivos."
    },
    {
      id: "food_16",
      name: "Yogur natural sin azúcar",
      icon: "🥣",
      origin: "animal",
      func: "constructor",
      processing: "procesado",
      detail: "Leche fermentada con bacterias lácticas beneficiosas para el intestino."
    },
    {
      id: "food_17",
      name: "Bollo de bollería industrial",
      icon: "🍩",
      origin: "vegetal",
      func: "energetico",
      processing: "ultraprocesado",
      detail: "Múltiples harinas refinadas, grasas saturadas y azúcar añadido."
    },
    {
      id: "food_18",
      name: "Arroz blanco o integral",
      icon: "🍚",
      origin: "vegetal",
      func: "energetico",
      processing: "natural",
      detail: "Cereal vegetal que constituye la base energética de millones de deportistas."
    },
    {
      id: "food_19",
      name: "Espinacas frescas",
      icon: "🥬",
      origin: "vegetal",
      func: "regulador",
      processing: "natural",
      detail: "Verdura de hoja verde cargada de ácido fólico, hierro y vitaminas."
    },
    {
      id: "food_20",
      name: "Pechuga de pollo a la plancha",
      icon: "🍗",
      origin: "animal",
      func: "constructor",
      processing: "natural",
      detail: "Carne magra de ave. Proteína pura para construir fibras musculares."
    },
    {
      id: "food_21",
      name: "Lata de atún en aceite de oliva",
      icon: "🥫",
      origin: "animal",
      func: "constructor",
      processing: "procesado",
      detail: "Conserva tradicional de pescado azul, muy rica en omega-3."
    },
    {
      id: "food_22",
      name: "Plátano maduro",
      icon: "🍌",
      origin: "vegetal",
      func: "regulador",
      processing: "natural",
      detail: "Fruta con potasio y azúcares naturales que ayuda a evitar calambres musculares."
    },
    {
      id: "food_23",
      name: "Queso curado",
      icon: "🧀",
      origin: "animal",
      func: "constructor",
      processing: "procesado",
      detail: "Lácteo fermentado y madurado tradicionalmente con sal y cuajo."
    },
    {
      id: "food_24",
      name: "Nuggets de pollo congelados",
      icon: "🍗",
      origin: "animal",
      func: "constructor",
      processing: "ultraprocesado",
      detail: "Pasta de carne triturada con almidones, harinas, aditivos y aceites refinados."
    }
  ],

  // ---------------------------------------------------------------------------
  // GUÍA DE ESTUDIO VISUAL Y RESUMEN DEL TEMA
  // ---------------------------------------------------------------------------
  studyGuide: [
    {
      id: "sg_1",
      icon: "❤️",
      title: "1. ¿Qué es la Salud y cuáles son sus tres dimensiones?",
      summary: "La salud no consiste solo en no estar enfermo, sino en disfrutar de un bienestar integral.",
      points: [
        "**Salud física:** Nuestro cuerpo funciona correctamente y podemos desarrollar las actividades diarias con fuerza y agilidad.",
        "**Salud mental:** Aprendemos a reconocer y gestionar las emociones (alegría, enfado, tristeza) y nos sentimos a gusto con nosotros mismos.",
        "**Salud social:** Nos relacionamos de forma positiva, solidaria y respetuosa con los compañeros, familia y amigos.",
        "💡 *Recuerda:* Las tres dimensiones se influyen mutuamente. Jugar en el patio con amigos cuida tu cuerpo, tu mente y tu convivencia social."
      ]
    },
    {
      id: "sg_2",
      icon: "🛡️",
      title: "2. Hábitos saludables y Prevención",
      summary: "Acciones diarias para proteger nuestro organismo y evitar enfermedades.",
      points: [
        "**Hábito saludable:** Conducta positiva que repetimos cada día (alimentación variada, beber agua, lavarse las manos y dientes, dormir 9-10 horas, sentarse bien).",
        "**Prevenir:** Tomar medidas anticipadas para evitar daños, lesiones o enfermedades antes de que sucedan.",
        "**Las 3 grandes medidas de prevención:** 1) Hábitos saludables continuos, 2) Revisiones periódicas en el pediatra y dentista, 3) Vacunas del calendario infantil."
      ]
    },
    {
      id: "sg_3",
      icon: "🌱",
      title: "3. Clasificación de alimentos por su ORIGEN",
      summary: "¿De dónde procede lo que comemos y bebemos?",
      points: [
        "**Origen Animal:** Proceden de animales. Ejemplos: leche, huevos, pescado, carne, miel, queso.",
        "**Origen Vegetal:** Proceden de plantas y cultivos. Ejemplos: frutas, verduras, legumbres, arroz, trigo, aceite de oliva.",
        "**Origen Mineral:** Proceden de elementos minerales de la naturaleza. Ejemplos: **Agua y Sal**.",
        "⚠️ *Cuidado en el examen:* El agua y la sal NO son ni animales ni vegetales; ¡son de origen mineral!"
      ]
    },
    {
      id: "sg_4",
      icon: "⚡",
      title: "4. Clasificación de alimentos por su FUNCIÓN",
      summary: "¿Para qué sirve cada alimento dentro de nuestro organismo?",
      points: [
        "**Alimentos Energéticos:** Aportan energía para movernos, jugar, estudiar y que funcionen los órganos. *Ejemplos:* Pan, pasta, arroz, patatas, aceite, cereales.",
        "**Alimentos Constructores:** Aportan materiales (proteínas) para crecer en estatura y reparar músculos y tejidos. *Ejemplos:* Pescado, huevos, legumbres, carne, leche.",
        "**Alimentos Reguladores:** Aportan vitaminas y minerales para que todo el cuerpo funcione con orden y nos defiendan de enfermedades. *Ejemplos:* Frutas, verduras y hortalizas.",
        "💡 *Doble clasificación:* Un mismo alimento se clasifica a la vez por su origen Y por su función (ej: la manzana es vegetal + reguladora; el salmón es animal + constructor)."
      ]
    },
    {
      id: "sg_5",
      icon: "🧪",
      title: "5. Alimentos Naturales, Procesados y Ultraprocesados",
      summary: "Según el nivel de transformación que han recibido antes de comerlos.",
      points: [
        "**Naturales o mínimamente procesados:** Conservan sus características originales tal como vienen de la naturaleza. *Ejemplos:* Manzana fresca, zanahoria, pescado fresco, huevo crudo, leche fresca.",
        "**Procesados:** Alimentos transformados de forma sencilla con pocos ingredientes para conservarlos mejor o mejorar su sabor tradicional. *Ejemplos:* Salmón ahumado, conservas de atún, queso artesano, pan de panadería.",
        "**Ultraprocesados:** Productos industriales elaborados con múltiples mezclas, aditivos químicos, azúcares y grasas añadidas. Apenas se reconoce el alimento original. *Ejemplos:* Refrescos azucarados, bollería empaquetada, patatas chips, aperitivos industriales. ¡Deben limitarse!",
        "💡 *Regla de oro:* 'Procesado' no significa malo. Hay procesados muy saludables (como el aceite de oliva o las legumbres en bote). Lo que hay que limitar son los ultraprocesados."
      ]
    },
    {
      id: "sg_6",
      icon: "🥗",
      title: "6. La Dieta Saludable y el Plato Equilibrado",
      summary: "La dieta es todo lo que consumimos habitualmente; para ser sana debe ser variada y suficiente.",
      points: [
        "**Tomar 5 raciones de frutas y verduras** frescas cada día.",
        "**Elegir cereales preferentemente integrales** y comer legumbres varias veces por semana.",
        "**Beber AGUA** como bebida habitual durante el día (entre 1,5 y 2 litros) y desterrar los refrescos azucarados.",
        "**Priorizar alimentos naturales** y frescos frente a ultraprocesados.",
        "Comer sentado, masticar despacio y compartir la mesa en familia."
      ]
    },
    {
      id: "sg_7",
      icon: "🚴",
      title: "7. Ejercicio Físico y sus Tres Momentos de Seguridad",
      summary: "El movimiento diario cuida huesos, corazón, pulmones y estado de ánimo.",
      points: [
        "**Antes del ejercicio:** Realizar ejercicios de **calentamiento** (movilidad de tobillos, rodillas, brazos) y comprobar que el material esté seguro (casco, protecciones, frenos).",
        "**Durante el ejercicio:** Respetar las normas, beber agua poco a poco y descansar si se siente fatiga o mareo.",
        "**Al terminar el ejercicio:** Bajar el ritmo de manera progresiva (vuelta a la calma), realizar **estiramientos** suaves e hidratarse de nuevo con agua."
      ]
    },
    {
      id: "sg_8",
      icon: "🎒",
      title: "8. Higiene Postural y Cuidado de la Espalda",
      summary: "Cuidar la posición del cuerpo evita esfuerzos perjudiciales y dolores futuros.",
      points: [
        "**Al sentarse:** Mantener la espalda completamente apoyada en el respaldo de la silla y los dos pies apoyados en el suelo o en un reposapiés.",
        "**Al llevar la mochila:** Utilizar siempre **los DOS tirantes acolchados**, ajustándolos para que la mochila quede pegada a la zona media de la espalda y repartiendo el peso por igual. ¡Nunca colgarla de un solo hombro ni usar bolsas asimétricas para mucho peso!",
        "**Al agacharse al suelo:** Flexionar siempre las **rodillas** y mantener la espalda recta, acercando el peso al cuerpo.",
        "**Al dormir:** Postura más indicada: **de lado** con la columna alineada o **bocarriba** con la cabeza sobre una almohada adecuada y las piernas relajadas."
      ]
    }
  ]
};
