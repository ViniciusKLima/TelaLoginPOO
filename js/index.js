var formSignin = document.querySelector('#signin')
var formSignup = document.querySelector('#signup')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px"
    formSignup.style.left = "450px"
    btnColor.style.left = "0px"
})

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px"
    formSignup.style.left = "25px"
    btnColor.style.left = "110px"
})

function cadastrarUsuario(event) {
  event.preventDefault();
  const notification = document.getElementById("notification");
  const form = document.getElementById("signup");

  // Exibe a notificação
  notification.classList.add("show");

  // Esconde a notificação após 3 segundos
  setTimeout(() => {
      notification.classList.remove("show");
  }, 2000);

  setTimeout(() => {
    form.submit();
  }, 3000)
}

function fazerLogin(event) {
  event.preventDefault(); // Impede o envio do formulário

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  if (nome && senha) {
      // Credenciais corretas, redireciona para a página restrita
      window.location.href = "principal/principal.html"; // Caminho para a página restrita
  }
}