//Aprendiendo a hacer tests - estos tests son genericos y no tienen nada que ver con el bloglist

const reverse = (string) => {
  return string
    .split("")
    .reverse()
    .join("")
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length //esto es un if, si el array tiene length 0 devuelve 0 y si tiene distinto de 0 lo de despues de los ":"
}

module.exports = {
  reverse,
  average,
}