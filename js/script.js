let createTaskBtn = document.querySelector('.createTaskBtn');

class Task {

    constructor(title, description, dateDone) {
        this.title = title;
        this.description = description;
        this.dateDone = dateDone;
    }

    addTask() {
        let storageLength = localStorage.length;
        localStorage.setItem(storageLength + 1, JSON.stringify({
            title : this.title,
            description : this.description,
            dateDone : this.dateDone
        }));
    }

}

//Последний раз заончил тут
createTaskBtn.addEventListener('click', (event) => {

    let [title, description, dateDone] = [
                                        document.querySelector('#createTitleTask').value,
                                        document.querySelector('#createDescriptionTask').value,
                                        document.querySelector('#createDateTask').value
                                    ];

    let task = new Task(title, description, dateDone);
    task.addTask();
    location.reload();
});

// Далее выводим добавленное задание из localStorage