function login() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (username === "admin" && password === "admin123") {
        alert("Login Successful")
        window.location.href = "index.html"
    }
    else {
        alert("Invalid Credentials")
    }

}








function changeTab(event, type) {

    const tabs = document.querySelectorAll(".tab")

    tabs.forEach(tab => {
        tab.classList.remove("tab-active")
    })

    event.target.classList.add("tab-active")

    let filteredIssues = []

    if (type === "all") {
        filteredIssues = allIssues
    }
    else if (type === "open") {
        filteredIssues = allIssues.filter(issue => issue.status === "open")
    }
    else if (type === "closed") {
        filteredIssues = allIssues.filter(issue => issue.status === "closed")
    }

    displayIssues(filteredIssues)

}



// now time to fatch api 
let allIssues = []



async function loadIssues() {

    document.getElementById("loading").classList.remove("hidden")

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

    const data = await res.json()

    allIssues = data.data

    displayIssues(allIssues)

    document.getElementById("loading").classList.add("hidden")

}

function displayIssues(issues) {

    const container = document.getElementById("issues-container")

    container.innerHTML = ""

    issues.forEach(issue => {

        const borderColor =
            issue.status === "open"
                ? "border-t-4 border-green-500"
                : "border-t-4 border-purple-500"

        const card = document.createElement("div")
        card.onclick = () => openModal(issue)


        card.className = `card bg-base-100 shadow ${borderColor}`

        //  image or lage

        const statusImg =
            issue.status === "open"
                ? "assets/Open-Status.png"
                : "assets/Closed- Status .png";


        //  akon dynamic button color 
        const priorityClass =
            issue.priority === "high"
                ? "text-red-500"
                : issue.priority === "medium"
                    ? "text-yellow-500 "
                    : "text-gray-400 ";



        card.innerHTML = `
        

<div class="card-body">
          <div class="flex justify-between items-center ">
        <img src="${statusImg}" alt="">

<button class="btn bg-transparent border ${priorityClass}">
  ${issue.priority}
</button>

    </div>
<h2 class="card-title">${issue.title}</h2>

<p>${issue.description}</p>
 <div class="flex gap-5">
        <button class="bg-transparent "><i class="fa-solid fa-bug"></i><small  class="text-red-500">BUG</small></button>
    <button class="btn"><i class="fa-solid fa-life-ring"></i><small class="text-yellow-500">HELP WANTED</small></button>
    </div>
<br>
<hr class=" text-bold">

<p>#1 by ${issue.author}</p>


<p> ${issue.createdAt}</p>

</div>
`

        container.appendChild(card)

    })

}
loadIssues()

//  search korar lahe function 

async function searchIssues() {

    const searchText = document.getElementById("searchInput").value

    if (searchText === "") {
        displayIssues(allIssues)
        return
    }

    document.getElementById("loading").classList.remove("hidden")

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)

    const data = await res.json()

    displayIssues(data.data)

    document.getElementById("loading").classList.add("hidden")

}
//   ata holo modal ar funtionality
function openModal(issue) {

    document.getElementById("modalTitle").innerText = issue.title
    document.getElementById("modalDescription").innerText = issue.description
    document.getElementById("modalStatus").innerText = issue.status
    document.getElementById("modalAuthor").innerText = issue.author
    document.getElementById("modalPriority").innerText = issue.priority
    document.getElementById("modalLabel").innerText = issue.label
    document.getElementById("modalDate").innerText = issue.createdAt

    document.getElementById("issueModal").showModal()

}

