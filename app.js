class App{
    constructor(){
        this.notes = []
        this.title =''
        this.text =''
        this.id =''
        // this.addEventListeners()
        this.$form = document.querySelector("#form")
        this.$noteTitle = document.querySelector("#note-title")
        this.$notes = document.querySelector("#note")
        this.$placeholder = document.querySelector("#placeholder")
        this.$noteDiv = document.querySelector("#note")
        this.$noteText = document.querySelector("#note-text")
        this.$formButtons = document.querySelector("#form-buttons")
        this.$closeButton = document.querySelector("#form-close-button")
        this.$submitButton = document.querySelector("#submit-button")
        this.$modal = document.querySelector(".modal")
        this.$modalTitle = document.querySelector("#modal-title")
        this.$modalText = document.querySelector("#modal-text")
        this.$modalCloseButton = document.querySelector("#modal-close-button")
        this.addEventListeners()
    }
    addEventListeners(){
        document.body.addEventListener('click',event =>{
            this.handleFormClick(event)
            this.handleCloseButton(event)
            this.selectNote(event)
            this.openModal(event)
            
            
        })

        this.$form.addEventListener('submit', event =>{
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            const hasNote = title || text;
            if(hasNote){
                this.addNote({title,text})
            }
        })

        this.$modalCloseButton.addEventListener('click', event =>{
            this.closeModal()
        })


    }

        handleFormClick(event){
            const isFormClicked = this.$form.contains(event.target);
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            const hasNote = title || text;

            if (isFormClicked){
                this.openForm()
            }else if (hasNote){
                this.addNote({title,text})
            }else{
                this.closeForm()
            }
                
            }
        

        handleCloseButton(event){
            const isCloseClicked = this.$closeButton.contains(event.target)
            if (isCloseClicked){
                this.closeForm()
            }
        }


        openForm(){
            this.$noteTitle.style.display = 'flex';
            this.$formButtons.style.display = 'flex'

            console.log('clicked')
        }

        closeForm(){
            this.$noteTitle.style.display = 'none';
            this.$formButtons.style.display = 'none';
            this.$noteTitle.value='';
            this.$noteText.value='';
        }

        openModal(event){
            if (event.target.closest('.note')){
                this.$modal.classList.toggle('open-modal')
                this.$modalTitle.value = this.title
                this.$modalText.value = this.text
            
            }
        }

        closeModal(event){
            this.editNote()
            this.$modal.classList.toggle('open-modal')
        }


    

    addNote({title, text}){
        const newNote = {
            title,
            text,
            color: "#00000040",
            id:this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        };
        this.notes=[...this.notes, newNote]
        this.displayNotes();
        this.closeForm()
    }

    editNote(){
        const title = this.$modalTitle.value
        const text = this.$modalText.value
        this.notes = this.notes.map(note =>
            note.id === Number(this.id) ? {...note, title, text} : note
        );
        this.displayNotes()
    }

    selectNote(event){
        const $selectedNote= event.target.closest('.note')
        if (!$selectedNote) return
        const [$createdNoteTitle , $createdNoteText] = $selectedNote.children
        this.title= $createdNoteTitle.innerText;
        this.text =$createdNoteText.innerText;
        this.id=$selectedNote.dataset.id;

    }

    displayNotes(){
        const hasNotes = this.notes.length > 0
        hasNotes ? this.$placeholder.style.display = 'none' : this.$placeholder.style.display = 'flex'
        this.$notes.innerHTML = this.notes.map(note=>`
                <div style="background: ${note.color};" class="note" data-id="${note.id}">
                    <div class="${note.title && 'note-title'}">${note.title}</div>
                    <div class="note-text">${note.text}</div>
                    <div class="toolbar-container">
                        <div class="toolbar">
                            <div class='color-picker'>
                              <img class="toolbar-color" src="./color.svg">
                            </div>
                            <div class='trash'>
                                <img class="toolbar-delete" src="./trash.svg">
                            </div>
                        </div>
                    </div>
                </div>`).join("");
        }
    }


new App();