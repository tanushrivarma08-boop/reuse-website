let items = JSON.parse(localStorage.getItem("items")) || [];
function showForm() {
  document.getElementById("formBox").style.display = "block";
}
function addItem() {
  let name = document.getElementById("itemName").value;
  let condition = document.getElementById("condition").value;
  let desc = document.getElementById("description").value;
  let imageInput = document.getElementById("image");

  if (imageInput.files.length === 0) {
    alert("Please select an image");
    return;
  }

  let file = imageInput.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    items.push({
  name: name,
  condition: condition,
  desc: desc,
  image: reader.result
});

localStorage.setItem("items", JSON.stringify(items));
    let itemDiv = document.createElement("div");
    itemDiv.style.border = "1px solid #ccc";
    itemDiv.style.padding = "10px";
    itemDiv.style.marginBottom = "10px";
    itemDiv.style.borderRadius = "8px";

    itemDiv.innerHTML = `
  <img src="${item.image || reader.result}" style="width:100%; max-width:300px; border-radius:8px;">
  <h3>${item.name || name}</h3>
  <p><strong>Condition:</strong> ${item.condition || condition}</p>
  <p>${item.desc || desc}</p>
  <button class="delete-btn">Delete</button>
`;
itemDiv.querySelector(".delete-btn").onclick = function () {
  document.getElementById("items").removeChild(itemDiv);

  items = items.filter(i => i.image !== (item.image || reader.result));
  localStorage.setItem("items", JSON.stringify(items));
};
    document.getElementById("items").appendChild(itemDiv);

    // clear form
    document.getElementById("itemName").value = "";
    document.getElementById("condition").value = "";
    document.getElementById("description").value = "";
    imageInput.value = "";
  };

  reader.readAsDataURL(file);
}
function loadItems() {
  items.forEach(item => {
    let itemDiv = document.createElement("div");
    itemDiv.style.border = "1px solid #ccc";
    itemDiv.style.padding = "10px";
    itemDiv.style.marginBottom = "10px";
    itemDiv.style.borderRadius = "8px";

    itemDiv.innerHTML = `
      <img src="${item.image}" style="width:100%; max-width:300px; border-radius:8px;">
      <h3>${item.name}</h3>
      <p><strong>Condition:</strong> ${item.condition}</p>
      <p>${item.desc}</p>
    `;

    document.getElementById("items").appendChild(itemDiv);
  });
}
loadItems();
