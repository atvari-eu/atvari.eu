document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const link = document.getElementById("contact-form-button");
  if (!form || !link) return;

  const updateHref = () => {
    const name = form.elements["Name"].value;
    const message = form.elements["message"].value;
    const body = `${message}\n\n${name}`;

    link.href = `mailto:${encodeURIComponent(form.dataset.mailto)}?subject=${encodeURIComponent(form.dataset.mailtoSubject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener("input", updateHref);
  updateHref();

  link.addEventListener("click", () => {
    const status = document.getElementById("contact-form-status");
    if (status) status.textContent = form.dataset.mailtoStatus;
  });

  form.addEventListener("submit", (event) => event.preventDefault());
});
