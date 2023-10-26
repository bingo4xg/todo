const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

// 항목 저장할 배열
let todos = [];

createBtn.addEventListener("click", createNewTodo);

// 페이지 로딩 시 저장된 항목들 표시
displayTodos();

// +버튼 눌렀을때
function createNewTodo()
{
    // 새 항목 생성
    const item = {
        id: new Date().getTime(), 
        text: "", 
        complete: false
    }

    // 배열 처음 새로운 아이템 추가
    todos.unshift(item); 

    // 요소 생성
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item); 

    // 새 아이템 추가
    list.prepend(itemEl);

    // disable 속성 제거
    inputEl.removeAttribute("disabled");

    // 자동 입력창 포커스
    inputEl.focus();

    saveToLocalStorage();
}

// 항목 생성
function createTodoElement(item)
{
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = item.complete;

    if(item.complete)
    {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input")
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    // 버튼들 div
    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    removeBtnEl.innerText = "remove_circles";

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

	// 각 요소에 이벤트 리스너 추가
	checkboxEl.addEventListener("change", () => {
		item.complete = checkboxEl.checked;

		if (item.complete) {
			itemEl.classList.add("complete");
		} else {
			itemEl.classList.remove("complete");
		}

		saveToLocalStorage();
	});

	inputEl.addEventListener("input", () => {
		item.text = inputEl.value;
	});

	inputEl.addEventListener("blur", () => {
		inputEl.setAttribute("disabled", "");

		saveToLocalStorage();
	});

	editBtnEl.addEventListener("click", () => {
		inputEl.removeAttribute("disabled");
		inputEl.focus();
	});

	removeBtnEl.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);
		itemEl.remove();

		saveToLocalStorage();
	});

	return {itemEl, inputEl, editBtnEl, removeBtnEl}
}

function displayTodos() {
	loadFromLocalStorage();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];

		const { itemEl } = createTodoElement(item);

		list.append(itemEl);
	}
}

// 저장
function saveToLocalStorage() {
	const data = JSON.stringify(todos);

	localStorage.setItem("my_todos", data);
}

// 로드
function loadFromLocalStorage() {
	const data = localStorage.getItem("my_todos");
    
	if (data) {
		todos = JSON.parse(data);
	}
}