var id_ = 1;

const obj = [{ id: id_, name: "name", complete: false }]
console.log(obj[0])

function changeArrayValue(id) {
  console.log("2.- " + id)
  console.log("3.- " + obj[0].name + "\n---------------\n")
  const newArray = [...obj]
  console.log("4.- " + newArray[0])
  console.log("5.- " + newArray[0])
  const todo = newArray.find(todo => todo.id === id)
  // const todo = "";
  console.log("6.- " + todo)
  //todo.complete = !todo.complete
  console.log(todo)
  id_++
}

changeArrayValue(id_)