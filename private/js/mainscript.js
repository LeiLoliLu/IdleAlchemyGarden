//#region VARIABLES

var hasClient = false;
var guaranteedPotions = 0;
var lastClient = 20;
var clientObj;
var matchingItems;
var selectedItem;
var polentype = 1; //1 active, 2 dormant
var cooldownPolen = false;
var cooldownAurora = false;
var aurorapart = 1; //1 hojas, 2 fruto
var lastHarvestTime = {};
var targetPetition = "";
var multiplier = 1;
var all = false;
var audioactive = true;
var interacted = false;
const cooldowns = {
  i1: 0.1, //0.1
  i2: 5, //5
  i3: 15, //15
  i4a: 30, //30
  i4b: 30, //30
  i5: 45, //45
  i6: 60, //60
};
var guardadoAutomatico;

var currentInv = {
    i1: 0,
    i2: 0,
    i3: 0,
    i4a: 0,
    i4b: 0,
    i5: 0,
    i6: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0,
    31: 0,
    32: 0,
    33: 0,
    34: 0,
    35: 0,
    36: 0,
    37: 0,
    38: 0,
  };
  
  var progress = {
    hasPetalos: false,
    hasRaices: false,
    hasPolen: false,
    hasAurora: false,
    gold: 0,
    recipesUnlocked: [],
  };

var emptyInventory = {
    i1: 0,
    i2: 0,
    i3: 0,
    i4a: 0,
    i4b: 0,
    i5: 0,
    i6: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0,
    31: 0,
    32: 0,
    33: 0,
    34: 0,
    35: 0,
    36: 0,
    37: 0,
    38: 0,
  };
  
var emptyprogress = {
    hasPetalos: false,
    hasRaices: false,
    hasPolen: false,
    hasAurora: false,
    gold: 0,
    recipesUnlocked: [],
  };

const townsfolk = [
    {
      name: "Caelynn Summersun- Aventurera Escurridiza",
      greeting:
        "Hola, necesito unos suministros. No puedo decirte exactamente para que... Hagámoslo de forma discreta.",
      type: "adventurer",
      dialogs: [
        "Una vez disparé a un osobúho que atacaba un almacén de grano, creía que estaba salvando el pueblo, pero murió gente.",
        "Esta tienda está poco protegida, los cerrojos de las ventanas son un poco tristes, anoche pude colarme sin problema.",
        "Si alguna vez necesitas de mis servicios puedes encontrarme en la taberna de Petra.",
        "No me convence la decoración que tienes, deberías darle un aire más floral.",
        "Ya te he dicho suficiente. Discreción, ¿Recuerdas? Venga, que no tengo todo el dia.",
      ],
      specialReq: {
        petition:
          "Me han hecho un encargo muy duro, no creo que haya nadie a la altura de la misión. Yo soy dura, pero mis compañeros no. Dame 4 pociones de Endurecimiento, las van a necesitar.",
        expectedItem: "12",
        quantity: 4,
      },
    },
    {
      name: "Cawbett - Cuervo Parlanchín",
      greeting:
        "¡Buen día cawmarada Herborista! Necesito tu ayuda para cawntinuar con mis aventuras.",
      type: "adventurer",
      dialogs: [
        "Caw buen día hace fuera, te recomiendo ir dar una vuelta, igual incluso podrías encontrar inspiración para nuevas pociones.",
        "Tienes una cawbaña de lo más agradable, casi me haces replantearme hacerme herborista si se puede vivir con tanta tranquilidad cawmo tú.",
        "¿A caw viene esa cawra? ¿Nunca has visto a un pájaro hablar? ... ¿No? Oh, bueno, siempre hay una primera vez para todo.",
        "¿Por algún cawsual no tendrás una planta caw se parezca a un ajo? Es mil veces mejor porcaw cuando lo pones en pan, es cawmo comer un pedazo de gloria... Es una bendición caw exista... Caw rico estaba ese pan, necesito preparar más...",
        "Te ves bien hoy, Herborista. No caw no te vea bien otros días, pero hoy te ves muy feliz y una sonrisa ilumina cawlquier cawra.",
      ],
      specialReq: {
        petition:
          "Herborista, escawchame bien porque necesito tu ayuda. Voy a preparar la mejor receta caw existe en este mundo; Pan de frutos de aurora. El único problema con esto es caw me falta la parte más esencial de todo esto, caw son 5 frutos de aurora. ¿Crees caw podrías ayudarme?",
        expectedItem: "i6",
        quantity: 5,
      },
    },
    {
      name: "Gin - Pícaro Kobold",
      greeting: "Pssst. ¡Hola! Necesito una cosita.",
      type: "adventurer",
      dialogs: [
        "No soy un lagarto. ¡Soy un Kobold! Se que soy chiquitín, pero no tanto como un lagarto.",
        "Vengo de las regiones del norte. Cuando era una cría, un tabernero me acogió a mí y a mi hermano. Nos diferenciaba por las botellas en las que dormíamos: Una de Gin-ebra y una de Ron.",
        "Mi hermano aún se encarga del bar de nuestro padre. A mi me gusta más la aventura. ¡Mi grupo es mi segunda familia!",
        "¿Desde cuándo tienes esta tienda? ¿Las cosas de la estantería son valiosas? ... ¿Puedo coger una un ratito?",
        "¿Cómo llevas lo de la frontera? Solía tener un amigo que se hubiera alistado automáticamente, jaja... Y mientras yo aquí como un cobarde.",
      ],
      specialReq: {
        petition:
          "Voy a gastarle una broma a alguien... Y he pensado que podría hacer polvos picapica con algo de polen activo. ¿Te sobran 5 saquitos?",
        expectedItem: "i4a",
        quantity: 5,
      },
    },
    {
      name: "Longrim Wymberforged - Druida Viajero",
      greeting: "Buenas tardes, rapaz. Hoy hace un día mágico, ¿No le parece?",
      type: "adventurer",
      dialogs: [
        "¿Día duro en la tienda? Corre como un caracol y nunca te torcerás un tobillo.",
        "¿No habrán pasado por aquí un dracónido rojo con una elfa a la espalda, no? Mi grupo es un tanto... peculiar.",
        "Te daré un consejo, cuando un árbol te golpee, ¡escuchalo!",
        "En otro momento me encantaría poder pasarme a ver ese huertecillo tuyo. Aunque no sea común, soy un enano al que le fascinan las plantas.",
        "Herborista, tienes buen ojo. Te confirmo que esto que llevo enredado en la barba es albahaca.",
      ],
      specialReq: {
        petition:
          "Verás Herborista, esta noche tendré una cita en la taberna y me gustaría estar despierto el máximo tiempo posible haciéndole compañía. Dame un par.",
        expectedItem: "9",
        quantity: 2,
      },
    },
    {
      name: "Maccon Iceblood - Cazador del pueblo",
      greeting: "¿Tienes mucho lío? Intentaré pedir rápido.",
      type: "adventurer",
      dialogs: [
        "El silencio del bosque puede ser inquietante, pero también revelador. A veces, es en la quietud donde se ocultan los mayores peligros.",
        "Mi trabajo como cazador va más allá de traer comida a la mesa. También protejo al pueblo de posibles amenazas y garantizo la seguridad de nuestros hogares.",
        "Hubo una vez, en las profundidades del bosque, que me vi rodeado por una manada de lobos hambrientos. Fue un recordatorio brutal de que en la naturaleza, incluso el cazador puede convertirse en presa.",
        "¿Ha venido Maeve hoy a la tienda? ¿Q-qué por qué pregunto? Por nada. Pura curiosidad-.",
        "Le he pedido a Eldric una espada nueva... quizás debería haber esperado, estoy convencido de que ahora cree que me voy a unir a los guerrilleros de la frontera.",
      ],
      specialReq: {
        petition:
          "Hoy hay caza. Necesito 5 pociones de curación. Estimo que va a ser peligroso.",
        expectedItem: "1",
        quantity: 5,
      },
    },
    {
      name: "Witchette Aeterna - El sombrero es la bruja",
      greeting: "Hola, ¿Me puedes ayudar? Necesito unas cositas.",
      type: "mage",
      dialogs: [
        "Mis ojos están aquí arriba. Esos de ahí abajo no sirven, solo tengo esto para poder caminar.",
        "¡Oh, Herborista! Hoy me he topado con un joven mago que intentaba convocar a un dragón. ¡Fue un espectáculo! Aunque francamente, podría haberlo hecho mejor.",
        "Es agotador cómo la gente me mira con desconfianza solo por haber tomado un cuerpo prestado. Como si no pudieran entender que necesito interactuar con el mundo de alguna manera. ¡Ah, la ignorancia humana!",
        "Hoy has escogido una vestimenta encantadora. ¿Te importaría prestármela para un paseo mágico por el pueblo? ...No me mires así, ¡Me refiero a tomar la ropa prestada, no tu cuerpo!",
        "A veces, echo de menos mi antiguo cuerpo etéreo. Era tan ligero como una pluma y podía deslizarme entre los rincones más oscuros de la noche. Pero supongo que este cuerpo humano tiene sus ventajas... aunque sea un poco torpe a veces.",
      ],
      specialReq: {
        petition:
          "Mi Herborista, debes salvarme. Necesito una poción de amor, ¡esto es URGENTE! Te prometo que valdrá la pena.",
        expectedItem: "20",
        quantity: 1,
      },
    },
    {
      name: "Maeve Silvermoon - Oráculo Lunar",
      greeting:
        "Muy buen dia, Herborista. ¿Saldrás por la noche? La luna va a estar preciosa.",
      type: "mage",
      dialogs: [
        "Dicen que mis visiones son un regalo, pero a veces siento que son una maldición. Ver el destino de los demás puede ser una carga pesada, especialmente cuando sé que no puedo cambiarlo",
        "Anoche, las estrellas me hablaron en susurros sombríos sobre las fronteras. Vi nubes oscuras acechando más allá de la línea que separa la seguridad del peligro. Algo inquietante se avecina en el horizonte y temo que su sombra se extienda hacia nuestro pueblo.",
        "La Tierra y la Luna, como amantes eternos, se acompañan en un baile celestial. A menudo me pregunto si sus secretos guardan también los misterios del amor verdadero.",
        "Suelo coincidir con Maccon por las noches. Es realmente encantador. Sus ojos son del color de la luz de la luna, es un tanto hipnótico.",
        "No suelo hablar con la gente del pueblo. Usualmente cuando salgo a la calle es en plena noche, asique no he coincidido demasiado con el resto de vecinos.",
      ],
      specialReq: {
        petition:
          "Hoy celebro un ritual muy importante, necesito todos los pétalos de luna que tengas. La diosa te lo agradecerá.",
        expectedItem: "i2",
        quantity: "all",
      },
    },
    {
      name: "Palmeadus Pico de Rubí - Gran Archimago",
      greeting: "Saludos, joven mortal. Requiero tus servicios una vez más.",
      type: "mage",
      dialogs: [
        "¿Qué? ¿Por qué me miras así? Detente. Es una orden.",
        "Hace siglos solía tener otra forma. Sin embargo descubrí que esta apariencia es claramente superior. Deberías sentirte honrado de estar en mi presencia.",
        "Deja de perder el tiempo y prepara mi pedido, mortal. Mi tiempo es oro.",
        "¿Aprendiz? No, no busco aprendices. No estoy interesado en la alquimia tampoco, así que no, guarda tus indirectas.",
        "Esos malditos gemelos me escondieron mi sombrero de poder esta mañana. Casi no consigo encontrarlo.",
      ],
      specialReq: {
        petition:
          "La orden de las sombras ha entrado en una guerra mágica contra mí. Necesito escudos protectores para defenderme de sus ataques mientras preparo mi ofensiva. Dame un par.",
        expectedItem: "17",
        quantity: 2,
      },
    },
    {
      name: "Stretch y Stitches - Gemelos Ilusionistas",
      greeting: "(ambos a la vez) ¡Hola, hola!",
      type: "mage",
      dialogs: [
        "(Stretch) Herborista, ¿Te gustan los trucos de magia? <br> (Stitches) ¿A quién no le gustan los trucos de magia? ¡Seguro que le encantan! <br> (Stretch) ¡Podríamos enseñarte un par de trucos si quieres!",
        "¡Oh! ¡Qué bonita es esta tienda! ¿La has decorado totalmente tú, Herborista?",
        "(Stretch) ¿Te imaginas la cara de Palmeadus cuando descubra que le hemos escondido su piedra de poder? <br> (Stitches) ¡Jaja! Tu no digas ni palabra, ¿Eh, Herborista? Guardanos el secreto.",
        "¡Vamos a preguntarle a Amely si podemos hacer un espectáculo en la plaza, tienes que venir!",
        "(Stitches) ¿No te asusta la frontera, Herborista? <br> (Stretch) No hay que tener miedo. ¡Maccon y Eldric nos cuidan!",
      ],
      specialReq: {
        petition: "¡Necesitamos dos pociones de invisibilidad!",
        expectedItem: "27",
        quantity: 2,
      },
    },
    {
      name: "Eloise Sapeye - Médica Errante",
      greeting: "Hola... Estoy de paso. Tu tienda es realmente preciosa.",
      type: "merchant",
      dialogs: [
        "Disculpa si parezco un poco nerviosa, es que no estoy acostumbrada a estar en el centro de atención. Solo quiero hacer mi trabajo y ayudar a los que lo necesitan. Siempre me pregunto si debería haber estudiado más medicina o si mi ayuda en la frontera es suficiente...",
        "La gente aquí es muy amable... a veces me sorprende cómo se preocupan unos por otros. Me siento agradecida por poder contribuir, aunque sea de manera modesta.",
        "¿De dónde vengo? Bueno, soy de un pueblo no muy lejano de aquí. Pero últimamente he estado viajando mucho, especialmente hacia la frontera. Mi familia siempre ha sido muy solidaria, así que sentí que era mi deber ayudar en tiempos difíciles.",
        "¿Has visto a Glob últimamente? Siempre viene a la clínica con sus pequeños problemas gelatinosos. Es curioso cómo incluso los seres más inusuales necesitan cuidado médico.",
        "He escuchado que tus padres están en el otro lado de la frontera. Me pregunto cómo están y si necesitan algo. ¿Has recibido alguna noticia reciente sobre ellos?",
      ],
      specialReq: {
        petition:
          "Hoy tengo un día muy largo... Necesito hacerme una infusión... ¿20 hierbas evergreen bastarán?",
        expectedItem: "i1",
        quantity: 20,
      },
    },
    {
      name: "Glob - Mercader Gelatinoso",
      greeting: "Uy... Glob te ha llenado la entrada de babas. Glob lo siente.",
      type: "merchant",
      dialogs: [
        "Glob vio una planta muy brillante en el bosque anoche. Era tan brillante como las luciérnagas. ¿Sabes qué planta podría ser?",
        "¡Ugh, lluvia mal! Glob no gusta. Mojar a Glob mucho y hacer resbalar. ¿Tú tener poción para parar lluvia?",
        "¡Hoy Glob tener día muy divertido! ¡Glob jugar con Scoot! ¡Scoot ser muy rápido! ¡Glob correr mucho para alcanzar a Scoot!",
        "Hoy muchos clientes visitar a Glob. Ellos querer gelatina para sus problemas. Glob ayudar con remedios. ¿Tú tener más clientes hoy?",
        "¡Glob comer en taberna de Helga! Comida de Helga ser muy buena, aunque un poco... pegajosa. Glob preferir gelatina, pero comida de Helga no estar mal.",
      ],
      specialReq: {
        petition:
          "Glob quiere frutos de aurora para gelatina. Gelatina arcoiris. 3 frutos aurora.",
        expectedItem: "i6",
        quantity: 3,
      },
    },
    {
      name: "Solor Maeafin - Vendedor de Micelio",
      greeting: "¡Buenos días! Necesito un favorcillo. ¡Será rápido!",
      type: "merchant",
      dialogs: [
        "Soy un druida de las esporas. ¡Me crecen setas en las manos! Tengo un vivero en mi carro donde las planto y las mezclo. Más o menos como tus pociones.",
        "Si algún día te apetece experimentar podrías poner una de mis setas en una de tus pociones.",
        "¿Has visto hoy a Longrim? He coincidido con su grupo unas cuantas veces. Me pregunto si Dunons sigue siendo de color verde, jajaja.",
        "Dentro de unos días voy a moverme de asentamiento con mi grupo de mercaderes. ¡Calma, no te vas a librar de mi tan facilmente!",
        "¿Mi cara?...No, jaja, eso es privado. Ja-jaja...um... ",
      ],
      specialReq: {
        petition:
          "Necesito de forma urgente una poción de rejuvenización. No tengo tiempo de explicarlo, te compro todas las que tengas. ¡Todo mi vivero depende de esto!",
        expectedItem: "34",
        quantity: "all",
      },
    },
    {
      name: "Amely Lawkin - Alcaldesa Nerviosa",
      greeting:
        "¡Muy buenos días! Me alegra verte por aquí. Aunque, siendo sinceros, sería raro que no lo estuvieras, jaja.",
      type: "town",
      dialogs: [
        "Yo... um... si necesitas algo de la alcaldía... aquí estoy... para ayudar... supongo.",
        "Estoy tratando de organizar un... un evento para la comunidad. P-pero no sé si es una buena idea... ¿Tú crees que sería útil?",
        "¿Has visto a Daph? ...Tengo un paquete que... Debería entregar pronto.",
        "Siento interrumpir, pero ¿has escuchado si hay novedades sobre la frontera últimamente? La incertidumbre me está afectando un poco...",
        "Um, ¿sabes? A veces siento que... tal vez la alcaldía me queda un poco grande. Intento hacer lo mejor que puedo, pero... es abrumador.",
      ],
      specialReq: {
        petition:
          "¿Tienes algo que pueda hacerme... más fuerte? ¡Más, más- dura! Um... ¿Algo de raíces?",
        expectedItem: "12",
        quantity: 1,
      },
    },
    {
      name: "Daph Swiftstride - Mensajero Centauro",
      greeting: "¡Tengo prisa y mucho trabajo así que vamos al grano!",
      type: "town",
      dialogs: [
        "Solo vine por un pedido. Tengo que irme enseguida.",
        "¡Amo mi trabajo! No hay nada como la emoción de entregar paquetes y ver la sonrisa en el rostro de los clientes cuando reciben lo que esperaban.",
        "Amely siempre manda y recibe muchos paquetes, y debo asegurarme de que lleguen a tiempo. No hay descanso para los repartidores.",
        "Solo espero que Palmeadus no esté involucrado en la entrega de hoy. Nunca me ha caído bien y sus encargos siempre terminan siendo un dolor de cabeza.",
        "Sabes, como repartidor, a veces siento que soy el núcleo de muchas relaciones. Entregar paquetes no es solo entregar objetos, sino también conectar a las personas y mantener esos lazos fuertes.",
      ],
      specialReq: {
        petition:
          "He perdido un paquete de Palmeadus y va a convertirme en un pato como no lo encuentre. ¿Tienes algo que pueda ayudarme a encontrarlo?",
        expectedItem: "37",
        quantity: 1,
      },
    },
    {
      name: "Eldric Stonemantle - Forjador Curtido",
      greeting: "Buenas tardes. ¿Te pillo en buen momento?",
      type: "town",
      dialogs: [
        "Mi herrería está hasta arriba de encargos de la frontera últimamente. Nunca voy a quejarme de poder vender productos, pero... Me apena la razón.",
        "Yo también tengo a familia al otro lado de la frontera. Si algún dia necesitas hablar con alguien, mi forja está abierta.",
        "Haces un buen trabajo llevando la tienda. Recuerda descansar de vez en cuando, ¿Vale?",
        "El otro día Maccon me comisionó una nueva espada. Espero que no planee ir al frente.",
        "Esta noche Helga va a hacer estofado de piedras. Si puedes, pásate, siempre le queda delicioso.",
      ],
      specialReq: {
        petition:
          "El calor de la fragua puede ser muy fatigador. ¿Tienes pociones de área de frío? Te compro las que tengas.",
        expectedItem: "19",
        quantity: "all",
      },
    },
    {
      name: "Helga Barbafresca - Dueña de la taberna del pueblo",
      greeting: "¡Buenos días por la mañana! Espero que hayas desayunado.",
      type: "town",
      dialogs: [
        "Espero que estés teniendo un día entretenido. Yo tengo que volver rápido a la taberna para ver si Daph me trae un paquete con las mejores sedas del país vecino, luego me pondré a hilarla y tras eso me pondré a coser unas ropas de cama preciosas.",
        "Si algún día te entra la curiosidad por comer un buen desayuno de la taberna, puedes hacer un pedido el día de antes y estaré encantada de traértelo antes de que abras. Solo por ser tú, te pondré extra de mermelada casera.",
        "Te voy a contar un secretito, pero que quede entre tú y yo, hay gente que ya ha empezado a hablar muy bien de tí y de tu tienda por la taberna. Así que vengo con unas expectativas altas, pero confío en que estarás más que a la altura.",
        "He visto a Maeve saliendo más por el día desde que abriste tu tiendita. ¿Has tenido la oportunidad de conocerla ya? Es una persona muy enigmática pero es agradable, de hecho es tan agradable que incluso parece iluminarle los ojos a Maccon cuando coinciden a la luz de la luna.",
        "Ay, estos aventureros son tan increíbles, estaría a todas horas escuchando todas sus historias y a todos los lugares que han. Por ejemplo, ¡Longrim ha viajado incluso hasta Bel'ashir con su grupo! ",
      ],
      specialReq: {
        petition:
          "¡Esta noche voy a preparar mi famoso estofado de piedra! Necesito 5 raíces. ¡Va a quedar delicioso!",
        expectedItem: "i3",
        quantity: 6,
      },
    },
    {
      name: "Isabel Hojaoliva - Abuelita Adorable",
      greeting: "Hola, joven. Hace un día precioso en el pueblo.",
      type: "town",
      dialogs: [
        "Las temperaturas suelen bajar en esta época del año, ¡recuerda abrigarte bien antes de salir!",
        "Antes he visto a un enano muy apuesto que olía a albahaca, este mundo está repleto de cosas interesantes.",
        "Scoot es una ricura, ¡siempre correteando de allí para allá! Quizás te sorprenda, pero otrora fui una chavalita igual de inquieta.",
        "Que encantadora es Amely, ¡el otro día me instaló una mecedora en la vieja biblioteca!",
        "¿Has comido, cielo? ¿Te preparo una tortilla y te la traigo?",
      ],
      specialReq: {
        petition:
          "Hoy voy a hacer una gran comida para mi familia, pero la leña que tenemos en casa no creo que sea suficiente para calentar toda la sala cuando vamos a estar tantas personas. ¿Serías tan amable de darme alguna poción para calentar el salón de mi casa?",
        expectedItem: "18",
        quantity: 1,
      },
    },
    {
      name: "Scoot - Pequeño Alborotador",
      greeting: "¡Herborista! ¡Buenos días! Mi madre me ha dicho que venga.",
      type: "town",
      dialogs: [
        "No me apetecía venir, la verdad, pero Mamá está malita y no puede venir ella.",
        "Papá se ha ido a la frontera. Estoy ayudando a Mamá por casa. No se me da bien cocinar, pero al menos lo hago mejor que Papá.",
        "¿Has jugado alguna vez a los dados mentirosos? ¡Gin me enseñó a jugar el otro día!",
        "De mayor, me gustaría ser un druida como Longrim. ¿O quizás un cazador como Maccon? ¡Ya sé, un pato! Como Palmeadus.",
        "El otro día me escapé hasta la frontera para ver si veía a Papá. ¡Le vi ayudando a mover cajas muy grandes!",
      ],
      specialReq: {
        petition:
          "Me he tomado sin querer la medicina de Mamá, me ha dicho que necesito comprar un...¿'antedoto'? No se que es un antedoto.",
        expectedItem: "13",
        quantity: 1,
      },
    },
    {
      name: "Tombo, Pombo y Finnz - 'Duque Beraaz'",
      greeting:
        "¡Maravillosos días! Soy el Duque Beraaz y preciso de los suministros que distribuye usted.",
      type: "town",
      dialogs: [
        "No tengo tiempo para cháchara, tengo asuntos de barón muy importantes que atender. <br> (Pombo): ¡Somos duque, mendrugo! <br> (Beraaz): Quiero decir, ¡asuntos de duque barón, hehe!",
        "Así es, estás en presencia del Duque Biraaz- quiero decir, ¡El duque Beraaz! <br> (Tombo): Vaya nombre más birria. <br> (Finnz): ¡Cíñete al papel!",
        "Las cosas de palacio van despacio, pero date prisa, soy un magnate muy ocupado. <br> (Pombo): ¡Actúas fatal! <br> (Finnz): Pero es el más ligero.",
        "¿Mi secreto para ser un buen burgués? ¡Juntate con buena asesoría! <br> (Finnz): Si, tres cabezas piensan más que una... <br> (Pombo): ¡En la cabeza si que te voy a dar!",
        "Aunque no lo creas, formar parte de la alta sociedad resulta agotador. <br> (Pombo): ¡Agotador es sujetar tus pies malolientes! <br> (Finnz): Y lo dices tú que no eres el de abajo.",
      ],
      specialReq: {
        petition:
          "Necesitamos... ¡Necesito! Necesito algo que haga ver formas y colores donde no las hay. No preguntes el porqué, son asuntos de duque.",
        expectedItem: "31",
        quantity: 1,
      },
    },
    {
      name: "Michael - Joven Extraño",
      greeting:
        "¿Qué tal va la jornada, Herborista? ¿Muchos clientes? ¿Te aburres?",
      type: "wildcard",
      dialogs: [
        "Me alegra ver que tu tienda va bien. Debe de ser duro sin la ayuda de tus padres. No te preocupes, seguro que están bien.",
        "¿A qué me dedico? Bueno... Un poco de todo.",
        "¿No te cansas de estar aquí todo el día? Puedo darte un salvoconducto fuera si me lo pides.",
        "Las pociones extrañas tienen propiedades magníficas. Es una pena que se descarten como a basura, asique prefiero comprartelas.",
        "Tu tienda es preciosa. Muy colorida. Últimamente hay muchas cosas a las que les falta color, asique es una alegría para los ojos.",
      ],
      specialReq: {
        petition:
          "Escucha... No necesito una poción extraña hoy. Un... amigo ha tenido un accidente. Necesito todas las pociones contra ceguera que tengas.",
        expectedItem: "30",
        quantity: "all",
      },
    },
  ];
  
const items = [
    {
      id: "i1",
      item: "Hierba Evergreen",
      archetype: ["merchant"],
      desc: "Utilizado de forma común en infusiones calmantes.",
      price: 1,
      petitions: [
        "Un cliente necesita una infusión calmante.",
        "¿Tienes un poco de Hierba Evergreen de sobra?",
        "Necesito un poco de hierba para poner en mi té.",
      ],
    },
    {
      id: "i2",
      item: "Pétalo de Luna",
      archetype: ["merchant"],
      desc: "Se dice que estos pétalos fueron bendecidos por la diosa de los sueños",
      price: 5,
      petitions: [
        "Necesito un pétalo de luna para un cliente.",
        "¿Te queda algún pétalo?",
        "Algo para dormir. ¡Pero que no sea una poción! Solo el ingrediente.",
      ],
    },
    {
      id: "i3",
      item: "Raíz de Piedra",
      archetype: ["merchant"],
      desc: "Algunos animales la usan para endurecer sus colmillos.",
      price: 10,
      petitions: [
        "Un cliente tiene los dientes fatales. Una poción no va a servir, dice que no quiere meterse eso en el cuerpo.",
        "Ando un poco escaso de unidades de raíz de piedra. ¿Tienes?",
        "Dicen que las raíces de piedra son muy saludables. Mejor llevar alguna encima.",
      ],
    },
    {
      id: "i4a",
      item: "Polen Vulcano Activo",
      archetype: ["merchant"],
      desc: "Cocineros prestigiosos Ravashies lo utilizan como especia. Es un tanto picante.",
      price: 15,
      petitions: [
        "Me han encargado especias exóticas. ¿Tienes algo?",
        "Hoy me apetece comer picante.",
        "He oído que el polen vulcano activo es un magnífico exfoliante.",
      ],
    },
    {
      id: "i4b",
      item: "Polen Vulcano Durmiente",
      archetype: ["merchant"],
      desc: "Cocineros prestigiosos Ravashies lo utilizan como especia. Recuerda a menta.",
      price: 15,
      petitions: [
        "Un socio se hace el té con polen vulcano durmiente. ¿Tienes una pizca?",
        "Me han contado que puedes limpiarte los dientes con el polen de menta.",
        "Dame una bolsa de polen frío, me han encargado que la recoja.",
      ],
    },
    {
      id: "i5",
      item: "Hojas de Aurora",
      archetype: ["merchant"],
      desc: "Unas hojas cristalinas. Trituradas, recuerdan a las auroras boreales.",
      price: 20,
      petitions: [
        "¿Sabías que puedes hacer maquillaje con las hojas de aurora?",
        "La escuela del pueblo me ha encargado que te compre hojas para hacer purpurina.",
        "Un cliente me ha pedido una hoja brillante. ¿Te sobran?",
      ],
    },
    {
      id: "i6",
      item: "Fruto de Aurora",
      archetype: ["merchant"],
      desc: "Una baya cristalina. Es una planta tan débil que sus hojas se rompen en cuanto se cosecha el fruto.",
      price: 25,
      petitions: [
        "Un cliente muy sibarita me ha encargado que le busque frutos de cristal. ¿Tienes?",
        "Hay gente que se puede permitir cocinar con frutos de aurora. Estoy de recados.",
        "¿Tienes de esa planta débil? Las hojas no, el fruto.",
      ],
    },
    {
      id: "1",
      item: "Poción de Curación Menor",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Ayuda a calmar heridas pequeñas y malestar general.",
      price: 5,
      petitions: [
        "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
        "He cogido un resfriado y me siento fatal.",
        "Creo que tengo fiebre... ¿Tienes algo que ayude?",
        "He comido algo en mal estado y me siento muy mal. ¿Puede que esté envenenado?",
        "Me he hecho una quemadura mientras cocinaba. ¿Tienes algún remedio?",
        "He tocado algo muy frío y me ha salido una quemadura por congelación.",
      ],
    },
    {
      id: "2",
      item: "Poción Contra Pesadillas",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Sus propiedades consiguen mantener una mente calmada mientras se duerme.",
      price: 9,
      petitions: [
        "Últimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
        "No paro de tener pesadillas, no puedo pegar ojo.",
        "Casi todas las noches tengo un sueño con algo horrible, me gustaría dejar de hacerlo.",
      ],
    },
    {
      id: "3",
      item: "Poción Contra Resfriado",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Una poción muy eficaz contra resfriados comunes.",
      price: 15,
      petitions: [
        "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
        "He cogido un resfriado y me siento fatal.",
      ],
    },
    {
      id: "4",
      item: "Poción Contra Fiebre",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Una poción muy eficaz contra fiebre común.",
      price: 15,
      petitions: [
        "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
        "Creo que tengo fiebre... ¿Tienes algo que ayude?",
      ],
    },
    {
      id: "5",
      item: "Poción Contra Miopía",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Mejora la vista del usuario de forma moderada.",
      price: 24,
      petitions: [
        "Creo que me está empeorando la vista, ¿Hay algo que pueda ayudar con eso?",
        "Hoy veo todo muy borroso, no entiendo por qué.",
      ],
    },
    {
      id: "6",
      item: "Poción Contra Maldiciones",
      archetype: ["mage", "merchant"],
      desc: "Envuelve en un resplandor etéreo que actúa como escudo protector contra maldiciones y maleficios a quien lo bebe.",
      price: 29,
      petitions: [
        "Me han echado un mal de ojo.",
        "Creo que tengo una maldición, no dejo de perder mi monedero.",
        "Un conocido se ha cruzado con un hechicero malvado y ha sido transformado en un gusano.",
        "Recientemente, he sentido una energía negativa a mi alrededor y creo que puede ser una maldición. ¿Hay algo que pueda beber para protegerme?",
      ],
    },
    {
      id: "7",
      item: "Poción Somnífera",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Sume al consumidor en un sueño muy profundo. Usar de forma moderada.",
      price: 25,
      petitions: [
        "Últimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
        "Necesito una buena noche de sueño, duermo fatal.",
        "Voy a ir de caza y quiero hacer dardos somníferos.",
      ],
    },
    {
      id: "8",
      item: "Poción Contra Insomnio",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Ayuda al consumidor a dormirse y regular su reloj de sueño.",
      price: 14,
      petitions: [
        "Últimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
        "Necesito una buena noche de sueño, duermo fatal.",
      ],
    },
    {
      id: "9",
      item: "Poción de Resistencia a Sueño",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "El usuario que tome esta poción podrá quedarse despierto una noche entera. Usar de forma moderada.",
      price: 37,
      petitions: [
        "Necesito quedarme una noche sin dormir, tengo muchas cosas que hacer y me falta tiempo.",
        "Hoy voy de misión y no puedo jugarme el quedarme sopa.",
        "He dormido fatal y ahora tengo un sueño horrible, pero tengo muchas cosas que hacer.",
      ],
    },
    {
      id: "10",
      item: "Poción de visión en la oscuridad",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Los ojos del usuario se cubrirán de una capa púrpura semitransparente que cede visión nocturna.",
      price: 42,
      petitions: [
        "Hoy voy de misión a un lugar muy oscuro. No se si voy a poder ver de forma correcta.",
        "Algún graciosillo ha creado una bola de oscuridad en medio de mi casa y no puedo ver.",
        "Voy a ir de caza y necesito poder ver bien a mis objetivos.",
      ],
    },
    {
      id: "11",
      item: "Poción de Sueños Lúcidos",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "El usuario que beba esta poción tendrá más conexión con su subconsciente a la hora de soñar.",
      price: 53,
      petitions: [
        "Me gustaría poder controlar lo que hago en mis sueños.",
        "He hecho un amigo en mis sueños, pero cada vez que intento hablar con él, el sueño cambia.",
      ],
    },
    {
      id: "12",
      item: "Poción de Endurecimiento",
      archetype: ["adventurer", "merchant"],
      desc: "Vuelve la piel de quien la beba muy dura durante varias horas.",
      price: 50,
      petitions: [
        "¿Tienes algo que me dé más armadura o protección?",
        "Necesito un aumento de defensa.",
        "Voy a un sitio peligroso y quiero poder tener más constitución.",
      ],
    },
    {
      id: "13",
      item: "Antídoto de veneno",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Cura casi todos los envenenamientos e intoxicaciones conocidos en el reino.",
      price: 42,
      petitions: [
        "Me han envenenado y necesito algo para contrarrestar los efectos lo antes posible.",
        "Mi compañero de viaje ha sido picado por una serpiente venenosa. ¿Tienes algún antídoto?",
        "He comido algo en mal estado y me siento muy mal. ¿Puede que esté envenenado?",
      ],
    },
    {
      id: "14",
      item: "Poción de Resistencia al Frío",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "El usuario no tendrá frío general mientras que el efecto de esta poción dure.",
      price: 58,
      petitions: [
        "El invierno se acerca y mi casa es muy fría. ¿Tienes algo que pueda remediarlo?",
        "Voy a acampar en una zona muy fría y necesito una forma de mantenernos calientes durante la noche.",
      ],
    },
    {
      id: "15",
      item: "Poción de Resistencia al Calor",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "El usuario no tendrá calor general mientras que el efecto de esta poción dure.",
      price: 58,
      petitions: [
        "Se acerca una ola de calor, y mi casa va a ser un horno.",
        "Voy a participar en una carrera de resistencia en un clima caluroso y no quiero sudar.",
      ],
    },
    {
      id: "16",
      item: "Poción de Agudeza Visual",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Beber esta poción permite al usuario ver más allá de lo que usualmente puede ver.",
      price: 74,
      petitions: [
        "Hoy voy de misión a un lugar muy oscuro. No sé si voy a poder ver de forma correcta.",
        "Hoy veo todo muy borroso, no entiendo por qué.",
        "Voy a ir de caza y necesito poder ver bien a mis objetivos.",
      ],
    },
    {
      id: "17",
      item: "Poción de Burbuja Negativa",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Esta poción envuelve a quien la bebe en una burbuja resistente a ataques mágicos.",
      price: 91,
      petitions: [
        "¿Tienes algo que me dé más armadura o protección mágica?",
        "Recientemente, he sentido una energía negativa a mi alrededor y creo que puede ser una maldición. ¿Hay algo que pueda beber para protegerme?",
      ],
    },
    {
      id: "18",
      item: "Poción de Área de Calor",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Al verter esta poción, emana calor en área.",
      price: 75,
      petitions: [
        "Estamos planeando una reunión al aire libre en una noche fría. ¿Tienes una poción que pueda proporcionar un poco de calor para todos?",
        "El invierno se acerca y mi casa es muy fría. ¿Tienes algo que pueda remediarlo?",
        "Voy a acampar en una zona muy fría y necesito una forma de mantenernos calientes durante la noche.",
      ],
    },
    {
      id: "19",
      item: "Poción de Área de Frío",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Al verter esta poción, emana frío en área.",
      price: 75,
      petitions: [
        "Estamos organizando un evento al aire libre en pleno verano y necesitamos una manera de mantener a todos frescos.",
        "Se acerca una ola de calor, y mi casa va a ser un horno.",
        "Voy a ir a la playa y me voy a llevar helados, pero necesito algo que haga que no se derritan.",
      ],
    },
    {
      id: "20",
      item: "Poción de Amor",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "El calor de esta poción es capaz de convertir una cena normal en una cena romántica.",
      price: 66,
      petitions: [
        "Quiero sorprender a mi pareja con una cena romántica, ¿tienes algo que pueda ayudarme a crear una atmósfera más amorosa?",
        "Me gustaría impresionar a alguien especial con una cena, pero necesito algo que pueda añadir un toque extra de romance.",
      ],
    },
    {
      id: "21",
      item: "Poción de Desamor",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "El frío de esta poción es capaz de convertir un indicio de interés en una quedada incómoda.",
      price: 66,
      petitions: [
        "Recientemente, terminé una relación y necesito algo que me ayude a disipar cualquier rastro de amor residual.",
        "Hay alguien del pueblo que no deja de pedirme salir y no me interesa... Necesito algo para que me deje en paz.",
      ],
    },
    {
      id: "22",
      item: "Poción de Resistencia a Frío Extremo",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "La poción permite que el usuario resista temperaturas frías extremas",
      price: 94,
      petitions: [
        "Voy a emprender un viaje a las regiones más heladas del reino y necesito protegerme del frío extremo.",
      ],
    },
    {
      id: "23",
      item: "Poción de Resistencia a Calor Extremo",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "La poción permite que el usuario resista temperaturas calientes extremas",
      price: 94,
      petitions: [
        "Me aventuraré en el desierto durante días y necesito algo que me proteja del calor abrasador",
      ],
    },
    {
      id: "24",
      item: "Poción Contra Congelación",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Remedio muy efectivo contra congelaciones",
      price: 78,
      petitions: [
        "He tocado algo muy frío y me ha salido una quemadura por congelación.",
      ],
    },
    {
      id: "25",
      item: "Poción Contra Quemaduras",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Remedio muy efectivo contra quemaduras",
      price: 78,
      petitions: [
        "Me he hecho una quemadura mientras cocinaba. ¿Tienes algún remedio?",
      ],
    },
    {
      id: "26",
      item: "Poción de Visión Térmica",
      archetype: ["adventurer", "merchant"],
      desc: "Los ojos del usuario se cubrirán de una capa naranja semitransparente que permite distinguir temperatura por colores",
      price: 108,
      petitions: [
        "Hoy voy de misión a un lugar muy oscuro. No sé si voy a poder ver de forma correcta.",
        "Voy a ir de caza y necesito poder ver bien a mis objetivos.",
      ],
    },
    {
      id: "27",
      item: "Poción de Invisibilidad",
      archetype: ["adventurer", "merchant"],
      desc: "Esparcido sobre la piel, hace que la luz no se refleje sobre el afectado, volviéndolo invisible temporalmente.",
      price: 100,
      petitions: [
        "Voy a colarme en un sitio y no quiero que nadie me vea.",
        "¿Tienes algo para... pasar desapercibido?",
      ],
    },
    {
      id: "28",
      item: "Poción de Ver Invisibilidad",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Los ojos del usuario se cubrirán de una capa azul semitransparente que permite ver siluetas de objetos o criaturas invisibles",
      price: 82,
      petitions: [
        "Necesito una poción para poder ver fantasmas.",
        "¿Tienes algo que me permita ver cosas ocultas?",
      ],
    },
    {
      id: "29",
      item: "Poción Protectora Ocular",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Esta poción endurece los ojos de quien la beba, permitiendo que no reciban daño.",
      price: 106,
      petitions: [
        "Hoy voy a ver un eclipse, es posible que mis ojos reciban daño.",
        "¿Tienes algo que pueda proteger mis ojos?",
      ],
    },
    {
      id: "30",
      item: "Poción Contra Ceguera",
      archetype: ["town", "mage", "adventurer", "merchant"],
      desc: "Esta poción milagrosa puede llegar a curar ceguera si se aplica de forma correcta.",
      price: 86,
      petitions: [
        "He sufrido un accidente que ha dañado gravemente mis ojos y ahora tengo problemas de visión.",
      ],
    },
    {
      id: "31",
      item: "Poción Alucinatoria",
      archetype: ["mage", "merchant"],
      desc: "Cuando alguien se toma esta poción, entra en un estado de trance donde se suelen tener alucinaciones.",
      price: 140,
      petitions: [
        "Estoy buscando una experiencia espiritual más profunda y me preguntaba si tienes alguna poción que pueda inducir alucinaciones controladas",
        "Necesito entrar en trance para poder hablar con las diosas.",
      ],
    },
    {
      id: "32",
      item: "Poción de Restauración Vital",
      archetype: ["mage", "merchant"],
      desc: "Envuelve y restaura la energía del ánima del usuario que bebe la poción.",
      price: 125,
      petitions: [
        "He perdido muchísima energía mágica. ¿Tienes algo que pueda reponerla?",
      ],
    },
    {
      id: "33",
      item: "Poción de Sueños Premonitorios",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Se ha registrado que tomar esta poción invoca tener sueños premonitorios,",
      price: 111,
      petitions: [
        "Estoy tratando de obtener información sobre un posible peligro futuro.",
      ],
    },
    {
      id: "34",
      item: "Poción de Rejuvenización Vegetal",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Esta poción es un excelente abono, y revive la mayoría de las plantas que se marchitan.",
      price: 133,
      petitions: [
        "Algunas de mis plantas están marchitándose y necesito revivirlas.",
        "Una plaga ha marchitado mi jardín y no se que hacer.",
      ],
    },
    {
      id: "35",
      item: "Poción de Aliento de Fuego",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "En cuanto esta poción se bebe, el consumidor escupirá una ráfaga de fuego por la boca.",
      price: 139,
      petitions: [
        "Estoy preparándome para una batalla épica y me gustaría poder lanzar fuego como un dragón.",
        "¿Tienes algo que pueda hacerme parecer un dragón?",
      ],
    },
    {
      id: "36",
      item: "Poción de Aliento de Hielo",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "En cuanto esta poción se bebe, el consumidor escupirá una ráfaga de hielo por la boca.",
      price: 139,
      petitions: [
        "Quiero añadir un toque gélido a mis habilidades de combate. ¿Tienes alguna poción que me permita lanzar ráfagas de hielo?",
      ],
    },
    {
      id: "37",
      item: "Poción de Detectar Magia",
      archetype: ["mage", "adventurer", "merchant"],
      desc: "Una vez tomada esta poción, el usuario verá un contorno leve alrededor de todo lo que sea mágico y esté cerca de él.",
      price: 160,
      petitions: [
        "Sospecho que hay fuerzas mágicas en juego a mi alrededor. ¿Tienes alguna poción que pueda ayudarme a detectar la magia cercana?",
        "He perdido mi amuleto protector. Debería de ser capaz de encontrarlo si tienes algo que me permita buscar magia.",
      ],
    },
    {
      id: "38",
      item: "Poción extraña",
      archetype: ["wildcard"],
      desc: "No tienes claro que hace esta poción...pero no te la tomarías.",
      price: 40,
      petitions: [
        "Aún vendes pociones, ¿Verdad? ¿Hay alguna que no uses? Puedo quedármela.",
      ],
    },
  ];
  
var upgradesData = [
    {
      id: "hasPetalos",
      imgroute: "public/assets/garden/i2.png",
      title: "Flor de Luna",
      text: "Se dice que sus pétalos fueron bendecidos por la diosa de los sueños. <br> Comprar este ingrediente lo añade al jardín. Tarda 5 segundos en crecer una vez se recoge.",
      price: 25,
    }, //25
    {
      id: "hasRaices",
      imgroute: "public/assets/garden//i3.png",
      title: "Raíces de Piedra",
      text: "Pequeñas raíces conocidas por sus propiedades de endurecimiento. <br> Comprar este ingrediente lo añade al jardín. Tarda 15 segundos en crecer una vez se recoge.",
      price: 150,
    }, //150
    {
      id: "hasPolen",
      imgroute: "public/assets/garden//i4.png",
      title: "Flores Vulcano",
      text: "Una flor que produce polen de dos tipos, relacionado de forma común con la temperatura. <br> Comprar este ingrediente lo añade al jardín. Tarda 30 segundos en crecer una vez se recoge. Se añade un interruptor para cosechar un polen u otro.",
      price: 275,
    }, //275
    {
      id: "hasAurora",
      imgroute: "public/assets/garden//i56.png",
      title: "Frutos de Aurora",
      text: "Un fruto escaso por su difícil y costosa germinación. Podrás cosechar sus hojas o el fruto entero. <br> Comprar este ingrediente lo añade al jardín. Las hojas tardan 45 segundos en crecer una vez se recogen, y si se recoge el fruto entero, 60 segundos. Se añade un interruptor para cosechar un las hojas o los frutos enteros.",
      price: 400,
    }, //400
  ];
  
const recetas = {
    "i1,i1,i1": 1,
    "i1,i1,i2": 2,
    "i1,i1,i4a": 3,
    "i1,i1,i4b": 4,
    "i1,i1,i5": 5,
    "i1,i1,i6": 6,
    "i2,i2,i2": 7,
    "i1,i2,i2": 8,
    "i2,i2,i3": 9,
    "i2,i2,i5": 10,
    "i2,i2,i6": 11,
    "i3,i3,i3": 12,
    "i1,i3,i3": 13,
    "i3,i3,i4a": 14,
    "i3,i3,i4b": 15,
    "i3,i3,i5": 16,
    "i3,i3,i6": 17,
    "i4a,i4a,i4a": 18,
    "i4b,i4b,i4b": 19,
    "i2,i4a,i4a": 20,
    "i2,i4b,i4b": 21,
    "i3,i4a,i4a": 22,
    "i3,i4b,i4b": 23,
    "i1,i4a,i4a": 24,
    "i1,i4b,i4b": 25,
    "i1,i4a,i5": 26,
    "i1,i4a,i5": 26,
    "i1,i4b,i5": 26,
    "i5,i5,i5": 27,
    "i2,i5,i5": 28,
    "i3,i5,i5": 29,
    "i1,i5,i5": 30,
    "i5,i5,i6": 31,
    "i6,i6,i6": 32,
    "i2,i6,i6": 33,
    "i3,i6,i6": 34,
    "i4a,i6,i6": 35,
    "i4b,i6,i6": 36,
    "i5,i6,i6": 37,
  };

var listenerjardin = function () {
  changeScreen(1);
};
var listenermostrador = function () {
  changeScreen(2);
};
var listenertrastienda = function () {
  changeScreen(3);
};
var listenerrecetario = function () {
  changeScreen(4);
};
var listenerajustes = function () {
  changeScreen(5);
};

var title = document.getElementById("title");
var texttitle = document.getElementById("texttitle");
var box = document.getElementById("box");
var boxP = document.getElementById("boxP");
var boxContinueText = document.getElementById("continuetext");
var textbox = document.getElementById("textbox");
var screen = document.getElementById("screen");
var boxButtons = document.getElementById("boxButtons");
var talkButtons = document.getElementById("talkbuttons");
var bJardin = document.getElementById("bJardin");
var bMostrador = document.getElementById("bMostrador");
var bTrastienda = document.getElementById("bTrastienda");
var bRecetario = document.getElementById("bRecetario");
var bAjustes = document.getElementById("bAjustes");
var goldmeter = document.getElementById("goldmeter");
var togglerPolen = document.getElementById("togglerpolen");
var togglerAurora = document.getElementById("toggleraurora");
var tinycupboard = document.getElementById("tinycupboard");
var chosendiv = document.getElementById("chosen");
var chosen1 = document.getElementById("chosen1");
var chosen2 = document.getElementById("chosen2");
var chosen3 = document.getElementById("chosen3");
var createPotionButton = document.getElementById("createbutton");
var crop1 = document.getElementById("i1");
var crop2 = document.getElementById("i2");
var crop3 = document.getElementById("i3");
var crop4 = document.getElementById("i4");
var crop56 = document.getElementById("i56");
var backshop1 = document.getElementById("backshop1");
var backshop2 = document.getElementById("backshop2");
var backshop3 = document.getElementById("backshop3");
var opt1button = document.getElementById("opt1");
var opt2button = document.getElementById("opt2");
var opt3button = document.getElementById("opt3");
var opt4button = document.getElementById("opt4");
var settings = document.getElementById("settings");
var talkTobutton = document.getElementById("talkToButton");

changeScreen(2);
activarMenuLateral();
cargarDesdeLocalStorage();
goldmeter.innerHTML = "Oro: " + progress.gold;
if (areObjectsEmpty(currentInv, progress, emptyInventory, emptyprogress)) {
  setTimeout(function () {
    tutorial();
  }, 5000);
}
const clientela = setInterval(summonClient, 5000);

function tutorial() {
  guaranteedPotions = 5;
  //Crear Michael
  console.log("Summon Success!");
  if (audioactive) {
    var audio = new Audio("public/assets/ding.mp3");
    audio.play();
  }
  var clientElement = createMichael();
  screen.appendChild(clientElement);
  hasClient = true;
  squashAndRestore();
  texttitle.innerHTML = "Hay alguien en tu tienda";
  texttitle.classList.add("alert");
  setTimeout(function () {
    texttitle.classList.remove("alert");
  }, 500);
}

//#endregion

//#region CLIENT FUNCTIONS
/**
 * summonClient : Si no hay un cliente ya, tiene un 50% de posibilidades de generar un cliente. Si se genera, se redirige a CreateClient y se aplica el efecto de alarma.
 * createClient : Crea y devuelve un elemento client con la clase Client, id "currentClient" y onclick que lleva a clientActions.
 *                Si el jugador no está en el mostrador se muestra oculto. Se le da el id "CurrentClient".
 *                Se selecciona un número aleatorio para dar la información de la lista de townsfolk mientras no sea el último que ha venido.
 * clientActions : Llama a desactivarMenuLateral y elimina el onclick del cliente, carga el nombre de el cliente y su saludo.
 *                 Espera a que el usuario haga click para continuar.
 *                 Llama a clientPetition y vuelve a esperar, para luego llamar a toggleClientOptions.
 * clientPetition: Obtiene que objetos puede pedir un cliente por su tipo de cliente en la lista items.
 *                 Selecciona de forma aleatoria uno de esos objetos.
 *                 Selecciona de forma aleatoria una de las posibles formas de pedir dicho objeto.
 *                 Guarda en matching items los items que pueden responder a la petición seleccionada.
 * toggleClientOptions: Oculta BoxP y muestra los botones de acción, que llevan a openInvFromClient, TalkToClient y deleteClient respectivamente.
 * openInvFromClient: Cambia la pantalla usando changeScreen a el almacen, muestra BoxP de nuevo y oculta los botones de toggleClientOptions. Se le añade la clase screenalmacen a la pantalla.
 *                    Se filtran los Items cuya cantidad sea mayor que cero.
 *                    Se crea un cuadrado con la info de cada item que se ha filtrado y se acopla a la pantalla.
 *                    Cada cuadrado manda a selectItemFromInvClient.
 * selectItemFromInvClient: Muestra la información del objeto seleccionado en la caja de texto y muestra el botón que va a sellItem.
 * sellItem: Cambia al mostrador, oculta botones de cliente y de continuar, y elimina los elementos square creados en openInvFromClient.
 *           Comprueba si el item seleccionado se encuentra en los matchingitems de clientPetition. Si está, se suma el oro al jugador y se resta el objeto del inventario.
 *           Si no, no se suma el oro ni se resta. Llamada a DeleteItem despues de esperar a click.
 * deleteClient: Elimina el cliente de la tienda y reinicia la caja de texto.
 */
function summonClient() {
  if (!hasClient) {
    console.log("Trying to summon Client...");
    if (Math.random() > 0.5) {
      console.log("Summon Success!");
      if (audioactive) {
        var audio = new Audio("public/assets/ding.mp3");
        audio.play();
      }
      var clientElement = createClient();
      screen.appendChild(clientElement);
      hasClient = true;
      squashAndRestore();
      texttitle.innerHTML = "Hay alguien en tu tienda";
      texttitle.classList.add("alert");
      setTimeout(function () {
        texttitle.classList.remove("alert");
      }, 500);
    } else {
      console.log("Summon failed.");
    }
  } else {
    console.log("There is a Client already.");
  }
}

function createClient() {
  //crear elemento
  var clientElement = document.createElement("Client");

  //classlist
  clientElement.classList.add("client");

  if (title.innerHTML != "Mostrador") {
    clientElement.classList.add("hidden");
    talkTobutton.classList.add("hidden");
  } else {
    talkTobutton.classList.remove("hidden");
  }
  talkTobutton.setAttribute("onclick", "clientActions(event)");
  //attributes
  clientElement.setAttribute("id", "currentClient");
  clientElement.setAttribute("onclick", "clientActions()");

  var randomint = lastClient;
  while (randomint == lastClient || (guaranteedPotions>0 && randomint==19)) {
    randomint = Math.floor(Math.random() * 20);
    console.log(randomint);
  }
  clientElement.style.backgroundImage =
    'url("public/assets/town/' + randomint + '.png")';
  clientObj = townsfolk[randomint];
  lastClient = randomint;
  return clientElement;
}

function createMichael() {
  //crear elemento
  var clientElement = document.createElement("Client");

  //classlist
  clientElement.classList.add("client");
  if (title.innerHTML != "Mostrador") {
    clientElement.classList.add("hidden");
    talkTobutton.classList.add("hidden");
  } else {
    talkTobutton.classList.remove("hidden");
  }
  talkTobutton.setAttribute("onclick", "michaelActions(event)");
  //attributes
  clientElement.setAttribute("id", "currentClient");
  clientElement.setAttribute("onclick", "michaelActions()");
  clientElement.style.backgroundImage =
    'url("public/assets/town/' + 19 + '.png")';
  clientObj = townsfolk[19];
  lastClient = 19;
  return clientElement;
}

async function michaelActions(e = null) {
  if (e != null) {
    e.stopPropagation();
  }
  desactivarMenuLateral();
  talkTobutton.removeAttribute("onclick");
  talkTobutton.classList.add("hidden");
  var client = document.getElementById("currentClient");
  client.removeAttribute("onclick");
  squashAndRestore();
  texttitle.innerHTML = clientObj.name;
  boxP.innerHTML = "Buenos dias, herborista. ¿Te has asentado bien?";
  await waitForClick();
  boxP.innerHTML =
    "Me alegro, me alegro. Escucha, vas a tener mucho trabajo dentro de poco.";
  await waitForClick();
  boxP.innerHTML =
    "¿Recuerdas como se hacen las pociones? Tus padres han hecho un buen trabajo enseñandote.";
  await waitForClick();
  boxP.innerHTML =
    "Vas al jardín, coges ingredientes, vas a tu trastienda y en la mesa de alquimia haces combinaciones para crear pociones nuevas.";
  await waitForClick();
  boxP.innerHTML =
    "Y luego vendes las pociones en el mostrador, y vuelta a empezar.";
  await waitForClick();
  boxP.innerHTML =
    "Cuando crees una poción su receta se te añade al recetario, donde puedes crear las pociones de forma instantánea siempre que tengas sus ingredientes.";
  await waitForClick();
  boxP.innerHTML =
    "Puedes ver lo que tienes en el almacén en la trastienda, y ver que mejoras puedes comprarte en el tablón de mejoras.";
  await waitForClick();
  boxP.innerHTML = "¿Qué como sé todo esto?";
  await waitForClick();
  boxP.innerHTML = "Jaja, no es importante.";
  await waitForClick();
  boxP.innerHTML = "Ten una buena jornada, herborista.";
  await waitForClick();
  deleteClient();
  guaranteedPotions = 5;
}

async function clientActions(e = null) {
  if (e != null) {
    e.stopPropagation();
  }
  interacted = true;
  desactivarMenuLateral();
  talkTobutton.classList.add("hidden");
  talkTobutton.removeAttribute("onclick");
  var client = document.getElementById("currentClient");
  client.removeAttribute("onclick");
  squashAndRestore();
  texttitle.innerHTML = clientObj.name;
  boxP.innerHTML = clientObj.greeting;

  await waitForClick();
  clientPetition();
  await waitForClick();
  toggleClientOptions();
}

function talkToClient() {
  desactivarMenuLateral();
  boxButtons.classList.add("hidden");
  toggleDialogs();
}

async function talk1() {
  desactivarMenuLateral();
  talkButtons.classList.add("hidden");
  boxP.classList.remove("hidden");
  boxP.innerHTML = targetPetition;
  await waitForClick();
  await waitForClick();
  toggleClientOptions();
}
async function talk2() {
  desactivarMenuLateral();
  talkButtons.classList.add("hidden");
  boxP.classList.remove("hidden");
  var randomNumber = Math.floor(Math.random() * 5);
  boxP.innerHTML = clientObj.dialogs[randomNumber];
  await waitForClick();
  await waitForClick();
  toggleClientOptions();
}

function clientPetition() {
  if (guaranteedPotions == 0) {
    if (Math.random() == 0.1) {
      var specialReq = clientObj.specialReq;
      boxP.innerHTML = specialReq.petition;
      targetPetition = specialReq.petition;
      matchingItems = specialReq.expectedItem;
      if (specialReq.quantity == "all") {
        all = true;
        multiplier = 1;
      } else {
        all = false;
        multiplier = specialReq.quantity;
      }
    } else {
      all = false;
      multiplier = 1;
      //ver que objetos puede pedir por su tipo
      var objetosPedibles = items.filter((item) =>
        item.archetype.includes(clientObj.type)
      );
      //pick random item
      var targetItem =
        objetosPedibles[Math.floor(Math.random() * objetosPedibles.length)];
      //pick random petition
      targetPetition =
        targetItem.petitions[
          Math.floor(Math.random() * targetItem.petitions.length)
        ];
      boxP.innerHTML = targetPetition;
      //filter objects that can be given to client with that petition too
      matchingItems = items
        .filter((item) => item.petitions.includes(targetPetition))
        .filter((item) => item.archetype.includes(clientObj.type));
    }
  } else {
    all = false;
    multiplier = 1;
    var objetosPedibles = items.filter((item) => item.id == 1);
    var targetItem =
      objetosPedibles[Math.floor(Math.random() * objetosPedibles.length)];
    //pick random petition
    targetPetition =
      targetItem.petitions[
        Math.floor(Math.random() * targetItem.petitions.length)
      ];
    boxP.innerHTML = targetPetition;
    //filter objects that can be given to client with that petition too
    matchingItems = items
      .filter((item) => item.petitions.includes(targetPetition))
      .filter((item) => item.archetype.includes(clientObj.type));
    guaranteedPotions--;
  }
}

function toggleClientOptions() {
  activarMenuLateral();
  texttitle.innerHTML = clientObj.name;
  boxP.classList.add("hidden");
  boxButtons.classList.remove("hidden");
}

function toggleDialogs() {
  desactivarMenuLateral();
  boxP.classList.add("hidden");
  talkButtons.classList.remove("hidden");
}

function openInvFromClient() {
  desactivarMenuLateral();
  changeScreen(6);
  boxP.classList.remove("hidden");
  boxP.innerHTML = "...";
  boxButtons.classList.add("hidden");
  screen.classList.add("screenalmacen");

  inventory = items.filter((item) => {
    if (currentInv[item.id] > 0) {
      return item;
    }
  });

  if (inventory.length == 0) {
    changeScreen(2);
    alert(
      "Tu almacén está vacio. ¡Crea pociones o recoge ingredientes para llenarlo!"
    );
    toggleClientOptions();
  } else {
    inventory.forEach((item) => {
      var square = document.createElement("itemsquare");
      square.classList.add("itemsquare");
      square.setAttribute("item-id", item.id);

      var c = document.createElement("p");
      c.innerHTML = currentInv[item.id];

      var squareimg = document.createElement("img");
      squareimg.setAttribute("src", "public/assets/items/" + item.id + ".png");

      square.appendChild(c);
      square.appendChild(squareimg);

      // Función para manejar el evento de clic en el square
      function handleClick() {
        selectItemFromInvClient(item.id);
      }

      // Asignar la misma función al square y a la imagen
      square.addEventListener("click", handleClick);
      squareimg.addEventListener("click", handleClick);

      screen.appendChild(square);
    });
  }
}

function selectItemFromInvClient(id) {
  selectedItem = items.find((item) => item.id === id);
  boxP.innerHTML =
    selectedItem.item +
    " - Precio: " +
    selectedItem.price +
    " de oro." +
    " <hr> " +
    selectedItem.desc;
  if (opt4button.classList.contains("hidden")) {
    opt4button.classList.remove("hidden");
  }
}

async function sellItem(item) {
  desactivarMenuLateral();
  // Cambia a mostrador
  changeScreen(2);

  // Quitar botones de todas clases y event listener
  opt4button.classList.add("hidden");
  boxButtons.classList.add("hidden");

  // Quitar items
  itemsquares = document.getElementsByTagName("itemsquare");
  while (itemsquares[0]) itemsquares[0].parentNode.removeChild(itemsquares[0]);

  if (boxP.classList.contains("hidden")) {
    boxP.classList.remove("hidden");
  }

  // Comprobar si está bien
  if (matchingItems.includes(item) || matchingItems.includes(item.id)) {
    // Sumar oro
    if (all) {
      progress.gold += item.price * currentInv[item.id];
      currentInv[item.id] = 0;
    } else {
      progress.gold += item.price * multiplier;
      currentInv[item.id] -= 1 * multiplier;
    }
    goldmeter.innerHTML = "Oro: " + progress.gold;

    // Responder
    respuestas = [
      "¡Perfecto! Justo lo que necesito. ¡Hasta luego!",
      "¡Muchas gracias! Ya nos veremos.",
      "Muchas gracias, nos vemos pronto.",
      "¡Genial! Aquí tienes tu pago. ¡Adiós!",
      "¡Estupendo! Es lo que buscaba. ¡Ten un buen día!",
    ];
    int = indiceAleatorio = Math.floor(Math.random() * respuestas.length);
    boxP.innerHTML = respuestas[int];

    await waitForClick();
  } else {
    // Responder
    respuestas = [
      "Creo que esto no me sirve... Ya volveré en otro momento.",
      "No, creo que no es lo que te he pedido. Bueno, pasa un buen día.",
      "¿Esto? Pero esto no sirve... Me voy, hasta más ver.",
      "Creo que te has equivocado... Lo siento, tengo que irme.",
      "Es una broma, ¿no? Tengo prisa, ya volveré.",
    ];
    int = indiceAleatorio = Math.floor(Math.random() * respuestas.length);
    boxP.innerHTML = respuestas[int];

    await waitForClick();
  }

  await waitForClick();
  // Se va
  deleteClient();
}

function deleteClient() {
  interacted = false;
  var client = document.getElementById("currentClient");
  if (client != null) {
    client.remove();
  }
  hasClient = false;
  if (!boxButtons.classList.contains("hidden")) {
    boxButtons.classList.add("hidden");
  }
  if (boxP.classList.contains("hidden")) {
    boxP.classList.remove("hidden");
  }
  texttitle.innerHTML = "No hay nadie en tu tienda";
  boxP.innerHTML = "...";
  activarMenuLateral();
}
//#endregion

//#region GARDEN FUNCTIONS
function loadGarden() {
  if (progress.hasPolen) {
    togglerPolen.classList.remove("hidden");
  }
  if (progress.hasAurora) {
    togglerAurora.classList.remove("hidden");
  }

  crop1.classList.remove("hiddencrops");
  crop1.setAttribute("onclick", "harvest('i1','i1')");
  if (progress.hasPetalos) {
    crop2.classList.remove("hiddencrops");
    crop2.setAttribute("onclick", "harvest('i2','i2')");
  }
  if (progress.hasRaices) {
    crop3.classList.remove("hiddencrops");
    crop3.setAttribute("onclick", "harvest('i3','i3')");
  }
  if (progress.hasPolen) {
    crop4.classList.remove("hiddencrops");
    if (polentype == 1) {
      crop4.setAttribute("onclick", "harvest('i4a','i4')");
    } else {
      crop4.setAttribute("onclick", "harvest('i4b','i4')");
    }
  }
  if (progress.hasAurora) {
    crop56.classList.remove("hiddencrops");
    if (aurorapart == 1) {
      crop56.setAttribute("onclick", "harvest('i5','i56')");
    } else {
      crop56.setAttribute("onclick", "harvest('i6','i56')");
    }
  }
}

function harvest(id, elemid) {
  var currentTime = new Date().getTime();
  var cooldown = cooldowns[id];

  if (
    cooldown &&
    lastHarvestTime[id] &&
    currentTime - lastHarvestTime[id] < cooldown * 1000
  ) {
    return;
  }
  textFloat(id);
  if (elemid == "i4") {
    cooldownPolen = true;
  }
  if (elemid == "i56") {
    cooldownAurora = true;
  }

  currentInv[id]++;
  lastHarvestTime[id] = currentTime;

  var cropElement = document.getElementById(elemid);
  if (elemid == "i1") {
    cropElement.classList.add("cooldown1");
    cropElement.style.animationDuration = 0.5 + "s";
  } else {
    cropElement.classList.add("cooldown");
    cropElement.style.animationDuration = cooldown + "s";
  }

  var elemClick = cropElement.getAttribute("onclick");
  cropElement.removeAttribute("onclick");
  setTimeout(() => {
    if (elemid == "i4") {
      cooldownPolen = false;
    }
    if (elemid == "i56") {
      cooldownAurora = false;
    }
    cropElement.classList.remove("cooldown1");
    cropElement.classList.remove("cooldown");
    cropElement.setAttribute("onclick", elemClick);
  }, cooldown * 1000);
}

function togglePolen() {
  if (cooldownPolen) {
    return;
  }
  if (polentype === 1) {
    polentype = 2;
    togglerPolen.style.backgroundPosition = "right";
    togglerPolen.innerHTML = "Recogiendo Polen Vulcano Durmiente";
    crop4.removeAttribute("onclick");
    crop4.setAttribute("onclick", "harvest('i4b','i4')");
  } else {
    polentype = 1;
    togglerPolen.style.backgroundPosition = "left";
    togglerPolen.innerHTML = "Recogiendo Polen Vulcano Activo";
    crop4.removeAttribute("onclick");
    crop4.setAttribute("onclick", "harvest('i4a','i4')");
  }
}

function toggleAurora() {
  if (cooldownAurora) {
    return;
  }
  if (aurorapart === 1) {
    aurorapart = 2;
    togglerAurora.style.backgroundPosition = "right";
    togglerAurora.innerHTML = "Recogiendo Frutos de Aurora";
    crop56.removeAttribute("onclick");
    crop56.setAttribute("onclick", "harvest('i6','i56')");
  } else {
    aurorapart = 1;
    togglerAurora.style.backgroundPosition = "left";
    togglerAurora.innerHTML = "Recogiendo Hojas de Aurora";
    crop56.removeAttribute("onclick");
    crop56.setAttribute("onclick", "harvest('i5','i56')");
  }
}

function clearGarden() {
  togglerAurora.classList.add("hidden");
  togglerPolen.classList.add("hidden");
  crop1.classList.add("hiddencrops");
  crop2.classList.add("hiddencrops");
  crop3.classList.add("hiddencrops");
  crop4.classList.add("hiddencrops");
  crop56.classList.add("hiddencrops");
}
//#endregion

//#region BACKSHOP FUNCTIONS
function loadBackshop() {
  backshop1.classList.remove("hidden");
  backshop2.classList.remove("hidden");
  backshop3.classList.remove("hidden");
  backshop3.parentElement.classList.remove("hidden");
}
function clearBackshop() {
  backshop1.classList.add("hidden");
  backshop2.classList.add("hidden");
  backshop3.classList.add("hidden");
  backshop3.parentElement.classList.add("hidden");
}

function openInvFromBackshop() {
  changeScreen(6);

  inventory = items.filter((item) => {
    if (currentInv[item.id] > 0) {
      return item;
    }
  });

  inventory.forEach((item) => {
    var square = document.createElement("itemsquare");
    square.classList.add("itemsquare");
    square.setAttribute("item-id", item.id);
    var c = document.createElement("p");
    c.innerHTML = currentInv[item.id];
    square.appendChild(c);
    var squareimg = document.createElement("img");
    squareimg.setAttribute("src", "public/assets/items/" + item.id + ".png");
    squareimg.setAttribute(
      "onclick",
      'selectItemFromInvBackdrop("' + item.id + '")'
    );
    square.appendChild(squareimg);
    screen.appendChild(square);
  });
}

function selectItemFromInvBackdrop(itemId) {
  selectedItem = items.find((item) => item.id === itemId);
  boxP.innerHTML =
    selectedItem.item +
    " - Precio: " +
    selectedItem.price +
    " de oro." +
    " <hr> " +
    selectedItem.desc;
}

function openUpgrades() {
  changeScreen(7);
  upgradesData.forEach(function (upgrade) {
    if (!progress[upgrade.id]) {
      var upgradesquare = document.createElement("upgradesquare");
      upgradesquare.classList.add("upgrade");

      var squareimg = document.createElement("img");
      squareimg.setAttribute("src", upgrade.imgroute);
      upgradesquare.appendChild(squareimg);

      var textDiv = document.createElement("div");

      var pTitulo = document.createElement("p");
      pTitulo.innerHTML = upgrade.title;
      pTitulo.classList.add("upgradeTitle");

      var pText = document.createElement("p");
      pText.innerHTML = upgrade.text;

      textDiv.appendChild(pTitulo);
      textDiv.appendChild(pText);
      textDiv.classList.add("upgradeText");

      var dButton = document.createElement("div");
      dButton.classList.add("upgradediv");
      var pPrice = document.createElement("p");
      pPrice.innerHTML = "Precio: " + upgrade.price;
      var button = document.createElement("div");
      button.innerHTML = "Comprar";
      button.classList.add("upgradebutton");
      button.setAttribute(
        "onclick",
        'buyUpgrade("' + upgrade.id + '",' + upgradesData.indexOf(upgrade) + ")"
      );
      dButton.appendChild(pPrice);
      dButton.appendChild(button);

      upgradesquare.appendChild(textDiv);
      upgradesquare.appendChild(dButton);

      screen.appendChild(upgradesquare);
    }
  });
}

function buyUpgrade(id, index) {
  if (progress.gold >= upgradesData[index].price) {
    progress[id] = true;
    progress.gold = progress.gold - upgradesData[index].price;
    goldmeter.innerHTML = "Oro: " + progress.gold;
    guardarEnLocalStorage();
  } else {
    alert("No tienes suficiente oro para esta mejora.");
  }
}

function openMagicPot() {
  changeScreen(8);
  tinycupboard.classList.remove("hidden");
  chosendiv.classList.remove("hidden");
  chosen1.classList.remove("hidden");
  chosen2.classList.remove("hidden");
  chosen3.classList.remove("hidden");
  createPotionButton.classList.remove("hidden");

  var ingredients = ["i1", "i2", "i3", "i4a", "i4b", "i5", "i6"];

  inventory = items.filter((item) => {
    if (ingredients.includes(item.id)) {
      if (currentInv[item.id] > 0) {
        return item;
      }
    }
  });
  inventory.forEach((item) => {
    var square = document.createElement("itemsquare");
    square.classList.add("itemsquare");
    square.setAttribute("item-id", item.id);
    var c = document.createElement("p");
    c.innerHTML = currentInv[item.id];
    square.appendChild(c);
    var squareimg = document.createElement("img");
    squareimg.setAttribute("src", "public/assets/items/" + item.id + ".png");
    square.appendChild(squareimg);
    square.setAttribute("quantity", currentInv[item.id]); // Establecer la cantidad inicial

    square.addEventListener("click", function () {
      var clickedItemId = item.id;
      var clickedItemQuantity = parseInt(square.getAttribute("quantity"));

      if (clickedItemQuantity > 0) {
        // Buscar un lugar designado disponible para el artículo seleccionado
        var chosenSlots = [chosen1, chosen2, chosen3];
        var chosenSlot = chosenSlots.find(
          (slot) => slot.getAttribute("item-id") === null
        );

        if (chosenSlot) {
          var image = squareimg.cloneNode(true);
          chosenSlot.appendChild(image);
          chosenSlot.setAttribute("item-id", clickedItemId);

          // Actualizar la cantidad en el itemsquare
          square.setAttribute("quantity", clickedItemQuantity - 1);
          square.childNodes[0].innerHTML = clickedItemQuantity - 1;
        }

        verificarChosen(); // Verificar los lugares designados
      }
    });

    tinycupboard.appendChild(square);
  });
}

function verificarChosen() {
  if (
    chosen1.getAttribute("item-id") !== null &&
    chosen2.getAttribute("item-id") !== null &&
    chosen3.getAttribute("item-id") !== null
  ) {
    createPotionButton.classList.remove("invisible");
  } else {
    createPotionButton.classList.add("invisible");
  }
}

function resetChosenSquares(opt) {
  switch (opt) {
    case 1:
      if (chosen1.getAttribute("item-id") !== null) {
        var itemId = chosen1.getAttribute("item-id");
        var item = items.find(function (item) {
          return item.id === itemId;
        });
        if (item) {
          Array.from(tinycupboard.children).forEach(function (square) {
            if (square.getAttribute("item-id") === itemId) {
              var quantity = parseInt(square.getAttribute("quantity"));
              square.setAttribute("quantity", quantity + 1);
              square.firstChild.innerHTML = quantity + 1;
            }
          });
        }
        chosen1.innerHTML = "";
        chosen1.removeAttribute("item-id");
      }
      break;
    case 2:
      if (chosen2.getAttribute("item-id") !== null) {
        var itemId = chosen2.getAttribute("item-id");
        var item = items.find(function (item) {
          return item.id === itemId;
        });
        if (item) {
          Array.from(tinycupboard.children).forEach(function (square) {
            if (square.getAttribute("item-id") === itemId) {
              var quantity = parseInt(square.getAttribute("quantity"));
              square.setAttribute("quantity", quantity + 1);
              square.firstChild.innerHTML = quantity + 1;
            }
          });
        }
        chosen2.innerHTML = "";
        chosen2.removeAttribute("item-id");
      }
      break;
    case 3:
      if (chosen3.getAttribute("item-id") !== null) {
        var itemId = chosen3.getAttribute("item-id");
        var item = items.find(function (item) {
          return item.id === itemId;
        });
        if (item) {
          Array.from(tinycupboard.children).forEach(function (square) {
            if (square.getAttribute("item-id") === itemId) {
              var quantity = parseInt(square.getAttribute("quantity"));
              square.setAttribute("quantity", quantity + 1);
              square.firstChild.innerHTML = quantity + 1;
            }
          });
        }
        chosen3.innerHTML = "";
        chosen3.removeAttribute("item-id");
      }
      break;
    case 4:
      resetChosenSquares(1);
      resetChosenSquares(2);
      resetChosenSquares(3);
      break;
  }
  verificarChosen();
}

function createPotion() {
  createPotionButton.classList.add("invisible");
  chosenIngredients = []; // Restablecer los ingredientes antes de agregar los nuevos

  // Obtener los ingredientes de los cuadrados chosen y almacenarlos en la variable chosenIngredients
  if (chosen1.getAttribute("item-id") !== null) {
    chosenIngredients.push(chosen1.getAttribute("item-id"));
  }

  if (chosen2.getAttribute("item-id") !== null) {
    chosenIngredients.push(chosen2.getAttribute("item-id"));
  }

  if (chosen3.getAttribute("item-id") !== null) {
    chosenIngredients.push(chosen3.getAttribute("item-id"));
  }

  // Ordenar los ingredientes antes de llamar a la función crearObjeto
  chosenIngredients.sort();
  chosenIngredients.forEach((elem) => {
    currentInv[elem]--;
  });

  combinacionIngredientes = chosenIngredients.join(",");
  if (recetas.hasOwnProperty(combinacionIngredientes)) {
    currentInv[recetas[combinacionIngredientes]]++;
    i = items.find((item) => item.id == recetas[combinacionIngredientes]);
    textFloat(recetas[combinacionIngredientes]);

    if (!progress.recipesUnlocked.includes(recetas[combinacionIngredientes])) {
      progress.recipesUnlocked.push(recetas[combinacionIngredientes]);
    }
  } else {
    currentInv[38]++;
    i = items.find((item) => item.id == "38");
    textFloat("38");
  }
  openMagicPot();
}

function clearMagicPot() {
  tinycupboard.classList.add("hidden");
  chosendiv.classList.add("hidden");
  chosen1.classList.add("hidden");
  chosen2.classList.add("hidden");
  chosen3.classList.add("hidden");
  createPotionButton.classList.add("hidden");
  createPotionButton.classList.add("invisible");
}

function autoPotion(itemid) {
  receta = null;
  for (const clave in recetas) {
    if (recetas[clave] == itemid) {
      receta = clave;
      break;
    }
  }
  var ingredients = receta.split(",");
  var ingredientsneeded = new Map();
  ingredients.forEach((ingredient) => {
    if (ingredientsneeded.has(ingredient)) {
      ingredientsneeded.set(ingredient, ingredientsneeded.get(ingredient) + 1);
    } else {
      ingredientsneeded.set(ingredient, 1);
    }
  });
  if (autoCheckIngredients(ingredientsneeded)) {
    ingredients.forEach((ingredient) => {
      currentInv[ingredient]--;
    });
    currentInv[itemid]++;
    textFloat(itemid);
  }
  changeScreen(4);
}

function autoCheckIngredients(ingredientsneeded) {
  for (const [k, v] of ingredientsneeded) {
    if (currentInv[k] < v) {
      alert("No tienes los ingredientes necesarios para hacer esta poción.");
      return false;
    }
  }
  return true;
}

//#endregion

//#region RECETARIO
function loadRecetas() {
  progress.recipesUnlocked.forEach((itemid) => {
    targetItem = items.find((item) => item.id == itemid);
    //rectangulo
    var recipesquare = document.createElement("recipesquare");
    recipesquare.classList.add("recipe");

    //img
    var squareimg = document.createElement("img");
    squareimg.setAttribute("src", "public/assets/items/" + itemid + ".png");
    recipesquare.appendChild(squareimg);

    //texdiv
    var textDiv = document.createElement("div");
    //name of item
    var pTitulo = document.createElement("p");
    pTitulo.innerHTML = targetItem.item;
    pTitulo.classList.add("recipeTitle");

    //desc
    var pText = document.createElement("p");
    pText.innerHTML = targetItem.desc;

    textDiv.appendChild(pTitulo);
    textDiv.appendChild(pText);
    textDiv.classList.add("recipeText");

    ingredientsstring = obtenerReceta(itemid);

    var pPrice = document.createElement("p");
    pPrice.innerHTML =
      "Precio de Venta: " +
      targetItem.price +
      " de Oro.<br><br>Ingredientes necesarios:<br>" +
      ingredientsstring;
    textDiv.appendChild(pPrice);

    var button = document.createElement("div");
    button.innerHTML = "Crear";
    button.classList.add("recipeButton");
    button.setAttribute("onclick", "autoPotion(" + targetItem.id + ")");

    recipesquare.appendChild(textDiv);
    recipesquare.appendChild(button);

    screen.appendChild(recipesquare);
  });
}

function obtenerReceta(numeroReceta) {
  const receta = Object.entries(recetas).find(
    ([clave, valor]) => valor == numeroReceta
  );

  const ingredientes = receta[0].split(",");
  const contadorIngredientes = {};

  ingredientes.forEach((id) => {
    const nombreIngrediente = items.find((item) => item.id == id).item;
    contadorIngredientes[nombreIngrediente] =
      (contadorIngredientes[nombreIngrediente] || 0) + 1;
  });

  const ingredientesCadena = Object.entries(contadorIngredientes)
    .map(([ingrediente, cantidad]) => {
      const inventario =
        currentInv[items.find((item) => item.item == ingrediente).id];
      return `${cantidad} x ${ingrediente} (Tienes ${inventario})`;
    })
    .join("<br>");
  return ingredientesCadena;
}

//#endregion

//#region CHANGE SCREEN FUNCTIONS
function changeScreen(option) {
  resetChosenSquares(4);
  talkTobutton.classList.add("hidden");
  itemsquares = document.getElementsByTagName("itemsquare");
  while (itemsquares[0]) itemsquares[0].parentNode.removeChild(itemsquares[0]);
  upgradesquares = document.getElementsByTagName("upgradesquare");
  while (upgradesquares[0])
    upgradesquares[0].parentNode.removeChild(upgradesquares[0]);
  recipesquares = document.getElementsByTagName("recipesquare");
  while (recipesquares[0])
    recipesquares[0].parentNode.removeChild(recipesquares[0]);
  boxP.innerHTML = "...";
  boxP.classList.remove("hidden");
  boxButtons.classList.add("hidden");
  settings.classList.add("hidden");
  if (hasClient) {
    texttitle.innerHTML = "Hay alguien en tu tienda";
  }
  clearMagicPot();
  clearBackshop();
  clearGarden();
  clearBackground();
  //clearSettings();
  toggleClient("OFF");
  switch (option) {
    case 1:
      title.innerHTML = "Jardín";
      screen.classList.add("jardin");
      boxP.innerHTML =
        "Haz click en los ingredientes para recoger 1 unidad de ellos. Cada planta tiene su propio tiempo de crecimiento.";
      loadGarden();
      break;
    case 2:
      title.innerHTML = "Mostrador";
      screen.classList.add("mostrador");
      toggleClient("ON");
      if (hasClient) {
        squashAndRestore();
        if (!interacted) {
          talkTobutton.classList.remove("hidden");
        } else {
          toggleClientOptions();
        }
      }
      break;
    case 3:
      title.innerHTML = "Trastienda";
      screen.classList.add("trastienda");
      boxP.innerHTML =
        "En el almacen puedes ver tus objetos. En el tablón de mejoras puedes desbloquear cosas nuevas para tu tienda. En la mesa de alquimia puedes crear pociones con tus ingredientes.";
      loadBackshop();
      break;
    case 4:
      title.innerHTML = "Recetario";
      screen.classList.add("almacen");
      screen.classList.add("screenalmacen");
      loadRecetas();
      break;
    case 5:
      title.innerHTML = "Ajustes";
      loadSettings();
      screen.classList.add("almacen");
      break;
    case 6:
      title.innerHTML = "Almacén";
      screen.classList.add("almacen");
      screen.classList.add("screenalmacen");
      break;
    case 7:
      title.innerHTML = "Tablón de Mejoras";
      screen.classList.add("almacen");
      screen.classList.add("screenalmacen");
      boxP.innerHTML =
        "Puedes desbloquear mejoras para tu tienda comprandolas con el oro de tus ventas.";
      break;
    case 8:
      title.innerHTML = "Mesa de Alquimia";
      screen.classList.add("mesa");
      boxP.innerHTML =
        "Crea pociones haciendo click en los ingredientes que quieres usar. Necesitas 3 ingredientes para crear una poción. Haz click de nuevo en los seleccionados para devolverlos al almacén. 3 Ingredientes diferentes nunca crean pociones estables.";
      break;
  }
}
function clearBackground() {
  screen.classList.remove("jardin");
  screen.classList.remove("mostrador");
  screen.classList.remove("trastienda");
  screen.classList.remove("almacen");
  screen.classList.remove("screenalmacen");
  screen.classList.remove("mesa");
}
function toggleClient(option) {
  if (hasClient) {
    var client = document.getElementById("currentClient");
    switch (option) {
      case "ON":
        client.classList.remove("hidden");
        break;
      case "OFF":
        client.classList.add("hidden");
    }
  }
}
//#endregion

//#region UTILITY FUNCTIONS
function waitForClick() {
  return new Promise((resolve) => {
    function boxClicked() {
      box.removeEventListener("click", boxClicked);
      boxContinueText.classList.remove("pulsing");
      boxContinueText.classList.add("hidden");
      if (hasClient) {
        squashAndRestore();
      }
      resolve();
    }
    boxContinueText.classList.remove("hidden");
    boxContinueText.classList.add("pulsing");
    box.addEventListener("click", boxClicked);
  });
}

function squashAndRestore() {
  var client = document.getElementById("currentClient");
  client.classList.add("client-background-squashed");
  setTimeout(function () {
    client.classList.remove("client-background-squashed");
  }, 100);
}

function desactivarMenuLateral() {
  bJardin.removeEventListener("click", listenerjardin);
  bMostrador.removeEventListener("click", listenermostrador);
  bTrastienda.removeEventListener("click", listenertrastienda);
  bRecetario.removeEventListener("click", listenerrecetario);
  bAjustes.removeEventListener("click", listenerajustes);
}

function activarMenuLateral() {
  bJardin.addEventListener("click", listenerjardin);
  bMostrador.addEventListener("click", listenermostrador);
  bTrastienda.addEventListener("click", listenertrastienda);
  bRecetario.addEventListener("click", listenerrecetario);
  bAjustes.addEventListener("click", listenerajustes);
}

function encodeBase64(data) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

function decodeBase64(encodedData) {
  return JSON.parse(decodeURIComponent(escape(atob(encodedData))));
}

function guardarEnLocalStorage() {
  const encodedCurrentInv = encodeBase64(currentInv);
  const encodedProgress = encodeBase64(progress);

  localStorage.setItem("currentInv", encodedCurrentInv);
  localStorage.setItem("progress", encodedProgress);
}

function cargarDesdeLocalStorage() {
  var storedCurrentInv = localStorage.getItem("currentInv");
  var storedProgress = localStorage.getItem("progress");
  console.log("Cargando...");
  if(storedCurrentInv!="dW5kZWZpbmVk"&&storedCurrentInv!=null){
    currentInv = decodeBase64(storedCurrentInv);
    console.log(currentInv);
  }

  if (storedProgress!="dW5kZWZpbmVk"&&storedCurrentInv!=null) {
    progress = decodeBase64(storedProgress);
    console.log(progress);
  }

  guardarEnLocalStorage();
  guardadoAutomatico = setInterval(guardarEnLocalStorage, 10000);
}

function textFloat(ingredientId) {
  var targetitem = items.filter((item) => item.id == ingredientId);
  const floatingText = document.createElement("div");
  floatingText.className = "floatingText";
  floatingText.textContent = "+1 " + targetitem[0].item;

  // Establecer la posición del texto en el lugar del clic
  floatingText.style.left = `${event.clientX}px`;
  floatingText.style.top = `${event.clientY}px`;

  screen.appendChild(floatingText);

  // Iniciar la animación
  setTimeout(() => {
    floatingText.style.animation = "floatUp 2s forwards";
  }, 10);

  // Eliminar el elemento después de que termine la animación
  floatingText.addEventListener("animationend", () => {
    screen.removeChild(floatingText);
  });
}

function areObjectsEmpty(currentInv, progress, emptyInventory, emptyProgress) {
  function isEqual(obj, emptyObj) {
    return Object.keys(emptyObj).every((key) => obj[key] === emptyObj[key]);
  }

  function isProgressEqual(progress, emptyProgress) {
    return (
      progress.hasPetalos === emptyProgress.hasPetalos &&
      progress.hasRaices === emptyProgress.hasRaices &&
      progress.hasPolen === emptyProgress.hasPolen &&
      progress.hasAurora === emptyProgress.hasAurora &&
      progress.gold === emptyProgress.gold &&
      Array.isArray(progress.recipesUnlocked) &&
      progress.recipesUnlocked.length === emptyProgress.recipesUnlocked.length
    );
  }

  return (
    isEqual(currentInv, emptyInventory) &&
    isProgressEqual(progress, emptyProgress)
  );
}

function toggleAudio() {
  button = document.getElementById("audiobutton");
  if (audioactive) {
    audioactive = false;
    button.innerHTML = "Activar Sonido";
  } else {
    audioactive = true;
    button.innerHTML = "Desactivar Sonido";
  }
}
//#endregion



function loadSettings() {
  if (document.getElementById("settings").classList.contains("hidden")) {
    document.getElementById("settings").classList.remove("hidden");
  } else {
    document.getElementById("settings").classList.add("hidden");
  }
}

function clearSettings() {
  document.getElementById("settings").classList.add("hidden");
}




