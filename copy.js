// 复制文本
export default function copy(text) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove()
}
