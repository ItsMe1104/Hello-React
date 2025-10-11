const input = document.querySelector("#inp");
const val = input.value;
console.log(val);


input.addEventListener("input", (e) => {
  e.target.value = val;                      // It will always stay the same value
})