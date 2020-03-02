console.log('Fail ühendatud');

class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

class ToDo{
    constructor(){
        console.log('ToDo sees');

        document.querySelector('#addButton').addEventListener('click', ()=>{this.addEntry()});

        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        this.render();
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

        console.log(this.entries);
        this.saveLocal();
        this.render();
    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));
        }

        const ul = document.createElement('ul');
        ul.className = 'todo-list';


        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            const removeButton = document.createElement('div');
            const removeIcon = document.createTextNode('X');
            li.classList.add('entry');

            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
                this.render();
            });

            if(entryValue.done){
                li.classList.add('task-done');
            }

            li.addEventListener('click', (event)=>{
                event.target.classList.add('task-done');
                this.entries[entryIndex].done = true;
                this.saveLocal();
            });

            li.innerHTML = `${entryValue.title} <br> ${entryValue.description} <br> ${entryValue.date}`;
            removeButton.appendChild(removeIcon);
            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
        console.log("save");
    }


}

const todo = new ToDo();