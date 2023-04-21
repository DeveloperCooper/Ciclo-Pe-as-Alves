const elements = { //Essa variável traz as tags do HTML para o JS
    date: document.querySelector(".date"),

    scrollLinks: document.querySelectorAll(".navbar-links, .footer-link"),
    navbarList: document.querySelector(".navbar-list"),
    toggle: document.querySelector(".navbar-button"),

    galleryItems: document.querySelectorAll(".gallery-item"),
    sliderThumbsImage: document.querySelectorAll(".slider-thumbs-img"),
    closeModalBtn: document.querySelector(".modal-close"),
    modal: document.querySelector(".modal"),

    slider: document.querySelector(".slider"),
    sliderImage: document.querySelector(".slider-img"),
    sliderImageNumber: document.querySelector(".slider-number"),
    sliderImageDescription: document.querySelector(".slider-image-description"),
    sliderPrevButton: document.querySelector(".button-left"),
    sliderNextButton: document.querySelector(".button-right"),
}


const gallery = [ //Essa variável traz a nossa galeria para o JS
    {
        img: "./Assets/img-01.jpg",
        description: "Bicicleta speed"
    },
    {
        img: "./Assets/img-02.jpg",
        description: "Pedalando pela manhã"
    },
    {
        img: "./Assets/img-03.jpg",
        description: "Pedalando ao ar livre"
    },
    {
        img: "./Assets/img-04.jpg",
        description: "Competição"
    },
    {
        img: "./Assets/img-05.jpg",
        description: "Imprevistos acontecem"
    },
    {
        img: "./Assets/img-06.jpg",
        description: "Encontro com os amigos"
    },
]

let sliderCounter = 0, touchStart, touchEnd;

elements.date.innerHTML = new Date().getFullYear() + "."; //Utilizando esse comando, o ano do footer sempre se atualizará automaticamente.

elements.scrollLinks.forEach(link => { //forEach retorna os links da página, dentro da variável "link"
    link.addEventListener("click", e => { //A cada link, quando o usuário clicar nele, irá chamar as funções abaixo:
        elements.navbarList.classList.remove("navbar-list--show-links"); //Esse comando permite que quando a pessoa clique no link hamburguer, o menu suma da página, não atrapalhando a visualização das outras coisas

        const id = link.getAttribute("href"); //Cada vez que clicamos no "href" do ID ele aciona qual ID é
        const element = document.querySelector(id); //Seleciona a sessão que corresponde ao "ID" em suas sections, e sua "href" nos menus navbar e footer

        const position = element.offsetTop - 95; //Identifica a posição da sessão, (a linha em que o documento está em HTML) e tira 62 por conta de estar tampando o titulo
        
        window.scrollTo({ //Diz onde a janela do navegador deve se mover
            top: position,
            behavior: "smooth" //Essa é a "animação" de suavidade ao rolar a página
        });

        e.preventDefault(); //Esse comando desabilita o movimento "seco" padrão da página, parando de se teletransportar ao clicar nos links
    });
});

elements.toggle.addEventListener("click", () => { //Ao clicar em "toggle"
    elements.navbarList.classList.toggle("navbar-list--show-links"); //Irá ativar o modificador que fizemos lá no CSS, abrindo o menu hamburguer
});

elements.galleryItems.forEach(item => {
    item.addEventListener("click", e => { //Ao clicar em alguma imagem
        const id = getImageId(e.target); //Esse comando é para identificar a imagem que foi clicada, usando o getImageId na const lá embaixo
        updateModal(id);
        elements.modal.style.display = "flex"; //Ela deixa de ser none e se torna flex
    });
});

elements.sliderThumbsImage.forEach(img => {
    img.addEventListener("click", e => {
        const id = getImageId(e.target);
        updateModal(id); //Esse elemento possibilita a troca de imagens dentro do modal, sem precisar sair do modal
    })
});

elements.closeModalBtn.addEventListener("click", () => { //Ao clicar no botão "X"
    elements.modal.style.display = "none"; //O modal irá sumir
});

elements.sliderNextButton.addEventListener("click", () => nextImage());

elements.sliderPrevButton.addEventListener("click", () => prevImage());

const getImageId = (target) => { //Essa função recebe a imagem da galeria // No item abaixo "Array.from" transforma o elemento em um Array // Fazemos isso para poder usar o indexOf
    const arrFromChildren = Array.from(target.parentNode.children); //Essa função faz com que selecione todos os filhos de "gallery" ou seja todos os "gallery-item"
    const id = arrFromChildren.indexOf(target); //Esse array vai fazer com que o sistema identifique a imagem que foi clicada, para assim mostra-la na tela

    sliderCounter = id; //Esse comando é das setas, para sempre identificar qual imagem ele clicou primeiro na "1/6"

    return id; //retorna o número da imagem
}

const updateModal = (imgId) => { //Essa função que irá fazer a troca das imagens certas
    elements.sliderImage.src = gallery[imgId].img; //"imgId" acessa nossas imagens em nossa gallery lá encima
    elements.sliderImageNumber.innerHTML = (imgId + 1) + "/" + gallery.length; //imgId diz qual é a imagem das 6 presentes, +1 é porque começamos com 0, colocando assim a sequencia a partir de 1, e gallery.length diz quantas imagens tem ao total na galeria. EX: 1/6 2/6... 3/7 se tiver 7 imagens...
    elements.sliderImageDescription.innerHTML = gallery[imgId].description; //Mostra a descrição na foto

    elements.sliderThumbsImage.forEach(img => {
        img.classList.remove("slider-thumbs-img--active"); //Aqui você remove a luz das imagens que aparecia ao clicar, e deixa somente a atual
    }); 

    elements.sliderThumbsImage[imgId].classList.add("slider-thumbs-img--active") //Ativa nosso elemento lá no CSS, acendendo a imagem que estiver
}

const nextImage = () => {
    if(++sliderCounter > 5) { //cada vez que o usuário clicar no botão next ou prev, ele vai aumentar ou diminuir o número da imagem, assim trocando-as, e quando chega na última, ele retorna para a primeira
        sliderCounter = 0; //Aqui diz que quando a imagem chegar na sexta(5), ele retorna para a primeira imagem(0)
    } 
    updateModal(sliderCounter);
}

const prevImage = () => {
    if(--sliderCounter < 0) { //cada vez que o usuário clicar no botão next ou prev, ele vai aumentar ou diminuir o número da imagem, assim trocando-as, e quando chega na última, ele retorna para a primeira
        sliderCounter = 5; //Aqui diz que quando a imagem chegar na sexta(5), ele retorna para a primeira imagem(0)
    } 
    updateModal(sliderCounter);
}