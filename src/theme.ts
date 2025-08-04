const lsTheme = document.documentElement.attributes.getNamedItem("data-theme")?.value

const form = document.querySelector<HTMLFormElement>('.theme-picker')!;
if (lsTheme) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="theme"][value="${lsTheme}"]`);
    if (radio) {
        radio.checked = true
    }
}

form.addEventListener('change', () => {
    const data = new FormData(form);
    const theme = data.get('theme')?.toString() ?? "";
    try {
        localStorage.setItem("tint__theme", theme)
    } catch { }
    document.documentElement.setAttribute("data-theme", theme)
});
