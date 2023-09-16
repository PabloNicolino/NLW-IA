import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  
  if(!videoURL.includes("shorts")) {
    return content.textContent = "Esse vídeo não parece ser um short."
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log(videoID)

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID) //await quer dizer que ele tem que esperar essa etapa acabar. para o await funcionar tem que usar o async antes do event.

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})