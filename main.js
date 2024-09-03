window.addEventListener("DOMContentLoaded", () => {

    const main = document.querySelector(".layaout__main")
    const btn = document.querySelector(".main__btn")
    let ventanaModal = document.querySelector(".ventana__modal")
    const btnExit = document.querySelector(".header__btn-exit")
    const form = document.querySelector(".modal__form")
    const btnSave = document.querySelector(".header__btn-save")
    const saved = document.querySelector(".modal__saved")
    let inputName = document.querySelector(".form__input")
    let description = document.querySelector(".form__input-textarea")
    let layaout = document.querySelector(".main__notes")
    let title = document.querySelector(".notes__title")
    let yesBtn = document.querySelector(".yes__input")
    let noBtn = document.querySelector(".no__input")
    const confirmDelete = document.querySelector(".confirm__delete")
    const form_delete = document.querySelector(".delete__form")
    

    let arrayNotes = []

    btn.addEventListener('click', () => {

        ventanaModal.classList.add("show", "showIndex")
        main.style.opacity = "0.1"

    })

    btnExit.addEventListener('click', () => {
        ventanaModal.classList.remove("show", "showIndex")
        main.style.opacity = "1"
       
        
    })

    btnSave.addEventListener("click", () => {

        if((inputName.value.trim() != "") & (description.value.trim() != "")){

                let myNote = {
                id: generateRandom(),
                name:inputName.value.trim(),
                description:description.value.trim()
            }

            arrayNotes.push(myNote)
        
            form.style.display = "none"
            saved.style.display = "flex"
            title.style.display = "none"
            console.log(arrayNotes)

        setTimeout(() => {
            ventanaModal.classList.remove("show", "showIndex")
            main.style.opacity = "1"
            form.style.display = "flex"
            saved.style.display = "none"
            showNotes()
            inputName.value = ""
            description.value = ""

        }, 2500)

        }  

    })


    function createNote (element) {

        let article = `
            <article class="notes__note" id="${element.id}">
                    <header class="note__header">
                        <input type="text" class="header__input" value="${element.name}">
                        <svg class="note_delete" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                          
                    </header>

                    <textarea name="body" id="" class="note__body">${element.description}</textarea>

            </article>
        
        `

        return article

    }

    function showNotes(){

        layaout.innerHTML = ""

        if (arrayNotes.length > 0 || arrayNotes == null){

            arrayNotes.forEach(element => {
                layaout.innerHTML += createNote(element)
            })
    
            deleteBtn()

        } else {
            layaout.innerHTML = `<h1 class="notes__title">Sin notas guardadas.</h1>`
        }
    } 

    function deleteBtn() {
            document.querySelectorAll(".note_delete").forEach(nota => {
                nota.addEventListener('click', (e) => {
                    main.style.opacity = "0.1"
                    confirmDelete.classList.add("show__delete", "showIndex")
                    yesBtn.addEventListener('click', () => checkDelete(e));
                    noBtn.addEventListener('click', cancelDelete);
                    
                })
            })
    }

    function checkDelete(e) {

        let nota = e.target.closest(".notes__note");
        let id = parseInt(nota.getAttribute("id"), 10);
        let position = arrayNotes.findIndex(note => note.id == id);
        console.log(position, id);
        if (position != -1) {
            arrayNotes.splice(position, 1); // Elimina el objeto del array
        }
        showNotes();
        confirmDelete.classList.remove("show__delete", "showIndex");
        main.style.opacity = "1";
    }

    function cancelDelete() {
        console.log(arrayNotes);
        confirmDelete.classList.remove("show__delete", "showIndex");
        main.style.opacity = "1";
    }

    function generateRandom() {
        let random = 0;
        let check = false

        do{
            random = Math.floor(Math.random() * 50)
            check = arrayNotes.some(r => r.id==random)

        } while (check)!check
        
        return random
    }

})