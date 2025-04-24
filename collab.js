// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    const members = [
        { id: 1, name: 'Alice Johnson', online: true },
        { id: 2, name: 'Bob Smith', online: false },
        { id: 3, name: 'Charlie Davis', online: true },
        { id: 4, name: 'Dana Wilson', online: true }
    ];

    const tasks = [
        { id: 1, text: 'Prepare research outline', assignedTo: 1, completed: false },
        { id: 2, text: 'Collect references for literature review', assignedTo: 2, completed: true },
        { id: 3, text: 'Create presentation slides', assignedTo: 3, completed: false },
        { id: 4, text: 'Schedule team meeting', assignedTo: 4, completed: false }
    ];

    const messages = [
        { sender: 'Alice Johnson', text: 'Has everyone started on their assigned tasks?', time: '9:30 AM', outgoing: false },
        { sender: 'Charlie Davis', text: 'I\'ve begun working on the slides. Will share a draft by tomorrow.', time: '9:32 AM', outgoing: false },
        { sender: 'You', text: 'I\'ve completed the reference list. Will upload it to our shared folder.', time: '9:35 AM', outgoing: true }
    ];

    // DOM Elements
    const taskList = document.getElementById('task-list');
    const memberList = document.getElementById('member-list');
    const chatMessages = document.getElementById('chat-messages');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const taskCount = document.querySelector('.task-count');
    const inviteBtn = document.getElementById('invite-btn');

    const attachBtn = document.getElementById('attach-btn');
    const fileInput = document.getElementById('chat-file-input');

    attachBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let fileMessage = {
                sender: 'You',
                time: timeStr,
                outgoing: true,
                isAttachment: true,
                fileName: file.name,
                fileType: file.type,
                fileURL: URL.createObjectURL(file)
            };
            messages.push(fileMessage);
            renderMessages();
            fileInput.value = '';
        }
    });


    // Emoji Picker Logic
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    emojiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => emojiPicker.style.display = 'none');
    emojiPicker.querySelectorAll('.emoji-option').forEach(emoji => {
        emoji.addEventListener('click', () => {
            chatInput.value += emoji.textContent;
            emojiPicker.style.display = 'none';
            chatInput.focus();
        });
    });


    // Render initial data
    renderTasks();
    renderMembers();
    renderMessages();

    // Update task count
    updateTaskCount();

    // Event Listeners
    addTaskBtn.addEventListener('click', addNewTask);
    sendMessageBtn.addEventListener('click', sendMessage);
    inviteBtn.addEventListener('click', inviteMembers);

    newTaskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addNewTask();
    });

    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });

    // Functions
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const assignedMember = members.find(m => m.id === task.assignedTo);
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.dataset.id = task.id;

            taskElement.innerHTML = `
                <div class="task-content">
                    <div class="task-text">${task.text}</div>
                    <div class="task-assigned">Assigned to: ${assignedMember ? assignedMember.name : 'Unassigned'}</div>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">${task.completed ? '↩️' : '✓'}</button>
                    <button class="edit-btn" onclick="editTask(${task.id})">✏️</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
                </div>
            `;

            taskList.appendChild(taskElement);
        });
    }

    function renderMembers() {
        memberList.innerHTML = '';
        members.forEach(member => {
            const memberElement = document.createElement('li');
            memberElement.className = 'member';

            // Get initials for avatar
            const initials = member.name.split(' ').map(n => n[0]).join('');

            memberElement.innerHTML = `
                <div class="member-avatar">${initials}</div>
                <div class="member-name">${member.name}</div>
                <div class="member-status ${member.online ? 'online' : 'offline'}"></div>
            `;

            memberList.appendChild(memberElement);
        });
    }

    function renderMessages() {
        chatMessages.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${message.outgoing ? 'outgoing' : 'incoming'}`;

            messageElement.innerHTML = `
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-time">${message.time}</div>
            `;

            chatMessages.appendChild(messageElement);
        });

        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addNewTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: tasks.length + 1,
                text: taskText,
                assignedTo: members[Math.floor(Math.random() * members.length)].id, // Random assignment for demo
                completed: false
            };

            tasks.push(newTask);
            renderTasks();
            updateTaskCount();
            newTaskInput.value = '';

            // Simulate collaborative update
            simulateCollaborativeUpdate(`New task added: "${taskText}"`);
        }
    }

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newMessage = {
                sender: 'You',
                text: messageText,
                time: timeStr,
                outgoing: true
            };

            messages.push(newMessage);
            renderMessages();
            chatInput.value = '';
        }
    }

    function updateTaskCount() {
        const completedCount = tasks.filter(task => task.completed).length;
        taskCount.textContent = `${completedCount} completed / ${tasks.length} total`;
    }

    function inviteMembers() {
        const email = prompt('Enter email address to invite:');
        if (email && validateEmail(email)) {
            alert(`Invitation sent to ${email}`);
        } else if (email) {
            alert('Please enter a valid email address');
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function simulateCollaborativeUpdate(message) {
        // Create a notification that appears briefly
        const notification = document.createElement('div');
        notification.className = 'collaborative-notification';
        notification.textContent = message;
        notification.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--accent-color);
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            opacity: 0;
            transition: opacity 0.3s;
        `;

        document.body.appendChild(notification);

        // Show and then hide the notification
        setTimeout(() => notification.style.opacity = '1', 100);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Make functions available globally (for onclick handlers)
    window.toggleTaskCompletion = function (taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
            updateTaskCount();

            // Simulate collaborative update
            simulateCollaborativeUpdate(`Task "${task.text}" marked as ${task.completed ? 'completed' : 'incomplete'}`);
        }
    };

    window.editTask = function (taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const newText = prompt('Edit task:', task.text);
            if (newText && newText.trim()) {
                task.text = newText.trim();
                renderTasks();

                // Simulate collaborative update
                simulateCollaborativeUpdate(`Task edited to: "${newText}"`);
            }
        }
    };

    window.deleteTask = function (taskId) {
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            const deletedTask = tasks[taskIndex];
            if (confirm(`Are you sure you want to delete task: "${deletedTask.text}"?`)) {
                tasks.splice(taskIndex, 1);
                renderTasks();
                updateTaskCount();

                // Simulate collaborative update
                simulateCollaborativeUpdate(`Task deleted: "${deletedTask.text}"`);
            }
        }
    };

    // Simulate real-time updates
    setInterval(() => {
        // Randomly toggle a member's online status
        if (Math.random() > 0.7) {
            const randomMemberIndex = Math.floor(Math.random() * members.length);
            members[randomMemberIndex].online = !members[randomMemberIndex].online;
            renderMembers();
        }

        // Occasionally add a new message from a team member
        if (Math.random() > 0.85) {
            const onlineMembers = members.filter(m => m.online && m.name !== 'You');
            if (onlineMembers.length > 0) {
                const randomMember = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
                const now = new Date();
                const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const messageOptions = [
                    "How's everyone's progress so far?",
                    "I just finished my part of the project.",
                    "Can someone help me with this section?",
                    "When is our next meeting?",
                    "I've shared some resources in our folder."
                ];

                const randomMessage = messageOptions[Math.floor(Math.random() * messageOptions.length)];

                messages.push({
                    sender: randomMember.name,
                    text: randomMessage,
                    time: timeStr,
                    outgoing: false
                });

                renderMessages();
            }
        }
    }, 10000); // Check every 10 seconds
});
