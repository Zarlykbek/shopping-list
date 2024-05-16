const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

function addItem(e) {
  e.preventDefault()
  newItem = itemInput.value
  //validation
  if (newItem === '') {
    alert('Please add item')
    return
  }
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))
  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)
  itemList.appendChild(li)
  itemInput.value = ''
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
//event listeners
itemForm.addEventListener('submit', addItem)
