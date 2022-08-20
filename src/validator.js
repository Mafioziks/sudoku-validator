class Validator {
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
      if (nr === ' ') {
        return;
      }

      if (this.isFrameColumn(index)) {
        return;
      }

      if (Number.parseInt(nr) === 0) {
        return;
      }

      if (numbersInLine[nr] != undefined) {
        valid = false;
      }

      numbersInLine[nr] = true;
    });

    return valid;
  }

  isFrameColumn(index) {
    return 6 === index % 7;
  }

  isFrameRow(index) {
    return 3 === index % 4;
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

        if (colNumbers[char] !== undefined) {
          valid = false;
        }

        colNumbers[char] = true;
      }
    }

    return valid;
  }

  checkSubgroup(sudoku) {
    let valid = true;

    
    for (let horizontalSubgroup = 0; horizontalSubgroup < 3; horizontalSubgroup++) {
      for (let verticalSubgroup = 0; verticalSubgroup < 3; verticalSubgroup++) {


        let subgroup = {};
        for (let x = 0; x < 6; x++) {
          for (let y = 0; y < 3; y++) {
            let char = sudoku[y + (verticalSubgroup * 3) + verticalSubgroup].charAt(x + (horizontalSubgroup * 6) + horizontalSubgroup);
    
            if (char === '' || char === ' ' || char === '0' || char === '\n') {
              continue;
            }

            if (subgroup[char] !== undefined) {
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
