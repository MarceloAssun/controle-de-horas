const firebaseConfig = {
    apiKey: "AIzaSyCoqsq2mWduOFHmtlI43MkY5p9tDvytqms",
    authDomain: "banco-de-horas-complementares.firebaseapp.com",
    databaseURL: "https://banco-de-horas-complementares-default-rtdb.firebaseio.com",
    projectId: "banco-de-horas-complementares",
    storageBucket: "banco-de-horas-complementares.appspot.com",
    messagingSenderId: "707597775987",
    appId: "1:707597775987:web:0bf1e44874ee238a42e606",
    measurementId: "G-PQK7W797GE"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Modificar a função de submissão para salvar os dados no Firestore
document.getElementById('atividadesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const categoriaSelect = document.getElementById('categoriaAtividade');
    const tipoSelect = document.getElementById('tipoAtividade');
    const nomeAtividade = document.getElementById('nomeAtividade').value;
    const horasRealizadas = parseFloat(document.getElementById('horasRealizadas').value);
    
    const categoria = categoriaSelect.value;
    const tipo = tipoSelect.value;
    const { limite, aproveitamento } = atividadesConfig[categoria][tipo];
    const horasAproveitadas = Math.min(horasRealizadas, limite) * aproveitamento;
    
    const novaAtividade = {
        categoria: categoriaSelect.options[categoriaSelect.selectedIndex].text,
        tipo: atividadesNomes[tipo],
        nome: nomeAtividade,
        horasRealizadas,
        horasAproveitadas
    };
    
    // Salvar no Firestore
    db.collection("atividades").add(novaAtividade)
        .then(() => {
            console.log("Atividade salva com sucesso!");
            carregarAtividades();
        })
        .catch(error => console.error("Erro ao salvar atividade: ", error));
    
    this.reset();
    document.getElementById('tipoAtividade').disabled = true;
});

// Função para carregar atividades salvas no Firestore
function carregarAtividades() {
    db.collection("atividades").get().then(snapshot => {
        atividades = [];
        snapshot.forEach(doc => atividades.push(doc.data()));
        atualizarTabela();
    });
}

document.addEventListener("DOMContentLoaded", carregarAtividades);




const atividadesConfig = {
    ensino: {
        'monitoria': { limite: 40, aproveitamento: 0.7 },
        'concursos': { limite: 50, aproveitamento: 0.7 },
        'defesas-tcc': { limite: 3, aproveitamento: 0.5 },
        'cursos-especificos': { limite: 40, aproveitamento: 0.8 },
        'cursos-gerais': { limite: 10, aproveitamento: 0.2 }
    },
    extensao: {
        'projeto-extensao': { limite: 40, aproveitamento: 0.1 },
        'atividades-culturais': { limite: 5, aproveitamento: 0.8 },
        'visitas-tecnicas': { limite: 40, aproveitamento: 1.0 },
        'visitas-feiras': { limite: 5, aproveitamento: 0.2 },
        'cursos-idiomas': { limite: 20, aproveitamento: 0.6 },
        'palestras-ouvinte': { limite: 10, aproveitamento: 0.8 },
        'palestras-apresentador': { limite: 15, aproveitamento: 1.0 },
        'empresa-junior': { limite: 20, aproveitamento: 0.2 }
    },
    pesquisa: {
        'iniciacao-cientifica': { limite: 40, aproveitamento: 0.8 },
        'artigo-periodico': { limite: 10, aproveitamento: 1.0 },
        'artigo-congresso': { limite: 7, aproveitamento: 1.0 },
        'capitulo-livro': { limite: 7, aproveitamento: 1.0 },
        'resumo-anais': { limite: 5, aproveitamento: 1.0 },
        'patentes': { limite: 40, aproveitamento: 1.0 },
        'colaborador-seminarios': { limite: 10, aproveitamento: 1.0 },
        'palestras-pesquisa-ouvinte': { limite: 10, aproveitamento: 0.8 },
        'palestras-pesquisa-apresentador': { limite: 15, aproveitamento: 1.0 }
    }
};

const atividadesNomes = {
    'monitoria': 'Monitoria',
    'concursos': 'Concursos e campeonatos',
    'defesas-tcc': 'Defesas de TCC',
    'cursos-especificos': 'Cursos Profissionalizantes Específicos',
    'cursos-gerais': 'Cursos Profissionalizantes Gerais',
    'projeto-extensao': 'Projeto de extensão',
    'atividades-culturais': 'Atividades culturais',
    'visitas-tecnicas': 'Visitas Técnicas',
    'visitas-feiras': 'Visitas a Feiras e Exposições',
    'cursos-idiomas': 'Cursos de Idiomas',
    'palestras-ouvinte': 'Palestras, Seminários e Congressos (ouvinte)',
    'palestras-apresentador': 'Palestras, Seminários e Congressos (apresentador)',
    'empresa-junior': 'Projeto Empresa Júnior',
    'iniciacao-cientifica': 'Iniciação Científica',
    'artigo-periodico': 'Publicação de artigos em periódicos',
    'artigo-congresso': 'Publicação de artigos em congressos',
    'capitulo-livro': 'Publicação de capítulo de livro',
    'resumo-anais': 'Publicação de resumos em anais',
    'patentes': 'Registro de patentes',
    'colaborador-seminarios': 'Colaborador em atividades como Seminários e Congressos',
    'palestras-pesquisa-ouvinte': 'Palestras, Seminários e Congressos de Pesquisa (ouvinte)',
    'palestras-pesquisa-apresentador': 'Palestras, Seminários e Congressos de Pesquisa (apresentador)'
};

let atividades = [];

document.getElementById('categoriaAtividade').addEventListener('change', function() {
    const tipoSelect = document.getElementById('tipoAtividade');
    tipoSelect.innerHTML = '<option value="">Selecione a atividade</option>';
    tipoSelect.disabled = !this.value;
    
    if (this.value) {
        const atividades = atividadesConfig[this.value];
        Object.keys(atividades).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = atividadesNomes[key];
            tipoSelect.appendChild(option);
        });
    }
});

document.getElementById('atividadesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const categoriaSelect = document.getElementById('categoriaAtividade');
    const tipoSelect = document.getElementById('tipoAtividade');
    const nomeAtividade = document.getElementById('nomeAtividade').value;
    const horasRealizadas = parseFloat(document.getElementById('horasRealizadas').value);
    
    const categoria = categoriaSelect.value;
    const tipo = tipoSelect.value;
    const { limite, aproveitamento } = atividadesConfig[categoria][tipo];
    const horasAproveitadas = Math.min(horasRealizadas, limite) * aproveitamento;
    
    atividades.push({
        categoria: categoriaSelect.options[categoriaSelect.selectedIndex].text,
        tipo: atividadesNomes[tipo],
        nome: nomeAtividade,
        horasRealizadas,
        horasAproveitadas
    });

    atualizarTabela();
    this.reset();
    document.getElementById('tipoAtividade').disabled = true;
});

function atualizarTabela() {
    const tbody = document.querySelector('#tabelaAtividades tbody');
    tbody.innerHTML = '';
    
    let totalHoras = 0;
    
    atividades.forEach(atividade => {
        tbody.innerHTML += `
            <tr>
                <td>${atividade.categoria}</td>
                <td>${atividade.tipo}</td>
                <td>${atividade.nome}</td>
                <td>${atividade.horasRealizadas}</td>
                <td>${atividade.horasAproveitadas.toFixed(1)}</td>
            </tr>
        `;
        totalHoras += atividade.horasAproveitadas;
    });
    
    document.getElementById('totalHoras').textContent = totalHoras.toFixed(1);
} 

