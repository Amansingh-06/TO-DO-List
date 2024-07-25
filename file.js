const textarea = document.getElementById("textarea"); // Get the textarea element
const addbtn = document.getElementById("addbtn"); // Get the Add button element
const adddiv = document.querySelector(".adddiv"); // Get the container div where tasks will be added
let tasks = []; // Initialize an empty array to store tasks

// Try to load tasks from localStorage
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (e) {
    console.error("Failed to parse tasks from localStorage:", e);
    tasks = []; // Default to an empty array if there's an error
}

// Add event listener to the Add button to handle adding/updating tasks
addbtn.addEventListener("click", operation);
// Load tasks from localStorage when the document content is loaded
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to handle adding new tasks or updating existing tasks
function operation() {
    let text = textarea.value.trim(); // Get the trimmed value from the textarea
    if (text !== "") {
        tasks.push(text.toLowerCase()); // Add the new task to the tasks array in lowercase
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
        createElement(text); // Create a new task element and add it to the DOM
        textarea.value = ""; // Clear the textarea
    } else {
        alert("Please add data"); // Alert the user if the textarea is empty
    }
}

// Function to create and add a new task element to the DOM
function createElement(task) {
    let newdiv = document.createElement("div"); // Create a new div for the task
    let newpara = document.createElement("p"); // Create a new paragraph for the task text
    let dlt = document.createElement("button"); // Create a delete button
    let update = document.createElement("button"); // Create an update button

    dlt.classList.add("delete"); // Add class to the delete button
    update.classList.add("update"); // Add class to the update button
    newdiv.classList.add("newelement"); // Add class to the task div

    newpara.innerText = task.toUpperCase(); // Set the task text in uppercase
    dlt.innerHTML = `<i class='bx bxs-trash-alt'></i>`; // Set the delete button icon
    update.innerHTML = `<i class='bx bx-edit'></i>`; // Set the update button icon

    // Append the paragraph, delete button, and update button to the task div
    newdiv.appendChild(newpara);
    newdiv.appendChild(dlt);
    newdiv.appendChild(update);
    adddiv.appendChild(newdiv); // Append the task div to the container div

    // Add event listener to handle deleting the task
    dlt.addEventListener("click", () => {
        newdiv.remove(); // Remove the task div from the DOM
        tasks = tasks.filter(t => t !== task); // Remove the task from the tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated tasks to localStorage
    });

    // Add event listener to handle updating the task
    update.addEventListener("click", () => {
        textarea.value = task; // Set the textarea value to the task text
        addbtn.innerText = "Update"; // Change the button text to "Update"
        addbtn.removeEventListener("click", operation); // Remove the add operation event listener

        // Define the function to handle updating the task
        const updateTask = () => {
            let updatedText = textarea.value.trim(); // Get the updated text from the textarea
            if (updatedText !== "") {
                newpara.innerText = updatedText.toUpperCase(); // Update the task text in the DOM
                tasks = tasks.map(t => t === task ? updatedText.toLowerCase() : t); // Update the task in the tasks array
                localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated tasks to localStorage
                textarea.value = ""; // Clear the textarea
                addbtn.innerText = "Add"; // Change the button text back to "Add"
                addbtn.removeEventListener("click", updateTask); // Remove the update operation event listener
                addbtn.addEventListener("click", operation); // Add the add operation event listener back
            } else {
                alert("Please add data"); // Alert the user if the textarea is empty
            }
        };

        addbtn.addEventListener("click", updateTask); // Add the update operation event listener
    });
}

// Function to load tasks from localStorage and create elements for them in the DOM
function loadTasks() {
    tasks.forEach(task => {
        createElement(task); // Create a task element for each task in the tasks array
    });
}
