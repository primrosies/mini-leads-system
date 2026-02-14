let leads = JSON.parse(localStorage.getItem("leads")) || []

console.log(leads);

function addLead(name, neighborhood){
    const newLead = {
        id: Date.now(),
        name: name,
        neighborhood: neighborhood,
        status: "new"
    }

    leads.push(newLead)
	saveToLocalStorage()
    renderLeads()
    renderStatistics()

}


function markAsCaptured(id) {
    const lead = leads.find(l => l.id === id)

    if (lead) {
        lead.status = "captured"
		saveToLocalStorage()
        renderLeads()
        renderStatistics()
    }
}

function saveToLocalStorage() {
	localStorage.setItem("leads", JSON.stringify(leads))
}

// Handle button click for Portuguese interface
function handleAddLead() {
	const nameInput = document.getElementById("nameInput");
	const neighborhoodInput = document.getElementById("neighborhoodInput");
	
	const name = nameInput.value.trim();
	const neighborhood = neighborhoodInput.value.trim();

	if (!name || !neighborhood) return; 

	addLead(name, neighborhood);
	nameInput.value = "";
	neighborhoodInput.value = "";
}


function renderLeads() {
	const leadsList = document.getElementById("leadsList")
	leadsList.innerHTML = ""

	leads.forEach(lead => {
		leadsList.innerHTML += `
			<li>
			Nome: ${lead.name} - Bairro: ${lead.neighborhood} - Status: ${lead.status}
			${lead.status === "new"
				? `<button onclick="markAsCaptured(${lead.id})">Marcar como captado</button>`
				: ""
			}
			</li>
		`
	})
}

function renderStatistics() {
	const stats = document.getElementById("stats")

	const total = leads.length
	const captured = leads.filter(l => l.status === "captured").length
	
	stats.innerText = `Total de leads: ${total} | Captados: ${captured}`
}

renderLeads()
renderStatistics()