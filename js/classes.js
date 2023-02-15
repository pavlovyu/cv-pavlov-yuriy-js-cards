import {modePost, modePut} from "./main.js";
import dragAndDrop from "./drag-and-drop.js";

//************************************** ▼ Суперклас модального вікна Сергій ▼ ****************************************//

export class Modal {
    constructor() {
        this.classArr = ["modal", "modal-content", "modal-header", "modal-title"];
        this.wrapper = document.querySelector(".wrapper");
        this.h3 = document.createElement("h3");
        this.a = document.createElement("a");
        this.body = document.createElement("div");
        this.count = 0;
        this.elTranslateY = [
            {transform: "translateY(-110%)"},
            {transform: "translateY(0%) "},
        ];
        this.outElTranslateY = [
            {transform: "translateY(0%)"},
            {transform: "translateY(-110%) "},
        ];
        this.elTiming = {duration: 600, iterations: 1};
    }

    recursion() {
        if (this.count < 3) {
            this.createStructure(this.count++);
        }
    }

    createStructure() {
        const el = document.createElement("div");
        el.classList.add(this.classArr[this.count]);
        if (this.count === 0) {
            el.setAttribute("id", "openModal");
            this.wrapper.prepend(el);
            this.recursion();
        } else if (this.count <= 2) {
            document
                .querySelector(`[class='${this.classArr[this.count - 1]}']`)
                .appendChild(el);
            this.recursion();
        } else {
            const header = document.querySelector(
                `[class='${this.classArr[this.count - 1]}']`
            );
            this.h3.classList.add(this.classArr[this.count]);
            Object.assign(this.a, {
                className: "close",
                title: "Закрити модальне вікно",
            });
            header.appendChild(this.h3);
            header.appendChild(this.a).innerText = "×";
        }
        document
            .querySelector(".modal-content")
            .appendChild(this.body)
            .classList.add("modal-body");
        el.animate(this.elTranslateY, this.elTiming);
    }

    createModalHeader() {
        this.h3.innerText = "Header";
    }

    createModalContent() {
        Object.assign(this.body, {textContent: "Успадкуйте клас від Modal"});
    }

    hidden() {
        const el = document.querySelector(".modal");
        el.style.opacity = "0";
    }

    remove() {
        const modal = document.querySelector(".modal");
        modal.animate(this.outElTranslateY, this.elTiming);
        setTimeout(_ => {
            modal.remove();
        }, this.elTiming.duration - 50);
    }

    set() {
        this.a.addEventListener("click", _ => {
            this.remove();
            const el = document.querySelectorAll(".modal");
            el[1] ? (el[1].style.opacity = "1") : null;
        });

        this.createStructure();
        this.createModalHeader();
        this.createModalContent();
    }
}

//********************************************* ▼ клас вікна пошуку Юра ▼ ********************************************//

export class Search {
    constructor() {
        this.form = document.createElement("form");
        this.divForm = document.querySelector(".form");
        this.arrFor = ["content-search", "status", "category"];
        this.arrValue = ["пошук за вмістом:", "пошук за статусом:", "терміновість візиту:",];
        this.inputSearch = document.createElement("input");
        this.status = document.createElement("select");
        this.category = document.createElement("select");
        this.statusArr = ["Всі", "В роботі", "Виконано"];
        this.categoryArr = ["Всі", "Висока", "Нормальна", "Нетермінова"];
        this.button = document.createElement("p");
    }

    createStructure() {
        this.divForm.appendChild(this.form).classList.add("remove");
        this.arrFor.forEach((e, i) => {
            let div = document.createElement("div"),
                label = document.createElement("label");
            div.classList.add("form-div--margin");
            label.setAttribute("for", `${e}`);
            this.form.appendChild(div).appendChild(label).innerText =
                this.arrValue[i];
            switch (e) {
                case "status":
                    div.appendChild(this.status).classList.add("form-child--margin");
                    this.status.setAttribute("id", e);
                    break;
                case "category":
                    div.appendChild(this.category).classList.add("form-child--margin");
                    this.category.setAttribute("id", e);
            }
        });
        Object.assign(this.inputSearch, {
            className: "form-child--margin",
            id: "content-search",
            type: "text",
            placeholder: "content-search",
        });
        this.form.appendChild(this.button).innerText = "Пошук";
        Object.assign(this.button, {
            className: "btn search item"
        });
        document.querySelector(".form-div--margin").append(this.inputSearch);
    }

    createSelect() {
        this.categoryArr.forEach((e, i) => {
            let opStat = document.createElement("option"),
                opCat = document.createElement("option");
            this.statusArr[i] ? (this.status.appendChild(opStat).innerText = this.statusArr[i]) : null;
            this.category.appendChild(opCat).innerText = e;
        });
    }

    remove() {
        document.querySelector(".remove") ? document.querySelector(".remove").remove() : null;
    }

    set() {
        this.remove();
        this.createStructure();
        this.createSelect();
    }
}

//************************************ ▼ Клас користувальницького алерту Сергій ▼ ************************************//

export class MyAlert extends Modal {
    constructor(head, message) {
        super();
        this.head = head;
        this.message = message;
        this.modal = document.querySelector(".modal");
    }

    createModalHeader() {
        this.h3.innerText = this.head;
        document.querySelector(".modal-header").classList.add("modal-header--err");
        document.querySelector(".close").classList.add("close--err");
    }

    createModalContent() {
        this.body.insertAdjacentHTML(
            "beforeend",
            `<p class="message">${this.message}</p>`
        );
    }
}

//******************************************* ▼    Клас входу  Юра   ▼ ************************************************/

export class Enter extends Modal {
    constructor() {
        super();
        this.formSearch = document.createElement("form")
        this.divSearch = document.createElement("div")
        this.lbEmail = document.createElement("label")
        this.inpEmail = document.createElement("input")
        this.lbPass = document.createElement("label")
        this.inpPass = document.createElement("input")
        this.formDivCol = document.createElement("div")
        this.divColBtn = document.createElement("button")
        this.wrp = this.body.appendChild(this.formSearch).appendChild(this.divSearch)
    }

    createModalHeader() {
        this.h3.innerText = "Вхід";
    }

    createModalContent() {
        this.divSearch.classList.add("enter-form-div--margin")
        this.lbEmail.setAttribute("for", "email")
        this.lbEmail.innerText = "Eлектронна пошта:"
        Object.assign(this.inpEmail, {
            className: "form-child--margin",
            id: "email",
            type: "email",
            placeholder: "email",
        })
        this.lbPass.setAttribute("for", "password")
        this.lbPass.innerText = "Пароль:"
        Object.assign(this.inpPass, {
            className: "form-child--margin",
            id: "password",
            type: "password",
            placeholder: "password",
        })
        this.formDivCol.classList.add("form-div--col")
        this.divColBtn.innerText = "Вхід"
        Object.assign(this.divColBtn, {
            className: "inp btn",
            title: "Увійти в кабінет",
        })
        this.wrp
            .appendChild(this.lbEmail)
            .appendChild(this.inpEmail)
        this.wrp
            .appendChild(this.lbPass)
            .appendChild(this.inpPass)
        this.body.appendChild(this.formDivCol).appendChild(this.divColBtn)
    }
}

//**************************************** ▼ клас заповнення картки Дима ▼ ********************************************/

export class Visit extends Modal {
    constructor() {
        super();
        this.buttonPost = document.createElement("button");
        this.formLeft = document.createElement("form");
        this.formRight = document.createElement("form");
        this.formButton = document.createElement("div");
        this.divFormLeft = document.createElement("div");
        this.divFormRight = document.createElement("div");
        this.lableName = ["Ім'я", "Прізвище", "По-батькові", "Mета візиту", "Короткий опис візиту", "Статус – виконано!"];
        this.idLable = ["firstName", "surname", "middleName", "goal", "description", "statusVisit"];
        this.urgency = ["Терміновість", "Висока", "Нормальна", "Нетермінова"];
        this.doctor = ["Оберіть лікаря", "Кардіолог", "Терапевт", "Стоматолог"];
        this.idRight = ["categoryVisit", "doctor"];
        this.lableNameRight = ["Терміновість", "Оберіть лікаря"];
    }

    createModalHeader() {
        this.h3.innerText = "Картка";
    }

    createForm(param, i) {
        let label = document.createElement("label"),
            element = document.createElement(param);
        label.setAttribute("for", this.idLable[i]);
        label.innerText = this.lableName[i];
        Object.assign(element, {
            className: "form-child--margin",
            id: this.idLable[i],
            placeholder: this.lableName[i],
        });
        this.divFormLeft.appendChild(label);
        this.divFormLeft.appendChild(element);
    }

    createCardFormLeft() {
        this.formLeft.setAttribute("id", "form-left");
        this.body
            .appendChild(this.formLeft)
            .appendChild(this.divFormLeft)
            .classList.add("enter-form-div--margin");
        this.lableName.forEach((e, i) => {
            if (i <= 3) {
                this.createForm("input", i);
            } else if (i === 4) {
                this.createForm("textarea", i);
            } else if (i === 5) {
                let label = document.createElement("label"),
                    input = document.createElement("input"),
                    p = document.createElement("p");
                label.innerText = this.lableName[i];
                Object.assign(input, {
                    id: "statusVisit",
                    type: "checkbox",
                });
                this.divFormLeft.appendChild(p);
                p.classList.add("p-check");
                p.appendChild(label);
                p.appendChild(input);
                label.setAttribute("for", this.idLable[i]);
            }
        });
    }

    createOption(arr, select) {
        arr.forEach((e, i) => {
            let option = document.createElement("option");
            option.setAttribute("value", e);
            option.innerText = e;
            select.appendChild(option);
            if (i === 0) {
                option.setAttribute("disabled", "true");
            }
        });
    }

    createCardFormRight() {
        this.formRight.setAttribute("id", "form-right");
        this.body.appendChild(this.formRight).appendChild(this.divFormRight);
        this.divFormRight.setAttribute(
            "class",
            "enter-form-div--margin enter-form"
        );
        for (let i = 0; i < 2; i++) {
            let label = document.createElement("label"),
                select = document.createElement("select");
            label.innerText = this.lableNameRight[i];
            Object.assign(label, {
                for: this.idRight[i]
            });
            Object.assign(select, {
                className: "form-child--margin",
                id: this.idRight[i],
            });
            if (i === 0) {
                this.createOption(this.urgency, select);
            } else if (i === 1) {
                this.createOption(this.doctor, select);
            }
            this.divFormRight.appendChild(label);
            this.divFormRight.appendChild(select);
        }
    }

    createCardFormButton() {
        Object.assign(this.buttonPost, {
            className: "button-post btn",
            textContent: "Створити",
        });
        this.formButton.setAttribute("class", "form-div--col");
        this.body.appendChild(this.formButton).appendChild(this.buttonPost);
    }

    createModalContent() {
        this.createCardFormLeft();
        this.createCardFormRight();
        this.createCardFormButton();
    }
}

//****************************************** ▼ Kлас вибору лікарів Сергій ▼ *******************************************/

export class Doctor extends Visit {
    constructor() {
        super();
        this.change = document.getElementById(this.idRight[1]);
        this.enterForm = document.querySelector(".enter-form");
        this.obj = {};
    }

    removeFieldChange() {
        document.querySelector(".field-change")?.remove();
        this.selectBox = document.createElement("dev");
        this.selectBox.setAttribute("class", "field-change");
    }

    changeDoctor() {
        this.change.addEventListener("change", (e) => {
            switch (e.target.value) {
                case this.doctor[1]:
                    new VisitCardiologist().set();
                    break;
                case this.doctor[2]:
                    new VisitTherapist().set();
                    break;
                case this.doctor[3]:
                    new VisitDentist().set();
                    break;
            }
        });
        document.querySelector('[data-edit]') ? this.POST_PUT() : this.POST_PUT(false)
    }

    //************************************ ▼ метод valid() POST_PUT() Сергій та Діма ▼ ****************************************/
    valid(obj, key, value) {
        if (value !== "" && value !== "Оберіть лікаря" && value !== "Терміновість") {
            if (key === 'statusVisit') {
                if (value === true) {
                    obj[key] = "Виконано"
                }
                if (value === false) {
                    obj[key] = "В роботі"
                }
            } else {
                obj[key] = value;
            }
        } else {
            throw `Не всі поля заповнені! id поля:  ` + key;
        }
    }

    POST_PUT(bool = true) {
        document.querySelector(".button-post").addEventListener("click", (e) => {
            const inputs = document.querySelectorAll("#form-left textarea, #form-left input, #form-right input, #form-right select");
            for (const e of inputs) {
                try {
                    if (e.type === "checkbox") {
                        this.valid(this.obj, e.id, e.checked);
                    } else {
                        this.valid(this.obj, e.id, e.value);
                    }
                } catch (e) {
                    new Modal().hidden();
                    new MyAlert("Помилка заповнення", e).set();
                    return;
                }
            }

            new Modal().remove();

            (async () => {
                let {cards} = await import("./main.js");
                const evenId = e.target.dataset.put;
                cards.forEach((e, i) => {
                    if (e.id === +evenId) {
                        cards.splice(i, 1, this.obj);
                    }
                });

                if (bool) {
                    document.querySelector(`[data-mn="${evenId}"]`).remove();
                    document.getElementById(evenId).remove();
                }

                !bool ? modePost(this.obj) : modePut(this.obj, evenId);

                cards.forEach((e) => {
                    if (e.id === undefined || e.id === evenId) {
                        e.id = evenId;
                        new CardShort(e, false).set();
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
                        dragAndDrop(document.querySelector(`[data-mn="${e.id}"]`));
                    }
                });
            })();
        });
    }
}

//********************************* ▲ метод valid() POST_PUT() Сергій та Діма кінець ▲ ************************************/

export class VisitCardiologist extends Doctor {
    constructor() {
        super();
        this.idFor = ["pressure", "BMI", "previousDiseas", "CardiologistAge"];
        this.variant = ["Звичайний тиск", "Індекс маси тіла", "Перенесені захворювання серцево-судинної системи", "Вік"];
    }

    set() {
        this.removeFieldChange();
        this.enterForm.appendChild(this.selectBox);
        this.idFor.forEach((e, i) => {
            this.label = document.createElement("label");
            this.input = document.createElement("input");
            Object.assign(this.label, {
                for: this.idFor[i],
                textContent: this.variant[i],
            });
            Object.assign(this.input, {
                id: this.idFor[i],
                className: "form-child--margin",
                placeholder: this.variant[i].slice(0, 23),
            });
            this.selectBox.appendChild(this.label);
            this.selectBox.appendChild(this.input);
        });
    }
}

export class VisitTherapist extends Doctor {
    constructor() {
        super();
        this.label = document.createElement("label");
        this.input = document.createElement("input");
    }

    set() {
        this.removeFieldChange();
        this.enterForm.appendChild(this.selectBox);
        this.label.innerText = "вік";
        Object.assign(this.label, {
            for: "therapistAge",
        });
        Object.assign(this.input, {
            className: "form-child--margin",
            id: "therapistAge",
        });
        this.selectBox.appendChild(this.label);
        this.selectBox.appendChild(this.input);
    }
}

export class VisitDentist extends Doctor {
    constructor() {
        super();
        this.label = document.createElement("label");
        this.input = document.createElement("input");
    }

    set() {
        this.removeFieldChange();
        this.enterForm.appendChild(this.selectBox);
        this.label.innerText = "Дата останнього відвідування";
        Object.assign(this.label, {
            for: "VisitDentistDate",
        });
        Object.assign(this.input, {
            id: "VisitDentistDate",
            className: "form-child--margin",
            type: "date",
        });
        this.selectBox.appendChild(this.label);
        this.selectBox.appendChild(this.input);
    }
}

//********************************************** ▼ Frame Сергій ▼ ******************************************************/

export class Frame {
    constructor(cards) {
        this.cards = cards;
        const {id, firstName, surname, middleName, categoryVisit, description, doctor, goal, statusVisit,} = this.cards;
        this.id = id;
        this.doctor = doctor;
        this.firstName = firstName;
        this.surname = surname;
        this.middleName = middleName;
        this.categoryVisit = categoryVisit;
        this.description = description;
        this.goal = goal;
        this.statusVisit = statusVisit;
        this.mainArrName = ["Картка", "Лікар", "Ім'я", "Прізвище", "По-батькові", "Терміновість", "Опис візиту", "Mета візиту", "Статус",];
        this.mainArrProp = [this.id, this.doctor, this.firstName, this.surname, this.middleName, this.categoryVisit, this.description, this.goal, this.statusVisit,];
        this.resultSearch = document.querySelector(".main");
        this.cardAside = document.createElement("div");
        this.button = document.createElement("button");
        this.resultSearch.appendChild(this.cardAside);
        this.cardAside.classList.add("card-main");
        this.count = 0; //лічильник стека рекурсії
        this.q = 0; //значення умови зупинки рекурсії
    }

    set() {
        if (this.count <= this.q) {
            let p = document.createElement("p"),
                span = document.createElement("span"),
                card = document.createElement("span");
            span.innerText = this.mainArrName[this.count];
            card.innerText = this.mainArrProp[this.count];
            this.cardAside.appendChild(p).classList.add("card-main-wrp");
            p.appendChild(span);
            p.appendChild(card);
            if (this.count <= 0) {
                let s = document.createElement("span");
                s.innerText = "×";
                Object.assign(s, {
                    className: "mn-close close",
                    title: "Закрити на робочому полі",
                });
                p.appendChild(s);
                s.addEventListener('click', e => {
                    const id = e.target.parentElement.parentElement.getAttribute('data-mn')
                    document.querySelector(`[data-mn="${id}"]`).remove()
                })
            }
            if (this.count === this.q) {
                this.button.innerText = "редагувати";
                this.button.dataset.edit = this.id;
                this.cardAside.appendChild(this.button).classList.add("btn");
            }
            this.set(this.count++);
        }
    }
}

export class CardiologistFull extends Frame {
    constructor(cards) {
        super(cards);
        const {BMI, pressure, previousDiseas, CardiologistAge} = this.cards;
        this.BMI = BMI;
        this.pressure = pressure;
        this.previousDiseas = previousDiseas;
        this.CardiologistAge = CardiologistAge;
        this.q = 11;
        this.cardAside.dataset.mn = this.id;
        this.mainArrName.push("Звичайний тиск", "Індекс маси тіла", "Перенесені захворювання серцево-судинної системи", "Вік");
        this.mainArrProp.push(this.pressure, this.BMI, this.previousDiseas, this.previousDiseas);
    }
}

export class TherapistFull extends Frame {
    constructor(cards) {
        super(cards);
        const {therapistAge} = this.cards;
        this.therapistAge = therapistAge;
        this.mainArrName.push("Вік");
        this.mainArrProp.push(this.therapistAge);
        this.cardAside.dataset.mn = this.id;
        this.q = 9;
    }
}

export class DentistFull extends Frame {
    constructor(cards) {
        super(cards);
        const {VisitDentistDate} = this.cards;
        this.VisitDentistDate = VisitDentistDate;
        this.mainArrName.push("дата останнього відвідування");
        this.mainArrProp.push(this.VisitDentistDate);
        this.cardAside.dataset.mn = this.id;
        this.q = 9;
    }
}

export class CardShort extends Frame {
    constructor(cards, bool = true) {
        super(cards);
        this.head = ["Kартка", "Лікар", "Пацієнт"];
        this.core = [this.id, this.doctor, this.firstName, this.surname];
        this.resultSearch = document.querySelector(".result-search");
        Object.assign(this.cardAside, {
            className: "card-aside",
            id: this.id,
        });
        bool ? this.resultSearch.appendChild(this.cardAside) : this.resultSearch.prepend(this.cardAside);
    }

    set() {
        if (this.count <= 2) {
            let p = document.createElement("p"),
                span = document.createElement("span"),
                card = document.createElement("span");
            span.innerText = this.head[this.count];
            this.cardAside.appendChild(p);
            p.appendChild(span);
            if (this.count === 0) {
                p.setAttribute("class", "card-aside-wrp aside-wrp-padding--boot");
                this.button.classList.add("btn");
                this.button.dataset.btn = this.id;
                card.innerText = /*"№:" + */this.core[this.count];
                this.button.innerText = "більше";
                p.appendChild(card);
                p.appendChild(this.button);
            } else {
                p.classList.add("card-aside-wrp");
                p.appendChild(card);
                if (this.count === 1) {
                    card.innerText = this.core[this.count];
                } else
                    card.innerText =
                        this.core[this.count] + " " + this.core[this.count + 1];
            }
            this.set(this.count++);
        }
    }
}
