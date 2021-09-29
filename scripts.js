const formulario = document.forms.login;
const email = formulario.email;
const senha = formulario.senha;

const botaoLogin = document.getElementById('login');
const botaoCadastro = document.getElementById('cadastro');

const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

const alerta = document.getElementById('alerta');

function verificaExistente(emailEsenha) {
    const existe = cadastros.some(function (cad) {
        return cad.email === emailEsenha.email;
    });

    return existe;
};

function verificaEmailESenha(emailEsenha) {
    const dadosCorretos = cadastros.some(function (cad) {
        return cad.email === emailEsenha.email && cad.senha === emailEsenha.senha;
    });

    return dadosCorretos;
};

function limpaCampos() {
    email.value = '';
    senha.value = '';

    email.focus();
};

function mensagem(texto, tipo) {
    alerta.innerHTML = '';

    const elementoP = document.createElement('p');
    elementoP.innerText = texto;

    alerta.appendChild(elementoP);
    alerta.style.display = 'initial';

    switch (tipo) {
        case 'erro':
            alerta.style.backgroundColor = 'tomato';
            break;
        case 'sucesso':
            alerta.style.backgroundColor = '#47ff66';
            break;
        case 'atencao':
            alerta.style.backgroundColor = '#ffdb77';
            alerta.style.color = '#333';
            break;
        default:
            alerta.style.backgroundColor = '#ffdb77';
            alerta.style.color = '#333';
            break;
    }

    setTimeout(function () {
        alerta.style.display = 'none';
    }, 5000);
};

function validaECadastra(campos, funcao) {
    if (campos.email.trim() === '') {
        mensagem('Insira seu e-mail!', 'atencao');
        email.focus();
        return;
    } else if (campos.senha.trim() === '') {
        mensagem('Insira sua senha!', 'atencao');
        senha.focus();
        return;
    } else {
        funcao(campos);
    };
};

botaoLogin.addEventListener('click', function () {
    const campos = {
        email: email.value,
        senha: senha.value
    };

    validaECadastra(campos, login);
});

function login(campos) {
    if (verificaExistente(campos)) {
        if (verificaEmailESenha(campos) == false) {
            mensagem('Verifique o que foi digitado, dados incorretos!', 'atencao');
        } else {
            mensagem('Login realizado!', 'sucesso');
        };
    } else {
        mensagem('Essa conta não existe!', 'erro');
    };

    limpaCampos();
};

botaoCadastro.addEventListener('click', function () {
    const campos = {
        email: email.value,
        senha: senha.value
    };

    validaECadastra(campos, cadastro);
});

function cadastro(campos) {
    if (!verificaExistente(campos)) {
        cadastros.push(campos);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        mensagem('Usuário cadastrado com sucesso!', 'sucesso');
    } else {
        mensagem('Esse usuário já existe!', 'erro');
    };

    limpaCampos();
};