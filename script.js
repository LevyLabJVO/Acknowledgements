window.addEventListener("load", getMemberData);
let members = [];
async function getMemberData(){
    const list = await fetch ("/members.json");
    let data = await list.json();
    members = data;
    addButtons(data);
    checkBoxes();
}

function display(data){
    const list = document.getElementById("hexGrid");
    list.innerHTML = ``;
    data.forEach(member => {
        const item = document.createElement("li");
        item.classList.add("hex");

        const div = document.createElement("div");
        div.classList.add("hexIn");

        const info = document.createElement("a");
        info.classList.add("hexLink");
        info.setAttribute("href", "#");

        const image = document.createElement("img");
        image.setAttribute("src", member.photo)

        const header = document.createElement("h1");
        header.textContent = member.name;

        info.appendChild(image);
        info.appendChild(header);
        info.innerHTML += `<p>${member.group}</p>`;

        div.appendChild(info);
        item.appendChild(div);

        list.appendChild(item);

    })
}

function addButtons(data){
    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const groups = data.map(member => member.group);

    const distinctGroups = groups.filter(distinct);

    const buttonGroup = document.getElementById("buttons");
    distinctGroups.forEach(group => {
        const label = document.createElement("label");
        label.setAttribute("class", "lns-checkbox ml-2");

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("onclick", "checkBoxes()");
        input.setAttribute("value", `${group}`)

        const span = document.createElement("span");
        span.textContent = group;

        label.appendChild(input);
        label.appendChild(span);

        buttonGroup.appendChild(label);
    })



}

function checkBoxes(){
    const boxes = document.querySelectorAll("input");
    let checked = [];
    boxes.forEach(box => {
        const value = box.value;
        const isChecked = box.checked;

        if (isChecked && value == "All"){
            display(members);
            return;
        }

        if (isChecked){
            checked.push(value);
        }
    });
    const all = document.getElementById("all");
    if (all.checked)
        return;
    const newMembers = members.filter(member => {
        const group = member.group;
        if (checked.includes(group))
            return member;
        else
            return;
    })
    display(newMembers);
}







