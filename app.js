const lista = document.querySelector('.lista-container')
const formDatalist = document.querySelector('.form-add-list')
const inputSearchLista = document.querySelector('.form-search input')


const addList = inputValue =>{
    lista.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-list="${inputValue}">
    <span data-span="${inputValue}">${inputValue}</span>
    <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
</li>`

    event.target.reset()
}

formDatalist.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim()
    addList(inputValue)
})


const removerTarefa = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash
    const data = document.querySelector(`[data-list='${trashDataValue}']`)

    if(clickedElement.dataset.trash){
        data.remove()
    }
}

const tarefaCompleted = clickedElement => {
    const spanDataValue = clickedElement.dataset.span
    const data = document.querySelector(`[data-list="${spanDataValue}"]`)

    if(clickedElement.dataset.span){
        data.classList.toggle('completed')
    }
}

lista.addEventListener('click', event =>{
    event.preventDefault()
    const clickedElement = event.target
    removerTarefa(clickedElement)
    tarefaCompleted(clickedElement)
})

const filterTarefas = (tarefas, inputValue, CheckListas) => 
    tarefas.filter(tarefa =>{
        const CheckList = tarefa.textContent.toLowerCase().includes(inputValue)
        return CheckListas ? CheckList : !CheckList
    })

const ManipularClasses = (tarefas, ClasseAdd, ClasseRemove) => {
    tarefas.forEach(tarefa => {
        tarefa.classList.remove(ClasseRemove)
        tarefa.classList.add(ClasseAdd)
    })
}


function esconderTarefas(tarefas, inputValue){
    const Esconder = filterTarefas(tarefas, inputValue, false)
    ManipularClasses(Esconder,'hidden','d-flex')
}

function mostrarTarefas(tarefas, inputValue){
    const Mostrar = filterTarefas(tarefas, inputValue, true)
    ManipularClasses(Mostrar,'d-flex','hidden')

}


inputSearchLista.addEventListener('input', event =>{
    const inputValue = event.target.value.trim().toLowerCase()
    const tarefas = Array.from(lista.children)
    
    esconderTarefas(tarefas,inputValue)
    mostrarTarefas(tarefas,inputValue)

})