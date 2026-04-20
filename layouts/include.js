function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => console.error("Component load error:", err));
}

loadComponent("header", "layouts/header/header.html");
loadComponent("footer", "layouts/footer/footer.html");
