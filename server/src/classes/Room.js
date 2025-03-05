export default class Room {
  constructor(code, owner) {
    this.code = code; // Código único da sala
    this.owner = owner; // Criador da sala
    this.players = []; // Lista de jogadores
    this.game = null; // Jogo
  }

  addPlayer(player) {
    if (this.players.length <= 5) {
      this.players.push(player);
      return true;
    }
    return false;
  }

  removePlayer(playerId) {
    this.players = this.players.filter(player => player.id !== playerId);
  }
}
