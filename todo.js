/* 1) Capturar os dados: descrição e data, do form
   2) Colocar esses dados em um Objeto JS
   3) Adicionar esses dados em uma tabela a ser exibida no site
 */

//1) Prevenir o comportamento padrão do FORM p/ ele ñ enviar uma Requisição
// Capturar a tag formulário a partir do objeto document
form = document.getElementById('form-todo');
// Passar para o attr onsubmit do form uma function
form.onsubmit = function(event) {
  // Evento de submit não fará mais uma requisição
  // Requisição foi bloqueada
  event.preventDefault();
}

// Função para cadastrar TODO
function cadTodo() {
  // Usar o objeto document (HTML) do JS p/ recuperar os dados
  desc = document.getElementById('desc-todo');
  // Recuperar o valor digitado no input desc com desc.value
  descValue = desc.value;

  data = document.getElementById('date-todo');
  // Recuperar o valor digitado no input data com data.value
  dataValue = data.value;
  dataValue = converteData(dataValue);

  // Criar objeto JS com esses dados  
  todo = {
    descricao: descValue,
    data: dataValue,
    id: geraIdParaTodo()
  };

  // console.log(todo);
  addTodoATabela(todo);
}

function converteData(data, padrao = 'pt-br') {
  if(padrao == 'pt-br') {
    // Split => quebra uma string em um array (vetor), com base em um separador
    // '2020-11-27' => data.split('-') => ['2020', '11', '27']
    dataArray = data.split('-');
    // d = '27' + '/' + '11' + '/' + '2020' = '27/11/2020'
    d = dataArray[2] + '/' + dataArray[1] + '/' + dataArray[0];

    return d;
  }
}

function addTodoATabela(todo) {
  table = document.getElementById('table-todo');
  table.style = 'display: block';

  // Capturar a tbody da tabela
  // document.querySelector('?') => cpaturar um ou + elementos html
  // com base na aplicação de uma string que funciona como seletor
  // de tags:
  // seletor = '#table-todo tbody' => quero recuperar de 
  // dentro da tabela cujo id (#, indica que está sendo usado o id) 
  // é #table-todo o elemento tbody  
  tbody = document.querySelector('#table-todo tbody');
  tbody.innerHTML += ` <tr class="text-center">
    <td>${todo.id}</td>
    <td> 
      <select>
        <option value="0" selected>Pendente</option> 
        <option value="1">Finalizada</option>
      </select>
    </td>
    <td>${todo.descricao}</td>
    <td>${todo.data}</td>
    <td>
      <button class="btn btn-primary">Alterar</button>
      <button class="btn btn-danger">Remover</button>
    </td>
  </tr>
  `;

  limparInputs();
}

function limparInputs() {
  desc = document.getElementById('desc-todo');
  desc.value = "";

  data = document.getElementById('date-todo');
  data.value = "";
}

function geraIdParaTodo() {
  // Obtém a data e hora atual representada em milisegundos
  return Date.now();
}