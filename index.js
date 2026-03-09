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

        card.className = `card bg-base-100 shadow ${borderColor}`

        //  image or lage

        const statusImg =
            issue.status === "open"
                ? "assets/Open-Status.png"
                : "assets/Closed- Status .png";


        //  akon dynamic button color 
        const priorityClass =
            issue.priority === "High"
                ? "text-red-500"
                : issue.priority === "Medium"
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


<p><b>Author:</b> ${issue.author}</p>

<p><b>Label:</b> ${issue.label}</p>
<p><b>Created:</b> ${issue.createdAt}</p>

</div>
`

        container.appendChild(card)

    })

}

loadIssues()