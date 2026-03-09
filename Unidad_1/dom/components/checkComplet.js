const checkComplete = () => {
  const i = document.createElement("i");
  i.classList.add("fa-regular", "fa-check-double", "icon");
  i.addEventListener("click", completeTask);
  return i;
};
const completeTask = (evento) => {
  const element = evento.target;
  element.classList.toggle("fa-regular");
  element.classList.toggle("fa-solid");
  
  element.classList.toggle("completeIcon"); 
};

export default checkComplete;