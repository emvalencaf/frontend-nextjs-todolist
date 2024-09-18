# Aplicativo de Gerenciamento de Tarefas com Captura de Fotos - Next.js
## Visão Geral
Este é um aplicativo de gerenciamento de tarefas desenvolvido com Next.js. Ele permite que os usuários criem, editem, excluam e visualizem tarefas. Além disso, o aplicativo suporta a adição de fotos capturadas pela câmera, vinculando-as a tarefas específicas, e apresenta um carrossel de imagens para visualizar as fotos associadas a cada tarefa. O app também inclui funcionalidades de Speech-to-Text para entrada de dados por voz e suporte a PWA (Progressive Web App).

## Funcionalidades Principais
1. Gerenciamento de Tarefas (CRUD)
O aplicativo permite a criação, leitura, atualização e exclusão (CRUD) de tarefas. Cada tarefa contém informações como título, descrição, data de criação, data de atualização e prazo final (deadline).

Exemplo de Código:
O componente TaskForm gerencia a criação e edição de tarefas. Abaixo está um trecho de código que define como os dados da tarefa são manipulados:
```
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  onSubmit({ title, description, deadline });
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Título da Tarefa"
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Descrição"
    />
    <input
      type="datetime-local"
      value={deadline}
      onChange={(e) => setDeadline(e.target.value)}
    />
    <button type="submit">Salvar</button>
  </form>
);
```
Neste formulário, o usuário pode inserir o título, a descrição e o prazo da tarefa. Quando o formulário é enviado, os dados são enviados para o componente principal que faz o controle das tarefas.

2. Captura de Fotos
O aplicativo possui uma funcionalidade que permite capturar imagens diretamente da câmera do dispositivo. Essas imagens podem ser vinculadas a uma tarefa. Esta funcionalidade foi implementada usando a API de captura de mídia do navegador.

Exemplo de Código:
O seguinte trecho de código captura uma foto diretamente da câmera:

```
const capturePhoto = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement('video');
  video.srcObject = stream;
  video.play();

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  
  // Desenhar o frame do vídeo no canvas para capturar a foto
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  const photo = canvas.toDataURL('image/jpeg'); // Obter a imagem em base64
  setPhotos((prevPhotos) => [...prevPhotos, photo]); // Salvar a foto na lista de fotos
  stream.getTracks().forEach(track => track.stop()); // Parar o stream da câmera
};
```
Neste código, o vídeo da câmera é capturado e renderizado em um canvas. O frame atual do vídeo é transformado em uma imagem (base64) que é armazenada e associada à tarefa.

3. Visualização das Fotos no Carrossel
Cada tarefa pode conter várias fotos, e elas são exibidas em um carrossel de imagens. Foi utilizado o componente react-slick para implementar o carrossel.

Exemplo de Código:
```
{photos.length > 0 && (
  <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
    {photos.map((photo, index) => (
      <div key={index}>
        <img src={photo} alt={`task-photo-${index}`} className="w-full h-auto object-cover rounded" />
      </div>
    ))}
  </Slider>
)}
```
Esse código verifica se há fotos associadas à tarefa e, se houver, renderiza-as usando o carrossel. O carrossel apresenta uma imagem por vez, com transições suaves entre as fotos.

4. Prioridade das Tarefas com Base no Deadline
As tarefas são destacadas visualmente com cores diferentes, dependendo de quão próxima está a data de entrega. Isso ajuda o usuário a identificar tarefas urgentes.

Exemplo de Código:
```
let priorityClass = 'outline-gray-200'; // Cor padrão
if (hoursLeft <= 5) {
  priorityClass = 'outline-red-500'; // Urgente
} else if (hoursLeft <= 24) {
  priorityClass = 'outline-orange-500'; // Perto do prazo
} else if (daysLeft <= 5) {
  priorityClass = 'outline-yellow-500'; // Prazos próximos
}
```
O código acima calcula quantas horas e dias faltam para o prazo final da tarefa. Dependendo do tempo restante, uma cor é atribuída à borda da tarefa para indicar sua prioridade.

5. Edição e Exclusão de Tarefas
Cada tarefa possui botões de ação para edição, exclusão e marcação como concluída. Esses botões são exibidos no canto superior direito da tarefa.

Exemplo de Código:
```
<div className="flex space-x-2">
  {isDone ? (
    <FaUndo className="text-yellow-500 cursor-pointer hover:text-yellow-700 transition-colors" onClick={() => onToggleComplete(id)} />
  ) : (
    <FaCheck className="text-green-500 cursor-pointer hover:text-green-700 transition-colors" onClick={() => onToggleComplete(id)} />
  )}
  <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" onClick={() => setIsEditing(true)} />
  <FaTrash className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" onClick={() => onDelete(id)} />
</div>
```
Neste trecho, o ícone de editar (FaEdit) permite editar uma tarefa, o ícone de check (FaCheck) marca uma tarefa como concluída, e o ícone de lixeira (FaTrash) exclui a tarefa.

6. Entrada de Texto por Voz (Speech-to-Text)
O aplicativo também suporta a entrada de texto por voz usando a API Web Speech do navegador, permitindo que o usuário dicte o título e a descrição da tarefa.

Exemplo de Código:
```
const handleVoiceInput = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR'; // Define o idioma para português

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setDescription(transcript); // Define a transcrição como a descrição da tarefa
  };

  recognition.onerror = (event) => {
    console.error("Erro no reconhecimento de voz: ", event.error);
  };
};
```
Este código inicializa a API de reconhecimento de fala, captura a entrada de voz e a converte em texto que é armazenado como a descrição da tarefa.

7. Progressive Web App (PWA)
O aplicativo foi configurado para funcionar como um PWA, permitindo que os usuários instalem-no em seus dispositivos e o utilizem offline.

Exemplo de Código (Configuração do next-pwa):
```
// next.config.mjs
import withPWAInit from '@ducanh2912/next-pwa';


const withPWA = withPWAInit({
    dest: "public",
});


export default withPWA({
    // Next.JS config
});
```
O código acima habilita o PWA no ambiente de produção, utilizando o plugin next-pwa. Isso permite que o aplicativo funcione offline, seja instalado no dispositivo do usuário, e ofereça uma experiência semelhante a aplicativos nativos.



## Tecnologias Utilizadas
- **Next.js**: Framework de React que oferece renderização do lado do servidor (SSR) e geração estática.
- **TypeScript**: Adiciona tipagem estática ao JavaScript, facilitando o desenvolvimento mais seguro.
- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e eficiente.
- **React Slick**: Biblioteca de carrossel utilizada para exibir fotos das tarefas.
- **MediaDevices API**: API do navegador usada para capturar imagens da câmera.
## Como Executar o Projeto Localmente
1. Clone este repositório: `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Abra o terminal na raiz do projeto
3. Instale as bibliotecas no ambiente do seu projeto: `npm install`
4. Execute o projeto no terminal: `npm run dev`

O aplicativo estará disponível em http://localhost:3000.

## Conclusão
Este aplicativo oferece uma solução prática e funcional para o gerenciamento de tarefas, com recursos avançados como captura de fotos e visualização em carrossel. Sinta-se à vontade para contribuir e melhorar este projeto.