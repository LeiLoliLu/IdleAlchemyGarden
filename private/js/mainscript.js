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
var all=false;
var audioactive=true;
var interacted=false;
const cooldowns = {
    'i1': 0.1,  //0.1
    'i2': 5,    //5
    'i3': 5,   //15
    'i4a': 5,  //30
    'i4b': 5,  //30
    'i5': 5,   //45
    'i6': 5    //60
};
var guardadoAutomatico;


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
var boxButtons = document.getElementById("boxButtons")
var talkButtons = document.getElementById("talkbuttons")
var bJardin = document.getElementById("bJardin");
var bMostrador = document.getElementById("bMostrador");
var bTrastienda = document.getElementById("bTrastienda");
var bRecetario = document.getElementById("bRecetario");
var bAjustes = document.getElementById("bAjustes");
var goldmeter = document.getElementById("goldmeter");
var togglerPolen = document.getElementById("togglerpolen");
var togglerAurora = document.getElementById("toggleraurora");
var tinycupboard = document.getElementById('tinycupboard');
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
if(areObjectsEmpty(currentInv,progress,emptycurrentInv,emptyprogress)){
    setTimeout(function () {
        tutorial();
    }, 5000);
}
const clientela = setInterval(summonClient, 5000);

function tutorial(){
    guaranteedPotions = 5;
    //Crear Michael
    console.log("Summon Success!");
    if(audioactive){
        var audio = new Audio('assets/ding.mp3');
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
            if(audioactive){
                var audio = new Audio('assets/ding.mp3');
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
    }else{
        talkTobutton.classList.remove("hidden");
    }
    talkTobutton.setAttribute("onclick","clientActions(event)")
    //attributes
    clientElement.setAttribute("id", "currentClient");
    clientElement.setAttribute("onclick", "clientActions()");

    var randomint = lastClient;
    while (randomint == lastClient) {
        randomint = Math.floor(Math.random() * 20);
        console.log(randomint);
    }
    clientElement.style.backgroundImage='url("assets/town/'+randomint+'.png")';
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
    }else{
        talkTobutton.classList.remove("hidden");
    }
    talkTobutton.setAttribute("onclick","michaelActions(event)");
    //attributes
    clientElement.setAttribute("id", "currentClient");
    clientElement.setAttribute("onclick", 'michaelActions()');
    clientElement.style.backgroundImage='url("assets/town/'+19+'.png")';
    clientObj = townsfolk[19];
    lastClient = 19;
    return clientElement;
}

async function michaelActions(e = null){
    if(e!=null){
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
    boxP.innerHTML = "Me alegro, me alegro. Escucha, vas a tener mucho trabajo dentro de poco.";
    await waitForClick();
    boxP.innerHTML = "¿Recuerdas como se hacen las pociones? Tus padres han hecho un buen trabajo enseñandote.";
    await waitForClick();
    boxP.innerHTML = "Vas al jardín, coges ingredientes, vas a tu trastienda y en la mesa de alquimia haces combinaciones para crear pociones nuevas.";
    await waitForClick();
    boxP.innerHTML = "Y luego vendes las pociones en el mostrador, y vuelta a empezar.";
    await waitForClick();
    boxP.innerHTML = "Cuando crees una poción su receta se te añade al recetario, donde puedes crear las pociones de forma instantánea siempre que tengas sus ingredientes.";
    await waitForClick();
    boxP.innerHTML = "Puedes ver lo que tienes en el almacén en la trastienda, y ver que mejoras puedes comprarte en el tablón de mejoras.";
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

async function clientActions(e = null){
    if(e!=null){
        e.stopPropagation();
    }
    interacted = true;
    desactivarMenuLateral();
    talkTobutton.classList.add("hidden");
    talkTobutton.removeAttribute("onclick");
    var client = document.getElementById("currentClient");
    client.removeAttribute("onclick");
    squashAndRestore()
    texttitle.innerHTML = clientObj.name;
    boxP.innerHTML = clientObj.greeting;

    await waitForClick();
    clientPetition();
    await waitForClick();
    toggleClientOptions();
}

function talkToClient(){
    desactivarMenuLateral();
    boxButtons.classList.add("hidden");
    toggleDialogs();
}

async function talk1(){
    desactivarMenuLateral();
    talkButtons.classList.add("hidden");
    boxP.classList.remove('hidden');
    boxP.innerHTML=targetPetition;
    await waitForClick();
    await waitForClick();
    toggleClientOptions();
}
async function talk2(){
    desactivarMenuLateral();
    talkButtons.classList.add("hidden");
    boxP.classList.remove('hidden');
    var randomNumber = Math.floor(Math.random() * 5);
    boxP.innerHTML= clientObj.dialogs[randomNumber];
    await waitForClick();
    await waitForClick();
    toggleClientOptions();
}

function clientPetition() {
    if(guaranteedPotions==0){
    if (Math.random() == 0.1){
        var specialReq = clientObj.specialReq;
        boxP.innerHTML = specialReq.petition;
        targetPetition = specialReq.petition;
        matchingItems = specialReq.expectedItem;
        if(specialReq.quantity=="all"){
            all = true;
            multiplier = 1;
        }else{
            all = false;
            multiplier = specialReq.quantity;
        }
    }else{
    all = false;
    multiplier=1;
    //ver que objetos puede pedir por su tipo
    var objetosPedibles = items.filter(item => item.archetype.includes(clientObj.type));
    //pick random item
    var targetItem = objetosPedibles[Math.floor(Math.random() * objetosPedibles.length)];
    //pick random petition
    targetPetition = targetItem.petitions[Math.floor(Math.random() * targetItem.petitions.length)];
    boxP.innerHTML = targetPetition;
    //filter objects that can be given to client with that petition too
    matchingItems = items.filter(item => item.petitions.includes(targetPetition)).filter(item => item.archetype.includes(clientObj.type));
    }
}else{
    all = false;
    multiplier=1;
        var objetosPedibles = items.filter(item => item.id == 1);
        var targetItem = objetosPedibles[Math.floor(Math.random() * objetosPedibles.length)];
        //pick random petition
        targetPetition = targetItem.petitions[Math.floor(Math.random() * targetItem.petitions.length)];
        boxP.innerHTML = targetPetition;
        //filter objects that can be given to client with that petition too
        matchingItems = items.filter(item => item.petitions.includes(targetPetition)).filter(item => item.archetype.includes(clientObj.type));
        guaranteedPotions--;
}
}

function toggleClientOptions() {
    activarMenuLateral();
    texttitle.innerHTML = clientObj.name;
    boxP.classList.add("hidden");
    boxButtons.classList.remove("hidden");
}

function toggleDialogs(){
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

    inventory = items.filter(item => {
        if (currentInv[item.id] > 0) {
            return item;
        }
    });

    if(inventory.length==0){
        changeScreen(2);
        alert("Tu almacén está vacio. ¡Crea pociones o recoge ingredientes para llenarlo!");
        toggleClientOptions();
    }else{
    inventory.forEach(item => {
        var square = document.createElement('itemsquare');
        square.classList.add('itemsquare');
        square.setAttribute('item-id', item.id);
        
        var c = document.createElement('p');
        c.innerHTML = currentInv[item.id];
        
        var squareimg = document.createElement('img');
        squareimg.setAttribute('src', 'assets/items/' + item.id + '.png');
        
        square.appendChild(c);
        square.appendChild(squareimg);
        
        // Función para manejar el evento de clic en el square
        function handleClick() {
            selectItemFromInvClient(item.id);
        }
        
        // Asignar la misma función al square y a la imagen
        square.addEventListener('click', handleClick);
        squareimg.addEventListener('click', handleClick);
        
        screen.appendChild(square);
    });
    }
}

function selectItemFromInvClient(id) {
    selectedItem = items.find(item => item.id === id);
    boxP.innerHTML = selectedItem.item + " - Precio: " + selectedItem.price + " de oro." + " <hr> " + selectedItem.desc;
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
    if (matchingItems.includes(item)||matchingItems.includes(item.id)) {
        // Sumar oro
        if(all){
            progress.gold += item.price*currentInv[item.id];
            currentInv[item.id] = 0;
        }else{
        progress.gold += item.price*multiplier;
        currentInv[item.id] -= 1*multiplier;
        }
        goldmeter.innerHTML = "Oro: " + progress.gold;

        // Responder
        respuestas = [
            "¡Perfecto! Justo lo que necesito. ¡Hasta luego!",
            "¡Muchas gracias! Ya nos veremos.",
            "Muchas gracias, nos vemos pronto.",
            "¡Genial! Aquí tienes tu pago. ¡Adiós!",
            "¡Estupendo! Es lo que buscaba. ¡Ten un buen día!"
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
            "Es una broma, ¿no? Tengo prisa, ya volveré."
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
    if (progress.hasPolen) { togglerPolen.classList.remove("hidden"); }
    if (progress.hasAurora) { togglerAurora.classList.remove("hidden"); }

    crop1.classList.remove("hiddencrops");
    crop1.setAttribute('onclick', "harvest('i1','i1')");
    if (progress.hasPetalos) {
        crop2.classList.remove("hiddencrops");
        crop2.setAttribute('onclick', "harvest('i2','i2')");
    }
    if (progress.hasRaices) {
        crop3.classList.remove("hiddencrops");
        crop3.setAttribute('onclick', "harvest('i3','i3')");
    }
    if (progress.hasPolen) {
        crop4.classList.remove("hiddencrops");
        if (polentype == 1) {
            crop4.setAttribute('onclick', "harvest('i4a','i4')");
        } else {
            crop4.setAttribute('onclick', "harvest('i4b','i4')");
        }
    }
    if (progress.hasAurora) {
        crop56.classList.remove("hiddencrops");
        if (aurorapart == 1) {
            crop56.setAttribute('onclick', "harvest('i5','i56')");
        } else {
            crop56.setAttribute('onclick', "harvest('i6','i56')");
        }
    }
}


function harvest(id, elemid) {
    var currentTime = new Date().getTime();
    var cooldown = cooldowns[id];

    if (cooldown && lastHarvestTime[id] && (currentTime - lastHarvestTime[id]) < cooldown * 1000) {
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
        cropElement.classList.add('cooldown1');
        cropElement.style.animationDuration = 0.5 + 's';
    } else {
        cropElement.classList.add('cooldown');
        cropElement.style.animationDuration = cooldown + 's';
    }

    var elemClick = cropElement.getAttribute('onclick');
    cropElement.removeAttribute('onclick');
    setTimeout(() => {

        if (elemid == "i4") {
            cooldownPolen = false;
        }
        if (elemid == "i56") {
            cooldownAurora = false;
        }
        cropElement.classList.remove('cooldown1');
        cropElement.classList.remove('cooldown');
        cropElement.setAttribute('onclick', elemClick);
    }, cooldown * 1000);
}

function togglePolen() {
    if (cooldownPolen) {
        return;
    }
    if (polentype === 1) {
        polentype = 2;
        togglerPolen.style.backgroundPosition = 'right';
        togglerPolen.innerHTML = "Recogiendo Polen Vulcano Durmiente"
        crop4.removeAttribute('onclick');
        crop4.setAttribute('onclick', "harvest('i4b','i4')");
    } else {
        polentype = 1;
        togglerPolen.style.backgroundPosition = 'left';
        togglerPolen.innerHTML = "Recogiendo Polen Vulcano Activo"
        crop4.removeAttribute('onclick');
        crop4.setAttribute('onclick', "harvest('i4a','i4')");
    }
}

function toggleAurora() {
    if (cooldownAurora) {
        return;
    }
    if (aurorapart === 1) {
        aurorapart = 2;
        togglerAurora.style.backgroundPosition = 'right';
        togglerAurora.innerHTML = "Recogiendo Frutos de Aurora";
        crop56.removeAttribute('onclick');
        crop56.setAttribute('onclick', "harvest('i6','i56')");
    } else {
        aurorapart = 1;
        togglerAurora.style.backgroundPosition = 'left';
        togglerAurora.innerHTML = "Recogiendo Hojas de Aurora"
        crop56.removeAttribute('onclick');
        crop56.setAttribute('onclick', "harvest('i5','i56')");
    }
}

function clearGarden() {
    togglerAurora.classList.add("hidden");
    togglerPolen.classList.add("hidden");
    crop1.classList.add('hiddencrops');
    crop2.classList.add('hiddencrops');
    crop3.classList.add('hiddencrops');
    crop4.classList.add('hiddencrops');
    crop56.classList.add('hiddencrops');
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

    inventory = items.filter(item => {
        if (currentInv[item.id] > 0) {
            return item;
        }
    });

    inventory.forEach(item => {
        var square = document.createElement('itemsquare');
        square.classList.add('itemsquare');
        square.setAttribute('item-id', item.id);
        var c = document.createElement('p');
        c.innerHTML = currentInv[item.id];
        square.appendChild(c);
        var squareimg = document.createElement('img');
        squareimg.setAttribute('src', 'assets/items/' + item.id + '.png');
        squareimg.setAttribute('onclick', "selectItemFromInvBackdrop(\""+item.id+"\")");
        square.appendChild(squareimg);
        screen.appendChild(square);
    });
}

function selectItemFromInvBackdrop(itemId) {
    selectedItem = items.find(item => item.id === itemId);
    boxP.innerHTML = selectedItem.item + " - Precio: " + selectedItem.price + " de oro." + " <hr> " + selectedItem.desc;
}

function openUpgrades() {
    changeScreen(7);
    upgradesData.forEach(function (upgrade) {
        if (!progress[upgrade.id]) {
            var upgradesquare = document.createElement('upgradesquare');
            upgradesquare.classList.add('upgrade');

            var squareimg = document.createElement('img');
            squareimg.setAttribute('src', upgrade.imgroute);
            upgradesquare.appendChild(squareimg);

            var textDiv = document.createElement('div');

            var pTitulo = document.createElement('p');
            pTitulo.innerHTML = upgrade.title;
            pTitulo.classList.add("upgradeTitle");

            var pText = document.createElement('p');
            pText.innerHTML = upgrade.text;

            textDiv.appendChild(pTitulo);
            textDiv.appendChild(pText);
            textDiv.classList.add('upgradeText');


            var dButton = document.createElement('div');
            dButton.classList.add('upgradediv')
            var pPrice = document.createElement('p');
            pPrice.innerHTML = 'Precio: ' + upgrade.price;
            var button = document.createElement('div');
            button.innerHTML = "Comprar";
            button.classList.add('upgradebutton');
            button.setAttribute("onclick",'buyUpgrade("'+upgrade.id+'",'+upgradesData.indexOf(upgrade)+')');
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
        alert("No tienes suficiente oro para esta mejora.")
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

    var ingredients = ['i1', 'i2', 'i3', 'i4a', 'i4b', 'i5', 'i6'];

    inventory = items.filter(item => {
        if (ingredients.includes(item.id)) {
            if (currentInv[item.id] > 0) {
                return item;
            }
        }
    });
    inventory.forEach(item => {
        var square = document.createElement('itemsquare');
        square.classList.add('itemsquare');
        square.setAttribute('item-id', item.id);
        var c = document.createElement('p');
        c.innerHTML = currentInv[item.id];
        square.appendChild(c);
        var squareimg = document.createElement('img');
        squareimg.setAttribute('src', 'assets/items/' + item.id + '.png');
        square.appendChild(squareimg);
        square.setAttribute('quantity', currentInv[item.id]); // Establecer la cantidad inicial
        
        square.addEventListener('click', function () {
            var clickedItemId = item.id;
            var clickedItemQuantity = parseInt(square.getAttribute('quantity'));
            
            if (clickedItemQuantity > 0) {
                // Buscar un lugar designado disponible para el artículo seleccionado
                var chosenSlots = [chosen1, chosen2, chosen3];
                var chosenSlot = chosenSlots.find(slot => slot.getAttribute('item-id') === null);
                
                if (chosenSlot) {
                    var image = squareimg.cloneNode(true);
                    chosenSlot.appendChild(image);
                    chosenSlot.setAttribute('item-id', clickedItemId);
                    
                    // Actualizar la cantidad en el itemsquare
                    square.setAttribute('quantity', clickedItemQuantity - 1);
                    square.childNodes[0].innerHTML = (clickedItemQuantity - 1);
                }
                
                verificarChosen(); // Verificar los lugares designados
            }
        });
        
        tinycupboard.appendChild(square);
    });
}

function verificarChosen() {
    if (chosen1.getAttribute('item-id') !== null && chosen2.getAttribute('item-id') !== null && chosen3.getAttribute('item-id') !== null) {
        createPotionButton.classList.remove("invisible");
    } else {
        createPotionButton.classList.add("invisible");
    }
}

function resetChosenSquares(opt) {
    switch (opt) {
        case 1:
            if (chosen1.getAttribute('item-id') !== null) {
                var itemId = chosen1.getAttribute('item-id');
                var item = items.find(function (item) {
                    return item.id === itemId;
                });
                if (item) {
                    Array.from(tinycupboard.children).forEach(function (square) {
                        if (square.getAttribute('item-id') === itemId) {
                            var quantity = parseInt(square.getAttribute('quantity'));
                            square.setAttribute('quantity', quantity + 1);
                            square.firstChild.innerHTML = (quantity + 1);
                        }
                    });
                }
                chosen1.innerHTML = "";
                chosen1.removeAttribute('item-id');
            }
            break;
        case 2:
            if (chosen2.getAttribute('item-id') !== null) {
                var itemId = chosen2.getAttribute('item-id');
                var item = items.find(function (item) {
                    return item.id === itemId;
                });
                if (item) {
                    Array.from(tinycupboard.children).forEach(function (square) {
                        if (square.getAttribute('item-id') === itemId) {
                            var quantity = parseInt(square.getAttribute('quantity'));
                            square.setAttribute('quantity', quantity + 1);
                            square.firstChild.innerHTML = (quantity + 1);
                        }
                    });
                }
                chosen2.innerHTML = "";
                chosen2.removeAttribute('item-id');
            }
            break;
        case 3:
            if (chosen3.getAttribute('item-id') !== null) {
                var itemId = chosen3.getAttribute('item-id');
                var item = items.find(function (item) {
                    return item.id === itemId;
                });
                if (item) {
                    Array.from(tinycupboard.children).forEach(function (square) {
                        if (square.getAttribute('item-id') === itemId) {
                            var quantity = parseInt(square.getAttribute('quantity'));
                            square.setAttribute('quantity', quantity + 1);
                            square.firstChild.innerHTML = (quantity + 1);

                        }
                    });
                }
                chosen3.innerHTML = "";
                chosen3.removeAttribute('item-id');
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
    if (chosen1.getAttribute('item-id') !== null) {
        chosenIngredients.push(chosen1.getAttribute('item-id'));
    }

    if (chosen2.getAttribute('item-id') !== null) {
        chosenIngredients.push(chosen2.getAttribute('item-id'));
    }

    if (chosen3.getAttribute('item-id') !== null) {
        chosenIngredients.push(chosen3.getAttribute('item-id'));
    }

    // Ordenar los ingredientes antes de llamar a la función crearObjeto
    chosenIngredients.sort();
    chosenIngredients.forEach(elem => {
        currentInv[elem]--;
    });

    combinacionIngredientes = chosenIngredients.join(',');
    if (recetas.hasOwnProperty(combinacionIngredientes)) {
        currentInv[recetas[combinacionIngredientes]]++;
        i = items.find(item => item.id == recetas[combinacionIngredientes]);
        textFloat(recetas[combinacionIngredientes]);

        if (!progress.recipesUnlocked.includes(recetas[combinacionIngredientes])) {
            progress.recipesUnlocked.push(recetas[combinacionIngredientes]);
        }
    } else {
        currentInv[38]++;
        i = items.find(item => item.id == '38')
        textFloat('38');
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
    var ingredients = receta.split(',');
    var ingredientsneeded = new Map();
    ingredients.forEach(ingredient => {
        if (ingredientsneeded.has(ingredient)) {
            ingredientsneeded.set(ingredient, (ingredientsneeded.get(ingredient)) + 1)
        } else {
            ingredientsneeded.set(ingredient, 1);
        }
    });
    if (autoCheckIngredients(ingredientsneeded)) {
        ingredients.forEach(ingredient => {
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

    progress.recipesUnlocked.forEach(itemid => {
        targetItem = items.find(item => item.id == itemid);
        //rectangulo
        var recipesquare = document.createElement('recipesquare');
        recipesquare.classList.add('recipe');

        //img
        var squareimg = document.createElement('img');
        squareimg.setAttribute('src', 'assets/items/'+itemid+'.png');
        recipesquare.appendChild(squareimg);

        //texdiv
        var textDiv = document.createElement('div');
        //name of item
        var pTitulo = document.createElement('p');
        pTitulo.innerHTML = targetItem.item;
        pTitulo.classList.add("recipeTitle");

        //desc
        var pText = document.createElement('p');
        pText.innerHTML = targetItem.desc;

        textDiv.appendChild(pTitulo);
        textDiv.appendChild(pText);
        textDiv.classList.add('recipeText');


        ingredientsstring = obtenerReceta(itemid); 

        var pPrice = document.createElement('p');
        pPrice.innerHTML = 'Precio de Venta: ' + targetItem.price+' de Oro.<br><br>Ingredientes necesarios:<br>'+ingredientsstring;
        textDiv.appendChild(pPrice);

        var button = document.createElement('div');
        button.innerHTML = "Crear";
        button.classList.add('recipeButton');
        button.setAttribute("onclick","autoPotion("+targetItem.id+")");

        recipesquare.appendChild(textDiv);
        recipesquare.appendChild(button);

        screen.appendChild(recipesquare);
    });

}

function obtenerReceta(numeroReceta) {
    const receta = Object.entries(recetas).find(([clave, valor]) => valor == numeroReceta);

    const ingredientes = receta[0].split(',');
    const contadorIngredientes = {};

    ingredientes.forEach(id => {
        const nombreIngrediente = items.find(item => item.id == id).item;
        contadorIngredientes[nombreIngrediente] = (contadorIngredientes[nombreIngrediente] || 0) + 1;
    });

    const ingredientesCadena = Object.entries(contadorIngredientes).map(([ingrediente, cantidad]) => {
        const inventario = currentInv[items.find(item => item.item == ingrediente).id];
        return `${cantidad} x ${ingrediente} (Tienes ${inventario})`;
    }).join('<br>');
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
    while (upgradesquares[0]) upgradesquares[0].parentNode.removeChild(upgradesquares[0]);
    recipesquares = document.getElementsByTagName("recipesquare");
    while (recipesquares[0]) recipesquares[0].parentNode.removeChild(recipesquares[0]);
    boxP.innerHTML = "...";
    boxP.classList.remove("hidden");
    boxButtons.classList.add("hidden");
    settings.classList.add("hidden");
    if(hasClient){
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
            boxP.innerHTML = "Haz click en los ingredientes para recoger 1 unidad de ellos. Cada planta tiene su propio tiempo de crecimiento."
            loadGarden();
            break;
        case 2:
            title.innerHTML = "Mostrador";
            screen.classList.add("mostrador");
            toggleClient("ON");
            if(hasClient){
                squashAndRestore();
                if(!interacted){
                    talkTobutton.classList.remove("hidden");
                }else{
                    toggleClientOptions();
                }
            }
            break;
        case 3:
            title.innerHTML = "Trastienda";
            screen.classList.add("trastienda");
            boxP.innerHTML = "En el almacen puedes ver tus objetos. En el tablón de mejoras puedes desbloquear cosas nuevas para tu tienda. En la mesa de alquimia puedes crear pociones con tus ingredientes."
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
            boxP.innerHTML = "Puedes desbloquear mejoras para tu tienda comprandolas con el oro de tus ventas."
            break;
        case 8:
            title.innerHTML = "Mesa de Alquimia";
            screen.classList.add("mesa");
            boxP.innerHTML = "Crea pociones haciendo click en los ingredientes que quieres usar. Necesitas 3 ingredientes para crear una poción. Haz click de nuevo en los seleccionados para devolverlos al almacén. 3 Ingredientes diferentes nunca crean pociones estables."
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
    return new Promise(resolve => {
        function boxClicked() {
            box.removeEventListener('click', boxClicked)
            boxContinueText.classList.remove("pulsing");
            boxContinueText.classList.add("hidden");
            if(hasClient){
                squashAndRestore();
            }
            resolve();
        }
        boxContinueText.classList.remove("hidden");
        boxContinueText.classList.add("pulsing");
        box.addEventListener('click', boxClicked);
    });
}

function squashAndRestore(){
    var client = document.getElementById("currentClient");
    client.classList.add('client-background-squashed');
    setTimeout(function() {
        client.classList.remove('client-background-squashed');
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

    localStorage.setItem('currentInv', encodedCurrentInv);
    localStorage.setItem('progress', encodedProgress);
}

function cargarDesdeLocalStorage() {
    var storedCurrentInv = localStorage.getItem('currentInv');
    var storedProgress = localStorage.getItem('progress');
    console.log("Cargando...");

    if (storedCurrentInv) {
        currentInv = decodeBase64(storedCurrentInv);
        console.log(currentInv);
        
    }

    if (storedProgress) {
        progress = decodeBase64(storedProgress);
        console.log(progress);
    }

    guardarEnLocalStorage();
    guardadoAutomatico = setInterval(guardarEnLocalStorage, 10000);
}

function textFloat(ingredientId){
    var targetitem =  items.filter(item => item.id==ingredientId);
    const floatingText = document.createElement('div');
    floatingText.className = 'floatingText';
    floatingText.textContent = "+1 "+targetitem[0].item;
    
    // Establecer la posición del texto en el lugar del clic
    floatingText.style.left = `${event.clientX}px`;
    floatingText.style.top = `${event.clientY}px`;
    
    screen.appendChild(floatingText);
    
    // Iniciar la animación
    setTimeout(() => {
        floatingText.style.animation = 'floatUp 2s forwards';
    }, 10);
    
    // Eliminar el elemento después de que termine la animación
    floatingText.addEventListener('animationend', () => {
        screen.removeChild(floatingText);
    });
 
 }

 function areObjectsEmpty(currentInv, progress, emptyInventory, emptyProgress) {

    function isEqual(obj, emptyObj) {
        return Object.keys(emptyObj).every(key => obj[key] === emptyObj[key]);
    }

    function isProgressEqual(progress, emptyProgress) {
        return progress.hasPetalos === emptyProgress.hasPetalos &&
               progress.hasRaices === emptyProgress.hasRaices &&
               progress.hasPolen === emptyProgress.hasPolen &&
               progress.hasAurora === emptyProgress.hasAurora &&
               progress.gold === emptyProgress.gold &&
               Array.isArray(progress.recipesUnlocked) &&
               progress.recipesUnlocked.length === emptyProgress.recipesUnlocked.length;
    }

    return isEqual(currentInv, emptyInventory) && isProgressEqual(progress, emptyProgress);
}

function toggleAudio(){
    button = document.getElementById("audiobutton");
    if(audioactive){
        audioactive=false;
        button.innerHTML="Activar Sonido";
    }else{
        audioactive=true;
        button.innerHTML="Desactivar Sonido"
    }
}
//#endregion

