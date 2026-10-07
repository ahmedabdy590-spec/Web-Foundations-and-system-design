const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const status = document.getElementById("status");
const usersList = document.getElementById("users-list");

let allUsers = [];

async function loadUsers() {
  loadButton.disabled = true;
  status.textContent = "Loading users...";
  usersList.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    allUsers = await response.json();

    const filterText = filterInput.value.trim().toLowerCase();
    const matchingUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(filterText)
    );

    renderUsers(matchingUsers);

    if (matchingUsers.length === 0) {
      status.textContent = "No users match your filter.";
    } else {
      status.textContent = `Loaded ${allUsers.length} users.`;
    }
  } catch (error) {
    allUsers = [];
    usersList.replaceChildren();
    status.textContent = "Could not load users. Please try again.";
    console.error("Error loading users:", error);
  } finally {
    loadButton.disabled = false;
  }
}

function renderUsers(list) {
  usersList.replaceChildren();

  for (const user of list) {
    const item = document.createElement("li");

    const name = document.createElement("h2");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("p");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("p");
    company.textContent = `Company: ${user.company.name}`;

    item.append(name, email, city, company);
    usersList.appendChild(item);
  }
}

loadButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  const filterText = filterInput.value.trim().toLowerCase();

  const matchingUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(filterText)
  );

  renderUsers(matchingUsers);

  if (allUsers.length === 0) {
    status.textContent = "Load users to begin filtering.";
  } else if (matchingUsers.length === 0) {
    status.textContent = "No users match your filter.";
  } else {
    status.textContent = `Showing ${matchingUsers.length} of ${allUsers.length} users.`;
  }
});