function adicionarItem() {
    const itemInput = document.getElementById('item');
    const prioridadeInput = document.getElementById('prioridade');

    const item = itemInput.value;
    const prioridade = prioridadeInput.value;
    const cor = obterCorDaPrioridade(prioridade);

    if (item.trim() === '') {
        alert('Digite um item válido.');
        return;
    }

    const itemLista = {
        item,
        prioridade,
        cor
    };

    let listaArmazenada = localStorage.getItem('listaTarefas');
    let lista = [];

    if (listaArmazenada) {
        lista = JSON.parse(listaArmazenada);
    }

    lista.push(itemLista);

    localStorage.setItem('listaTarefas', JSON.stringify(lista));

    atualizarLista();
    itemInput.value = '';
}

function atualizarLista() {
    const listaElement = document.getElementById('lista');
    listaElement.innerHTML = '';

    let listaArmazenada = localStorage.getItem('listaTarefas');
    let lista = [];

    if (listaArmazenada) {
        lista = JSON.parse(listaArmazenada);
    }

    lista.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.style.color = item.cor;
        listItem.innerHTML = `<span>[${item.prioridade}] ${item.item}</span>`;
        
        const span = document.createElement('span')
        span.className = 'span'

        const concluirBtn = document.createElement('button');
        concluirBtn.innerText = 'Concluir';
        concluirBtn.className = 'concluir';
        concluirBtn.onclick = function () {
            concluirItem(index);
        };
        span.appendChild(concluirBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.innerText = 'Excluir';
        excluirBtn.className = 'excluir';
        excluirBtn.onclick = function () {
            excluirItem(index);
        };
        span.appendChild(excluirBtn);

        if (item.concluido) {
            listItem.classList.add('strikethrough');
        }

        listItem.appendChild(span)
        listaElement.appendChild(listItem);
    });
}

function obterCorDaPrioridade(prioridade) {
    switch (prioridade) {
        case 'Alta':
            return 'red';
        case 'Média':
            return 'yellow';
        case 'Baixa':
            return '#007BFF';
        default:
            return 'black';
    }
}

function excluirItem(index) {
    let listaArmazenada = localStorage.getItem('listaTarefas');
    let lista = [];

    if (listaArmazenada) {
        lista = JSON.parse(listaArmazenada);
    }

    lista.splice(index, 1);

    localStorage.setItem('listaTarefas', JSON.stringify(lista));
    atualizarLista();
}

function concluirItem(index) {
    let listaArmazenada = localStorage.getItem('listaTarefas');
    let lista = [];

    if (listaArmazenada) {
        lista = JSON.parse(listaArmazenada);
    }

    lista[index].concluido = !lista[index].concluido; // Alterna o valor da propriedade "concluido" do item
    localStorage.setItem('listaTarefas', JSON.stringify(lista));
    atualizarLista();
}
