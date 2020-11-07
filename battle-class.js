/*
Battle order:
pass in two trainers
Trainers first pokemon come out
Trainer 1 chooses whether to use item - used immediately
Trainer 1 chooses move
Trainer 2 chooses whether to use item - used immediately
Trainer 2 chooses move
first attack depends on - move priority, then speed of pokemon
first attack,
has defender fainted? if so, 
    *** defender does not attack, trainer picks new active pokemon, if none left, other trainer has won ***
        *** if pokemon are available, bring out new pokemon & restart loop ***
second attack
has defender fainted? if so, 
    *** trainer picks new active pokemon if none left, other trainer has won ***
        *** if pokemon are available, bring out new pokemon & restart loop ***
otherwise, restart loop
*/

class Battle {
  constructor(trainer1, trainer2) {
    this.t1 = trainer1;
    this.t2 = trainer2;
    this.order = [this.t1, this.t2];
    this.nextMove1;
    this.nextMove2;
  }
  // method for each trainer to select their move
  selectMove(trainer, move) {
    // display available actions - attack, item, change pokemon
    if (trainer === this.t1) {
      this.nextMove1 = this.t1.activePokemon.moves[move];
    } else if (trainer === this.t2) {
      this.nextMove2 = this.t2.activePokemon.moves[move];
    }
  }

  useMove(attacker, defender, move) {}

  fight() {
    // trainer's moves are already decided
    let first, second;
    // console.log(this.t1);
    // console.log(this.t2);
    //check which move should go first
    this.order.sort(() => {
      if (this.nextMove1.priority < this.nextMove2.priority) return -1;
      if (this.nextMove1.priority > this.nextMove2.priority) return 1;
      // If priority is the same, sort on pokemon speed
      if (this.t1.activePokemon.speed < this.t2.activePokemon.speed) return -1;
      if (this.t1.activePokemon.speed > this.t2.activePokemon.speed) return 1;
    });
  }
}

module.exports = Battle;
