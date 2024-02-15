let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Resetbtn");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let heading = document.getElementById("heading");

let turnO = true;

const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    document.body.style.backgroundImage = "";
    heading.style.color = "";
    
}
const toggleMsg = () => {
    
    if(msg.style.color === "gold"){
        msg.style.color = "black";
    }else{
        msg.style.color = "gold";
    }
        
};

const changeBackground = () => {
    document.body.style.backgroundImage = "url('/Users/suruchigupta/Desktop/Javascript/Games/Fireworks_03.jpg')";
    document.body.style.backgroundSize = "100% 110%";
    heading.style.color = "black";
    let intervalId = setInterval(toggleMsg, 300);
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = 'true';
        let check = checkWinner();
        if(check){
            box.style.color = 'red';
            changeBackground();
        }

    });
});

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `${winner} Wins the Round!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winConditions){
       let pos1 =  boxes[pattern[0]].innerText;
       let pos2 =  boxes[pattern[1]].innerText;
       let pos3 =  boxes[pattern[2]].innerText;

       if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3)
                {
                    
                    showWinner(pos1);
                    return true;
                }
       }
                
    }
    return false;
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);