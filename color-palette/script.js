function changeColor() {
  const button = document.getElementById('myButton');
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
}

function addComment() {
  const commentInput = document.getElementById('commentInput');
  const commentSection = document.getElementById('commentSection');
  const newComment = document.createElement('p');
  newComment.textContent = commentInput.value;
  commentSection.appendChild(newComment);
  commentInput.value = "";
}


function showSelected() {
  const select = document.getElementById('mySelect');
  const selectedValue = select.value;
  alert(`You choose: ${selectedValue}`);

document.body.style.backgroundColor = "black";
document.body.style.color = "white";
  
}