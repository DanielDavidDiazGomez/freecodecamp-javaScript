function convertMarkdown() {
  const markdown = document.getElementById('markdown-input').value;
 
  let html = markdown;
 
  // Encabezados (de mayor a menor nivel de #, para que no se pisen entre sí)
  html = html.replace(/^ *### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^ *## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^ *# (.*)$/gm, '<h1>$1</h1>');
 
  // Citas
  html = html.replace(/^ *> (.*)$/gm, '<blockquote>$1</blockquote>');
 
  // Negrita (** o __)
  html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*)__/g, '<strong>$1</strong>');
 
  // Cursiva (* o _)
  html = html.replace(/\*(.*)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*)_/g, '<em>$1</em>');
 
  // Imágenes (deben procesarse antes que los enlaces por el '!' inicial)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');
 
  // Enlaces
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
 
  return html;
}
 
function updatePanes() {
  const html = convertMarkdown();
  document.getElementById('html-output').textContent = html;
  document.getElementById('preview').innerHTML = html;
}
 
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('markdown-input');
  input.addEventListener('input', updatePanes);
  updatePanes();
});
 
