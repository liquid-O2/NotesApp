class App{
    constructor(){
        this.notes = []
        this.$form = document.querySelector("#form")
        this.addEventListeners()
        this.$noteTitle = document.querySelector("#note-title")
        this.$notes = document.querySelector("#note")
        this.$placeholder = document.querySelector("#placeholder")
        this.$noteDiv = document.querySelector("#note")
        this.$noteText = document.querySelector("#note-text")
        this.$formButtons = document.querySelector("#form-buttons")
        this.$closeButton = document.querySelector("#form-close-button")
        this.$submitButton = document.querySelector("#submit-button")
    }
    addEventListeners(){
        document.body.addEventListener('click',event =>{
            this.handleFormClick(event)
            this.handleCloseButton(event)
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
    }

    closeForm(){
        this.$noteTitle.style.display = 'none';
        this.$formButtons.style.display = 'none';
        this.$noteTitle.value='';
        this.$noteText.value='';
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
    displayNotes(){
        const hasNotes = this.notes.length > 0
        hasNotes ? this.$placeholder.style.display = 'none' : this.$placeholder.style.display = 'flex'
        this.$notes.innerHTML = this.notes.map(note=>`
                <div style="background: ${note.color};" class="note">
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