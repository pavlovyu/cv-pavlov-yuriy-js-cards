import {Search, MyAlert, Modal, CardShort} from "./classes.js";
import {update} from "./main.js"

//*************************************** Авторизація Сергій *********************************************************//

export function entry() {
    document.querySelector(".inp")?.addEventListener("click", async () => {
        try {
            let email = document.querySelector("#email").value,
                password = document.querySelector("#password").value,
                req = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: `${email}`, password: `${password}`}),
                }),
                res = await req.text();
            if (req.ok) {
                if (!localStorage.getItem("author")) {
                    localStorage.setItem("author", res);
                    localStorage.setItem("btn", "Cтворити картку");
                    document.querySelector(".enter").innerText = localStorage.getItem("btn");
                    new Search().set();
                    new Modal().remove();
                    await update()
                } else {
                    localStorage.setItem("btn", "Вхід");
                }
            } else {
                throw `Перевірте введені дані... response.status: ${req.status} , response.ok: ${req.ok}`;
            }
        } catch (e) {
            new Modal().remove();
            new MyAlert("Помилка запиту!", e).set();
        }
        new MyAlert("Ваш токен:", localStorage.getItem("author").slice(0, 18) + "..............").set();

    });
}

//******************************* Запити на сервер Юра ***************************************************************//

export function modeGetAll() {
    if (localStorage.getItem("author")) {
        return fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("author")}`,
            },
        })
            .then(res => res.json())
            .then(res => {
                    document.querySelector('.no-items')?.remove()
                    document.querySelector(".result-search").style.overflowY = "scroll";
                    res.forEach(e => {
                        new CardShort(e).set()
                    })
                    document.querySelector(".search")?.addEventListener("click", _ => search(res));
                    return res
                }
            );
    }
}

export function modeDelete(id) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("author")}`,
        },
    })
        .then(async res => {
            if (res.ok) {
                new MyAlert("Відповідь сервера!", `Картку id : ${id} було видалено`).set();
                await update()
            } else {
                throw res.status;
            }
        })
        .catch((e) => {
            new MyAlert("Відповідь сервера!", "Непередбачена помилка видалення картки" + e).set();
        });
}

//***************************************** Пошук Сергій та Діма *****************************************************//

export function search(cards) {
    let arrResSearch = [];
    const search = document.querySelector("#content-search").value;
    const status = document.querySelector("#status").value;
    const category = document.querySelector("#category").value;
    const elemResSearch = document.querySelector(".result-search");

    function statusChange(cards) {
        cards.forEach(e => {
            if (e.statusVisit === status) {
                arrResSearch.push(e)
            }
        })

    }

    function categoryChange(cards, bool = true) {
        !bool ? arrResSearch = [] : null
        cards.forEach(e => {
            if (e.categoryVisit === category) {
                arrResSearch.push(e)
            }
        })
    }

    function searchChange(cards) {
        arrResSearch = [];
        let pattern = search.toString().toLowerCase();
        cards.forEach(e => {
            let field = [e.description, e.doctor, e.firstName, e.middleName, e.surname, e.id];
            field.forEach(c => c.toString().toLowerCase().includes(pattern) ? arrResSearch.push(e) : null);
        })
    }

    arrResSearch = [];
    if (status !== 'Всі' && category === 'Всі') statusChange(cards);
    if (status === 'Всі' && category !== 'Всі') categoryChange(cards);
    if (status !== 'Всі' && category !== 'Всі') {
        statusChange(cards);
        categoryChange(arrResSearch, false);
    }

    if (status === 'Всі' && category === 'Всі') arrResSearch = cards;

    Boolean(search) ? searchChange(arrResSearch) : null;

    elemResSearch.innerHTML = "";
    arrResSearch.forEach((e) => new CardShort(e).set());
    arrResSearch = []
}