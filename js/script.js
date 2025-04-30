//объект данных по проекту
let projectCardData = new Object();

//открыть всплывающее окно
console.log(document.querySelectorAll(".section .custom-button"));
document.querySelectorAll(".section .custom-button").forEach((e) => {
    // console.log(e);
    e.addEventListener("click", function (event) {
        // console.log(event);
        // console.log(event.target.parentElement);

        //получить данные из полей где нажата кнопка
        let section = event.target.parentElement;
        projectCardData.projectTitle = section.querySelector(".project-title").innerText;
        projectCardData.projectDescription = section.querySelector(".project-description").innerText;
        projectCardData.joke = section.querySelector(".joke").innerHTML;
        projectCardData.techStackHTML = section.querySelector(".tech-stack").innerHTML;
        projectCardData.techStack = [];
        section.querySelector(".tech-stack").querySelectorAll(".tech-tag").forEach((elem, i) => {
            projectCardData.techStack.push(elem.innerText);
        });
        projectCardData.responsibleHTML = section.querySelector(".responsible").innerHTML;
        projectCardData.responsible = [];
        section.querySelector(".responsible").querySelectorAll("li").forEach((elem, i) => {
            projectCardData.responsible.push(elem.innerText);
        });

        //записать данные в поля сплывающего окна
        let projectCard = document.querySelector(".project-card")
        projectCard.querySelector(".project-title").innerHTML = projectCardData.projectTitle;
        projectCard.querySelector(".project-description").innerHTML = projectCardData.projectDescription;
        projectCard.querySelector(".joke").innerHTML = projectCardData.joke;
        projectCard.querySelector(".tech-stack").innerHTML = projectCardData.techStackHTML;
        projectCard.querySelector(".responsible").innerHTML = projectCardData.responsibleHTML;

        projectCard.classList.add("enable");
        document.querySelector(".project-card-close").classList.add("enable");
    });
});

//отправка данных проекта при нажатии на кнопку отправить в сплывающем окне
document.querySelector(".action-buttons button").addEventListener("click", function (event) {
    function toFormData(o) {
        delete projectCardData.techStackHTML;
        delete projectCardData.responsibleHTML;
        return Object
            .entries(o)
            .reduce((d, e) => (d.append(...e), d), new FormData());
    }

    fetch('./send-project/', {
        method: 'POST',
        body: toFormData(projectCardData)
    }).then(r => r.json())
        .then(console.log)
        .then(projectCardData = new Object())
        .then(location.reload(true));
});

//закрыть всплывающее окно заявки
document.querySelector(".project-card-close").addEventListener("click", function (event) {
    document.querySelector(".project-card").classList.remove("enable");
    document.querySelector(".project-card-close").classList.remove("enable");

    projectCardData = new Object();
});