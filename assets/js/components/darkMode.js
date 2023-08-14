function darkModeJS () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", () => {
        console.log('aqui entro al click'),
        body.classList.toggle("dark-mode");
    });
}

export default darkModeJS