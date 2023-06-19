
const NOME_MIN_LENGTH = 15;
const EMAIL_MIN_LENGTH = 10;
const IDADE_MIN_SOLTEIRO = 15;

function validarFormulario() {
  var nome = document.forms["formulario"]["nome"].value;
  var email = document.forms["formulario"]["email"].value;
  var dataNascimento = document.forms["formulario"]["data-nascimento"].value;
  var sexo = document.forms["formulario"]["sexo"].value;
  var estadoCivil = document.forms["formulario"]["estado-civil"].value;
  var areasInteresse = document.querySelectorAll('input[name="areas-interesse"]:checked');

  if (nome === "" || nome.length < NOME_MIN_LENGTH) {
    alert("Por favor, preencha o campo Nome corretamente.");
    document.forms["formulario"]["nome"].focus();
    return false;
  }

  if (email === "" || email.length < EMAIL_MIN_LENGTH) {
    alert("Por favor, preencha o campo E-mail.");
    document.forms["formulario"]["email"].focus();
    return false;
  }

  var partesData = dataNascimento.split('-');
  var ano = parseInt(partesData[0]);
  var mes = parseInt(partesData[1]) - 1;
  var dia = parseInt(partesData[2]);
  
  var data = moment({ year: ano, month: mes, day: dia });
  
  if (
    data.year() !== ano ||
    data.month() !== mes ||
    data.date() !== dia ||
    !data.isValid()
  ) {
    alert("Data de Nascimento inválida!");
    document.forms["formulario"]["data-nascimento"].focus();
    return false;
  }

  if (sexo === "") {
    alert("Por favor, selecione uma opção para o campo Sexo.");
    return false;
  }

  if (estadoCivil === "")  {
    alert("Por favor, selecione uma opção para o campo Estado Civil.");
    return false;
  } else if (estadoCivil === 'Solteiro(a)' && calcularIdade(dia, mes, ano) <= IDADE_MIN_SOLTEIRO) {
    alert("Para escolher o estado civil como Solteiro(a), você deve ter mais de 15 anos.");
    return false;
  }

  if (areasInteresse.length === 0) {
    alert("Por favor, selecione pelo menos uma opção para o campo Áreas de Interesse.");
    return false;
  }

  alert("Dados enviados com sucesso!");
  return true;
}

function calcularIdade(dia, mes, ano) {
  var hoje = new Date();
  var idade = hoje.getFullYear() - ano;
  var m = hoje.getMonth() - mes;

  if (m < 0 || (m === 0 && hoje.getDate() < dia)) {
    idade--;
  }

  return idade;
}
