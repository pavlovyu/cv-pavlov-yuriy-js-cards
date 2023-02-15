import {
    Modal, Enter, Search, MyAlert, Visit, Doctor, CardiologistFull, TherapistFull,
    DentistFull, VisitCardiologist, VisitDentist, VisitTherapist, CardShort
} from "./classes.js";

import dragAndDrop from "./drag-and-drop.js";
import {entry, modeGetAll, modeDelete, search} from "./query.js";

export let cards           //434 динамічний імпорт в PUT запиту

document.querySelector(".exit").addEventListener("click", exit);

async function exit() {
    if (localStorage.getItem("author")) {
        document.querySelector(".result-search").style.overflowY = "none";
        localStorage.removeItem("author");
        document.querySelector(".remove").remove();
        document.querySelectorAll(".card-aside")?.forEach((e) => e.remove());
        document.querySelectorAll(".card-main")?.forEach((e) => e.remove());
        document.querySelector(".result-search").appendChild(Object.assign(document.createElement("div"), {
            className: 'no-items',
            textContent: "No items have been added"
        }));
        await update();
        document.location.reload()
    }
}

await update();

export async function update() {
    let enter = document.querySelector(".enter");
    if (localStorage.getItem("author")) {
        !cards ? cards = await modeGetAll() : null
        entry()
        new Search().set();
        cards ? document.querySelector('.search').addEventListener('click', _ => search(cards)) : null
    } else {
        localStorage.setItem("btn", "Вхід");
    }
    enter.innerText = localStorage.getItem("btn");
}

// import {cards as cardsImp} from "./query.js"
// cards === undefined ? cards = cardsImp : null

const cardsAll = document.querySelector(".get-All");
cardsAll.addEventListener("click", _ => console.log(cards)); //тест выгрузки ранее полученного массива в консоль

document.querySelector(".enter").addEventListener("click", async () => {
    if (localStorage.getItem("author")) {
        new Visit().set();
        new Doctor().changeDoctor();
    } else {
        new Enter().set();
        entry();
    }
});

document.querySelector(".aside").addEventListener("click", (e) => {
    let main = document.querySelector(".main"),
        count = e.target.getAttribute("data-btn");
    if (count) {
        if (main.querySelector(`[data-mn="${count}"]`)) {
            new MyAlert("Повторна дія", "Картку вже відкрито на робочому полі").set();
        } else {
            cards.forEach((e) => {
                if (+e.id === +count) {
                    switch (e.doctor) {
                        case "Кардіолог":
                            new CardiologistFull(e).set();
                            break;
                        case "Терапевт":
                            new TherapistFull(e).set();
                            break;
                        case "Стоматолог":
                            new DentistFull(e).set();
                    }
                }
            });
            dragAndDrop(document.querySelector(`[data-mn="${count}"]`));
        }
    }
});

document.querySelector(".main").addEventListener("click", (e) => {
    const dataEditeId = e.target.getAttribute("data-edit");
    let inputs = [];
    if (dataEditeId) {
        cards.forEach((e) => {
            if (+e.id === +dataEditeId) {
                new Visit().set();
                new Doctor().changeDoctor();
                switch (e.doctor) {
                    case "Кардіолог":
                        new VisitCardiologist().set();
                        break;
                    case "Терапевт":
                        new VisitTherapist().set();
                        break;
                    case "Стоматолог":
                        new VisitDentist().set();
                        break;
                }

                inputs = document.querySelectorAll(
                    "#form-left textarea, #form-left input, #form-right input, #form-right select"
                );

                inputs.forEach((elem) => {
                    for (const key in e) {
                        if (elem.id === key)
                            if (elem.id === "statusVisit") {
                                if (e[key] === "Виконано") {
                                    elem.checked = true
                                }
                                if (e[key] === "В роботі") {
                                    elem.checked = false
                                }
                            } else {
                                elem.value = e[key];
                            }
                    }
                });
            }
        });

        if (!document.querySelector(".button-delete")) {
            const formDivCol = document.querySelector(".form-div--col");
            const buttonDelete = document.createElement("button");
            formDivCol?.prepend(buttonDelete);
            Object.assign(buttonDelete, {
                className: "button-delete btn",
                textContent: "Видалити",
            });
        }
        document.querySelector('.button-delete').addEventListener('click', buttonDelete)
        const button = document.querySelector(".button-post");

        if (button) {
            button.dataset.put = dataEditeId;
            button.innerHTML = "Змінити";
        }
    }
})

//******************************* Запити на сервер Юра та Сергій *****************************************************//

function buttonDelete() {
    const id = document.querySelector('.button-delete').nextElementSibling.getAttribute('data-put')
    document.querySelectorAll(".card-main")
        .forEach(e => e.getAttribute('data-mn') === id ? e.remove() : null)
    document.querySelectorAll(".card-aside")
        .forEach(e => e.getAttribute('id') === id ? e.remove() : null)
    cards.forEach((e, i) => +e.id === +id ? cards.splice(i, 1) : null)
    new Modal().remove()
    modeDelete(id)
}

export function modePost(obj) {
    fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("author")}`,
        },
        body: JSON.stringify(obj),
    })
        .then(res => res.json())
        .then(async res => {
            new MyAlert("Відповідь сервера!", "Вашу картку отримано, їй присвоєно id :" + res.id).set();
            cards.push(res)
            new CardShort(res, false).set()
            await update()
        })
        .catch((e) => {
            new MyAlert("Відповідь сервера!", "Картку не було додано: непередбачувана помилка" + e).set();
        });
}

export function modePut(obj, idPut) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${idPut}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("author")}`,
        },
        body: JSON.stringify(obj),
    })
        .then(res => res.json())
        .then(async res => {
            new MyAlert("Відповідь сервера!", "Зміни були внесені id :" + res.id).set();
            cards.forEach((e, i) => +e.id === +res.id ? cards.splice(i, 1) : null)
            cards.push(res)
            await update()
        })
        .catch((e) => {
            new MyAlert("Відповідь сервера!", "Зміни не внесені: непередбачувана помилка" + e).set();
        });
}
