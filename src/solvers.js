/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



window.findSolution = function(row, cols, board, validator, callback){
  // if at end, count++
  if( row === cols ){
    return callback();
  }

  // iterate of all possible decision for this row
  for( var i = 0; i < cols; i++ ){
    // place a rook
    board.togglePiece(row, i);

    // check for conflicts
    if( !board[validator]() ){
      // if no -> recurse with remaining rows
      var solution = findSolution(row+1, cols, board, validator, callback);
      if( solution ){
        return solution;
      }
    }

    // unplace a rook
    board.togglePiece(row, i);
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each otherwindow.findNRooksSolution = function(n) {
window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  var board = new Board({n:n});

  solution = window.findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    return board.rows();
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  window.findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n:n});
  var solution = board.rows();

  window.findSolution(0, n, board, "hasAnyQueensConflicts", function(){
    solution = board.rows();
    return solution;
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});

  window.findSolution(0, n, board, "hasAnyQueensConflicts", function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
