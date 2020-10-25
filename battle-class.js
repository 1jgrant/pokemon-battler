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
    this.t2 - trainer2;
  }
}

module.exports = Battle;
