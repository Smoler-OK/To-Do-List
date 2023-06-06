'use strict';

let createTaskBtn = document.querySelector('.createTaskBtn');
let toDoList = document.querySelector('.toDoList');

// Вывод задач
(function outputTasks() {
    // Если список пуст
    if (localStorage.length === 0) {

        // Вывод "Список пуст"
        toDoList.innerHTML = 'Список дел пуст :('
    } else {

        for (let i = 0; i < localStorage.length; ++i) {

            let getKey = localStorage.key(i);
            let getItem = localStorage.getItem(getKey);

            let parseJsonItem = JSON.parse(getItem);
            let statusTask = {
                0: 'Не активно',
                1: 'В работе',
                2: 'Завершено'
            }
            let getDateDone = parseJsonItem.dateDone.split('T').join(' ');

            //КОЛХОЗ, В БУДУЩЕМ ПОМЕНЯТЬ
            let isActive = +parseJsonItem.status === 0 ? 'selected' : '';
            let isWorking = +parseJsonItem.status === 1 ? 'selected' : '';
            let isDone = +parseJsonItem.status === 2 ? 'selected' : '';
            ////////

            toDoList.innerHTML += `<!-- Tasks -->
            <div class="row list m-2 border-top border-bottom border-success border-2 ">

                <!-- <div class="idTask pt-2 pb-2 col-1 border-end border-success-subtle text-center my-auto">
                    ${getKey}
                </div> -->

                <button type="button" data-bs-toggle="modal" data-bs-target="#editTask-${i}" value="${i}"
                    class="titleTask btn rounded-0 text-start text-decoration-none pt-2 pb-2 col-5 border-end border-success-subtle align-middle my-auto">
                    ${parseJsonItem.title}
                </button>

                <!-- Модальное окно -->
                <div class="modal fade" id="editTask-${i}" tabindex="-1" aria-labelledby="editTaskLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="editTaskLabel">Просмотр задачи</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Закрыть"></button>
                            </div>
                            <div class="modal-body">
                                <!-- Тело модального окна -->
                                <div class="mb-3">
                                    <label for="createTitleTask" class="form-label">Заголовок</label>
                                    <input type="text" class="form-control" id="editTitleTask-${getKey}" value="${parseJsonItem.title}">
                                </div>
                                <div class="mb-3">
                                    <label for="createDescriptionTask" class="form-label">Описание</label>
                                    <textarea class="form-control" id="editDescriptionTask-${getKey}" rows="3">${parseJsonItem.description}</textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="createDateTask" class="form-label">Крайний срок</label>
                                    <input type="datetime-local" class="form-control" id="editDateTask-${getKey}" value="${parseJsonItem.dateDone}"></input>
                                </div>
                                <div class="mb-3">
                                    <select class="w-100 selectList-${getKey}">
                                        <option value="0" ${isActive}>Не активно</option>
                                        <option value="1" ${isWorking}>В работе</option>
                                        <option value="2" ${isDone}>Завершено</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">Закрыть</button>
                                <button value="${getKey}" type="button" class="btn btn-success editTaskBtn">Применить</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="statusTask pt-2 pb-2 col-2 border-end border-success-subtle text-center my-auto">
                    ${statusTask[parseJsonItem.status]}
                </div>

                <div class="dateDoneTask border-end border-success-subtle pt-2 pb-2 col-2 text-center my-0">
                    ${getDateDone}
                </div>

                <div class="dateDoneTask col-3 text-center my-auto ">
                    <button type="button" class="btn btn-light trash w-100" value=${getKey}>Удалить</button>
                </div>

            </div>
            <!-- Tasks end -->`;
        }
    }
}());

function resetAll() {
    localStorage.clear();
    location.reload();
}

class Task {

    constructor(title, description, dateDone, status = 0) {
        this.title = title;
        this.description = description;
        this.dateDone = dateDone;
        this.status = status
    }

    addTask() {

        let arrKeys = [];
        for(let i = 0; i <= localStorage.length; i++) {

            // Добавляем ключи в массив
            let getStorageKey = Number(localStorage.key(i));
            arrKeys.push(getStorageKey);
        }

        // Нашли наибольшее число и взяли следующий индекс
        // для избежания повторений
        let maxNumArr = Math.max.apply(Math, arrKeys) + 1;

        localStorage.setItem(maxNumArr, JSON.stringify({
            title: this.title,
            description: this.description,
            dateDone: this.dateDone,
            status: this.status,
        }));
    }

    editTask(idTask) {
        
        localStorage.setItem(idTask, JSON.stringify({
            title: this.title,
            description: this.description,
            dateDone: this.dateDone,
            status: this.status,
        }));
    }
}

// Создание задачи
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

let trashBtn = document.querySelectorAll('.trash');

trashBtn.forEach((btn) => {

    btn.addEventListener('click', (event) => {

        localStorage.removeItem(event.target.value);
        location.reload();
    });
});

let editTaskBtn = document.querySelectorAll('.editTaskBtn');

editTaskBtn.forEach((btn) => {

    btn.addEventListener('click', (event) => {

        let getIdTask = event.target.value;
        let [title, description, dateDone, statusTask] = [
            document.querySelector(`#editTitleTask-${getIdTask}`).value,
            document.querySelector(`#editDescriptionTask-${getIdTask}`).value,
            document.querySelector(`#editDateTask-${getIdTask}`).value,
            document.querySelector(`.selectList-${getIdTask}`).value
        ];

        let task = new Task(title, description, dateDone, statusTask);
        task.editTask(getIdTask);
        location.reload();
    });
});



// 