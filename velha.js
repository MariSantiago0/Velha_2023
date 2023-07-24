
const cells = document.querySelectorAll(".cell");// chamando todas as cell, nas qual foram apenas identificadas como classe, por isso o querySelector e .
const statusText = document.querySelector("#statusText");// chamando a frase para os status de cada jogador, foram identificadas por id por isso o #
const restartbtn = document.querySelector("#restartbtn");// chamando o button para reiniciar
const winConditions = [// possiveis formas de ganhar
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];// cada espaço para poder jogar
let currentPlayer = "X";// qual é o atual jogador
let running = false;// n ta rodando o jogo

initializeGame();// iniciando o jogo

function initializeGame() {// funçao para iniciar o jogo
  cells.forEach(cell => cell.addEventListener("click", cellClick));// cada cell irá ter um event listener que ficara de olho na hora de clicar na cell
  restartbtn.addEventListener("click", restartGame);// e tbm ficara esperto quando clicar nessa
  statusText.textContent = `vez do ${currentPlayer}`;// basicamente é um textinho que mostra qual é o proximo jogador
  running = true;// ta rodando o jogo
}

function cellClick() {// função chamada quando clicamos em uma cell
  const cellIndex = this.getAttribute("cellIndex");//  ela pega o índice da célula que foi clicada, para saber qual foi clicada

  if (options[cellIndex] !== "" || !running) {// verificações pra ver se a célula já foi escolhida ou se o jogo já acabou,senão não faz nada apenas retorna
    return;
  }

  updateCell(this, cellIndex);//  chama função e serve pra atualizar a célula que a gente clicou com a marca do jogador atual
  checkWinner();// chama função e verifica se há ganhador 
  //ordem: cell clicada, verifica se o jogo acabou, atualiza celula e marca o jogador atual, verifica se há ganhador
}

function updateCell(cell, index) {// atualiza celula e marca atual jogador
  options[index] = currentPlayer;// O cell é a própria célula do jogo que a gente quer atualizar, e o index é o índice dessa célula na nossa lista de opções.
  cell.textContent = currentPlayer;// atualiza atual jogador
}

function changePlayer() {// função para trocar de jogador 
  currentPlayer = currentPlayer === "X" ? "O" : "X";// como o primeiro é o X, ele se questiona se é "X" e se for ele vai trocar para ser "O" na proxima e assim continua
  statusText.textContent = `vez do ${currentPlayer}`;// atualiza no elemento html
}

function checkWinner() {// verifica se algum jogador ganhou. Ela é chamada sempre que um jogador faz uma jogada pra ver se ele ganhou ou se o jogo empatou.
  let roundWon = false;// ñ teve ninguem que jogou o jogo ainda

  for (let i = 0; i < winConditions.length; i++) {// percorre as condições de vitória
    const condition = winConditions[i];//Cada condição é uma combinação de três posições do jogo que, se todas tiverem o mesmo símbolo do jogador atual, ele ganhou. Essas condições são armazenadas em um array chamado winConditions.
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {// se as cells tiverem vazias o jogo continua
      continue;
    }

    if (cellA === cellB && cellB === cellC) {// se formou as 3 cells com o mesmo simbolo ganha o jogo e para o jogo 
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Ganhou Caralho!!!!!`;// fulanin wins
    running = false;// para o jogo
  } else if (!options.includes("")) {//  Verifica Se não tiver mais nenhuma posição vazia e se não mostrar um ganhador e ocupar os espaços, é empate
    statusText.textContent = "Velha!";// empate
    running = false;// para o jogo
  } else {
    changePlayer();// se nada disso acontecer, ele só vai trocar o jogador de boa
  }
}

function restartGame() {// limpar os Xs e Os, o tabuleiro né caralho
  currentPlayer = "X";// jogador atual
  options = ["", "", "", "", "", "", "", "", ""];// cells vazias
  statusText.textContent = `vez do ${currentPlayer} `;// jogador atual no elemento html
  cells.forEach(cell => (cell.textContent = ""));// cada cell vai ser limpada, ser esvaziada
  running = true;// rodar o jogo
}
