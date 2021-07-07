var p1AddButton = document.querySelector("#p1-add");
var p1TwoButton = document.querySelector("#p1-two");
var p1ThreeButton = document.querySelector("#p1-three");
var p1MinusButton = document.querySelector("#p1-minus");
var p2AddButton = document.querySelector("#p2-add");
var p2TwoButton = document.querySelector("#p2-two");
var p2ThreeButton = document.querySelector("#p2-three");
var p2MinusButton = document.querySelector("#p2-minus");
var resetButton = document.querySelector("#reset");
var p1Display = document.querySelector("#p1-display");
var p2Display = document.querySelector("#p2-display");
var p1post = document.querySelector("#team1_form_score");
var p2post = document.querySelector("#team2_form_score");
var game_id = document.querySelector("#winner-display");
//var winningScore = Number(numInput.value);
var p1Score = 0;
var p2Score = 0;
var gameOver = false;

p1AddButton.addEventListener("click", function(){
	if (!gameOver) { 
		p1Score++;
        /*
		if (p1Score === winningScore) {
			p1Display.classList.add("winner");
			gameOver = true;
			winnerText.textContent = "Player 1 wins!"
		}
        */
		p1Display.textContent = p1Score;
		p1post.value = p1Score;
	}
})

p1TwoButton.addEventListener("click", function(){
	if (!gameOver) { 
		p1Score = p1Score + 2;
        /*
		if (p1Score === winningScore) {
			p1Display.classList.add("winner");
			gameOver = true;
			winnerText.textContent = "Player 1 wins!"
		}
        */
		p1Display.textContent = p1Score;
		p1post.value = p1Score;
	}
})

p1ThreeButton.addEventListener("click", function(){
	if (!gameOver) { 
		p1Score = p1Score + 3;
        /*
		if (p1Score === winningScore) {
			p1Display.classList.add("winner");
			gameOver = true;
			winnerText.textContent = "Player 1 wins!"
		}
        */
		p1Display.textContent = p1Score;
		p1post.value = p1Score;
	}
})

p1MinusButton.addEventListener("click", function(){
	if (!gameOver && p1Score > 0) { 
		p1Score--;
		p1Display.textContent = p1Score;
		p1post.value = p1Score;
	}
	if (p1Score < 0) {
		alert("You cannot make score a negative number");
	}
})






p2AddButton.addEventListener("click", function(){
	if (!gameOver) {
		p2Score++;
        /*
		if (p2Score === winningScore) {
			p2Display.classList.add("winner");
			gameOver = true;
			winnerText.textContent = "Player 2 wins!"
		}
        */
		p2Display.textContent = p2Score;
		p2post.value = p2Score;
	}
})

p2TwoButton.addEventListener("click", function(){
	if (!gameOver) { 
		p2Score = p2Score + 3;
        /*
		p2Score = p2Score + 2;
		if (p1Score === winningScore) {
			p1Display.classList.add("winner");
			gameOver = true;
			winnerText.textContent = "Player 2 wins!"
		}
        */
		p2Display.textContent = p2Score;
		p2post.value = p2Score;
	}
})

p2ThreeButton.addEventListener("click", function(){
	if (!gameOver) { 
		p2Score = p2Score + 3;
        /*
		if (p1Score === winningScore) {
			p1Display.classList.add("winner");
			gameOver = true;
			winnerText.textContent = "Player 3 wins!"
		}
        */
		p2Display.textContent = p2Score;
		p2post.value = p2Score;
	}
})

p2MinusButton.addEventListener("click", function(){
	if (!gameOver && p2Score > 0) { 
		p2Score--;
		p2Display.textContent = p2Score;
		p2post.value = p2Score;
	}
	if (p2Score <= 0) {
		alert("You cannot make score a negative number");
	}
})

/*
resetButton.addEventListener("click", async function(){
	var payload = {
		p1score: p1Score,
		p2Score: p2Score,
		game_id: game_id
	};
	var data = new FormData();
	data.append( "json", JSON.stringify( payload ) );
	try {     
		const response = await fetch('/complete', {
		  method: 'post',
		  body: data
		});
		console.log('Completed!', response);
	} catch(err) {
		console.error(`Error: ${err}`);
	}
});
*/