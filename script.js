const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filterItems = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false
function displayItems() {
  const fromLocalStorage = getItemFromStorage()
  fromLocalStorage.forEach((item) => addItemToDom(item))
  checkUI()
}
function addItemOnSabmit(e) {
  e.preventDefault()
  newItem = itemInput.value
  //validation
  if (newItem === '') {
    alert('Please add item')
    return
  }
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode')
    removeFromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove()
    isEditMode = false
  } else {
    if (checkIfExits(newItem)) {
      alert('Allready exits!')
    }
  }
  // add item to  DOM
  addItemToDom(newItem)
  //   add item to local storage
  addItemToLocalStorage(newItem)
  checkUI()
  itemInput.value = ''
}
function addItemToDom(item) {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))
  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)
  itemList.appendChild(li)
}

function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = creatIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

function creatIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}
function addItemToLocalStorage(item) {
  const fromLocalStorage = getItemFromStorage()
  //   add to epty array
  fromLocalStorage.push(item)
  //   add to local sotage
  localStorage.setItem('items', JSON.stringify(fromLocalStorage))
}
function getItemFromStorage() {
  let fromLocalStorage
  if (localStorage.getItem('items') === null) {
    fromLocalStorage = []
  } else {
    fromLocalStorage = JSON.parse(localStorage.getItem('items'))
  }
  return fromLocalStorage
}
function onClickRemove(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}
function setItemToEdit(item) {
  isEditMode = true
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'))
  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-hammer"></i> Change'
  formBtn.style.backgroundColor = 'green'
  itemInput.value = item.textContent
}
function checkIfExits(item) {
  const fromLocalStorage = getItemFromStorage()
  return fromLocalStorage.includes(item)
}
function removeItem(item) {
  if (confirm('Are you sure')) {
    //   remove from Dom
    item.remove()

    // remove from local storage
    removeFromStorage(item.textContent)
    checkUI()
  }
}
function removeFromStorage(item) {
  let fromLocalStorage = getItemFromStorage()

  fromLocalStorage = fromLocalStorage.filter((i) => i !== item)

  //   reset local storage
  localStorage.setItem('items', JSON.stringify(fromLocalStorage))
}

function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  localStorage.removeItem('items')
  checkUI()
}
function filter(e) {
  const items = itemList.querySelectorAll('li')
  const text = e.target.value.toLowerCase()
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}
function checkUI() {
  const items = itemList.querySelectorAll('li')
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    filterItems.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    filterItems.style.display = 'block'
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
  formBtn.style.backgroundColor = '#333'
  isEditMode = false
}
//event listeners
function init() {
  itemForm.addEventListener('submit', addItemOnSabmit)
  itemList.addEventListener('click', onClickRemove)
  clearBtn.addEventListener('click', clearItems)
  checkUI()
  filterItems.addEventListener('input', filter)
  document.addEventListener('DOMContentLoaded', displayItems)
}
init()
