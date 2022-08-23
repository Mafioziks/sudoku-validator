class Validator {
  constructor() {
    this.SUBGROUPS_EACH_WAY = 3;
    this.SUBGROUP_WIDTH = 6;
    this.SUBGROUP_HEIGHT = 3;
  }

  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    // Your code here
    let result = 'Sudoku is ';
    let complete = sudoku.includes("0");

    sudoku = sudoku.split('\n');

    if (
      this.checkRows(sudoku) 
      && this.checkColumns(sudoku)
      && this.checkSubgroup(sudoku)
    ) {
      result += 'valid';

      if (complete) {
        result += ' but incomplete'
      }
    } else {
      result += 'invalid';
    }

    return result + '.';
  }

  checkRows(sudoku) {
    let valid = true;
    sudoku.forEach((row, index) => {
      if (this.isFrameRow(index)) {
        return;
      }

      if (!this.isValidRow(row)) {
        valid = false;
      }
    });

    return valid;
  }

  isValidRow(row) {
    let numbersInLine = {};
    let valid = true;

    Array.from(row).forEach((nr, index) => {
      if (' ' === nr || '0' === nr || this.isFrameColumn(index)) {
        return;
      }

      if (undefined !== numbersInLine[nr]) {
        valid = false;
      }

      numbersInLine[nr] = true;
    });

    return valid;
  }

  isFrameColumn(index) {
    return this.SUBGROUP_WIDTH === index % (this.SUBGROUP_WIDTH + 1);
  }

  isFrameRow(index) {
    return this.SUBGROUP_HEIGHT === index % (this.SUBGROUP_HEIGHT + 1);
  }

  checkColumns(sudoku) {
    let valid = true;

    let lineLength = sudoku[0].length;
    let rowCount = sudoku.length;

    for (let col = 0; col < lineLength; col++)  {
      if (this.isFrameColumn(col)) {
        continue;
      }
      
      let colNumbers = {};
      for (let row = 0; row < rowCount; row++) {
        if(this.isFrameRow(row)) {
          continue;
        }

        let char = sudoku[row].charAt(col);
        if ('0' === char || '\n' === char || ' ' === char) {
          continue;
        }

        if (undefined !== colNumbers[char]) {
          valid = false;
        }

        colNumbers[char] = true;
      }
    }

    return valid;
  }

  checkSubgroup(sudoku) {
    let valid = true;
    
    for (let horizontalSubgroup = 0; horizontalSubgroup < this.SUBGROUPS_EACH_WAY; horizontalSubgroup++) {
      for (let verticalSubgroup = 0; verticalSubgroup < this.SUBGROUPS_EACH_WAY; verticalSubgroup++) {

        let subgroup = {};
        for (let x = 0; x < this.SUBGROUP_WIDTH; x++) {
          for (let y = 0; y < this.SUBGROUP_HEIGHT; y++) {
            let char = sudoku[y + (verticalSubgroup * this.SUBGROUP_HEIGHT) + verticalSubgroup].charAt(x + (horizontalSubgroup * this.SUBGROUP_WIDTH) + horizontalSubgroup);
    
            if ('' === char || ' ' === char || '0' === char || '\n' === char) {
              continue;
            }

            if (undefined !== subgroup[char]) {
              valid = false;
            }
    
            subgroup[char] = true;
          }
        }
      }
    }

    return valid;
  }
}

module.exports = Validator
