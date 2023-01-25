<<<<<<< HEAD
exports.randomNumberInt=(length)=> {
    const result = [];
    while (result.length !== length) {
      let random = getRandomArbitrary(0, 9);
      if (!result.includes(random)) result.push(random);
  
      // To check if the first no is not zero
      if (result.length === 1 && random === 0) result.pop();
    }
    return parseInt(result.join(""));
  }
  
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min) + 1;
  }


  exports.getdate=()=> {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
  
    today = mm + "-" + dd + "-" + yyyy;
    return today;
=======
exports.randomNumberInt=(length)=> {
    const result = [];
    while (result.length !== length) {
      let random = getRandomArbitrary(0, 9);
      if (!result.includes(random)) result.push(random);
  
      // To check if the first no is not zero
      if (result.length === 1 && random === 0) result.pop();
    }
    return parseInt(result.join(""));
  }
  
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min) + 1;
  }


  exports.getdate=()=> {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
  
    today = mm + "-" + dd + "-" + yyyy;
    return today;
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
  }