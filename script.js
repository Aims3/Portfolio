const modeBtn = document.getElementById('mode-btn');
const icon = modeBtn.querySelector('i');

modeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    }

});

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let myTasks = [];


if (addTaskBtn) { 
    addTaskBtn.addEventListener('click', function() {
        const taskValue = taskInput.value.trim(); 
        
        if (taskValue !== "") {
            addNewTask(taskValue);
            taskInput.value = ""; 
        } else {
            alert("Please enter a task first!");
        }
    });
}

function addNewTask(taskText) {
    const task = {
        name: taskText,
        isCompleted: false
    };
    
    myTasks.push(task);
    
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    
    for (let i = 0; i < myTasks.length; i++) {
        
        const li = document.createElement('li');
        li.className = 'task-item';
        
        if (myTasks[i].isCompleted === true) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span class="task-text">${myTasks[i].name}</span>
            <div class="task-actions">
                <button class="icon-btn complete-btn" onclick="toggleTask(${i})" title="Mark Complete">
                    <i class="fas fa-check-circle"></i>
                </button>
                <button class="icon-btn delete-btn" onclick="deleteTask(${i})" title="Delete Task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        taskList.appendChild(li);
    }
}

function toggleTask(index) {
    myTasks[index].isCompleted = !myTasks[index].isCompleted;
    renderTasks(); 
}

function deleteTask(index) {
    myTasks.splice(index, 1);
    renderTasks(); 
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            
            formStatus.className = 'form-status';
            formStatus.innerText = '';

            if (name === '' || email === '' || phone === '' || message === '') {
                showError("Error: All fields are required. Please fill them out.");
                return; 
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError("Error: Please enter a valid email address.");
                return;
            }

            const phoneRegex = /^\d+$/;
            if (!phoneRegex.test(phone)) {
                showError("Error: Phone number must contain only numbers (no spaces or letters).");
                return;
            }

            showSuccess("Success! Your message has been validated and sent.");
            
            contactForm.reset();
        });
    }

    function showError(message) {
        formStatus.innerText = message;
        formStatus.classList.add('status-error');
    }

    function showSuccess(message) {
        formStatus.innerText = message;
        formStatus.classList.add('status-success');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        // 1. Open/Close the menu when the button is clicked
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active-menu');
            
            // Change text from "Menu" to "Close"
            if (navLinks.classList.contains('active-menu')) {
                menuBtn.innerText = '✕ Close';
            } else {
                menuBtn.innerText = '☰ Menu';
            }
        });

        // 2. Hide the menu automatically when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active-menu');
                menuBtn.innerText = '☰ Menu';
            });
        });
    }
});