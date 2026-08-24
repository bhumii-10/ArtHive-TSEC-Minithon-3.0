document.addEventListener('DOMContentLoaded', () => {
    // Theme handling
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isDarkMode = false;

    function toggleTheme() {
        isDarkMode = !isDarkMode;
        body.classList.toggle('dark-theme');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Initialize BroadcastChannel for cross-window communication
    const broadcastChannel = new BroadcastChannel('chat_app');
    
    // Debug flag
    const DEBUG = true;
    
    function log(...args) {
        if (DEBUG) {
            console.log('[Chat App]', ...args);
        }
    }

    // Generate avatar for user
    function generateAvatar(name) {
        const colors = ['#2196f3', '#4caf50', '#f44336', '#9c27b0', '#ff9800'];
        const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
        const color = colors[Math.floor(Math.random() * colors.length)];
        return { initials, color };
    }

    // DOM Elements
    const userModal = document.getElementById('userModal');
    const chatContainer = document.getElementById('chatContainer');
    const chatArea = document.getElementById('chatArea');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const userNameInput = document.getElementById('userName');
    const startChatButton = document.getElementById('startChatButton');
    const currentUserSpan = document.getElementById('currentUser');
    const changeUserButton = document.getElementById('changeUser');
    const usersList = document.getElementById('usersList');
    const recipientSelect = document.getElementById('recipientSelect');

    // App State
    let currentUser = '';
    let users = new Set();
    let selectedRecipient = '';
    let activeUsers = new Set(); // Track currently active users across windows

    // Initialize from localStorage and sync with other windows
    function initializeFromStorage() {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            JSON.parse(storedMessages).forEach(msg => {
                addMessage(msg.message, msg.sender, msg.recipient, false);
            });
        }

        // Broadcast to check for active users
        broadcastChannel.postMessage({
            type: 'REQUEST_USERS'
        });
    }

    // Save messages to localStorage
    function saveToStorage() {
        const messages = Array.from(chatArea.children).map(msg => ({
            message: msg.querySelector('.message-text').textContent,
            sender: msg.dataset.sender,
            recipient: msg.dataset.recipient,
            timestamp: msg.querySelector('.timestamp').textContent
        }));
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    // Handle user activity
    function updateActiveUsers(newUser = null) {
        if (newUser) {
            activeUsers.add(newUser);
        }
        users = new Set(activeUsers);
        updateUsersList();
    }

    // Periodic ping to maintain active status
    function startHeartbeat() {
        setInterval(() => {
            if (currentUser) {
                broadcastChannel.postMessage({
                    type: 'HEARTBEAT',
                    user: currentUser
                });
            }
        }, 5000);
    }

    // Clean up inactive users
    function cleanupInactiveUsers() {
        const now = Date.now();
        activeUsers.forEach(user => {
            const lastSeen = localStorage.getItem(`lastSeen_${user}`);
            if (now - lastSeen > 10000) { // 10 seconds timeout
                activeUsers.delete(user);
                localStorage.removeItem(`lastSeen_${user}`);
                updateUsersList();
            }
        });
    }

    // Start cleanup interval
    setInterval(cleanupInactiveUsers, 5000);

    function updateUsersList() {
        log('Updating users list. Active users:', [...activeUsers]);
        usersList.innerHTML = '';
        recipientSelect.innerHTML = '<option value="">Select recipient...</option>';
        
        // Add "Everyone" option
        const everyoneChip = document.createElement('div');
        everyoneChip.className = 'user-chip everyone';
        everyoneChip.textContent = 'Everyone';
        everyoneChip.onclick = () => selectRecipient('all');
        usersList.appendChild(everyoneChip);

        const everyoneOption = document.createElement('option');
        everyoneOption.value = 'all';
        everyoneOption.textContent = 'Everyone';
        recipientSelect.appendChild(everyoneOption);
        
        activeUsers.forEach(user => {
            if (user !== currentUser) {
                // Add to users list
                const userChip = document.createElement('div');
                userChip.className = 'user-chip';
                userChip.textContent = user;
                userChip.onclick = () => selectRecipient(user);
                usersList.appendChild(userChip);

                // Add to recipient dropdown
                const option = document.createElement('option');
                option.value = user;
                option.textContent = user;
                recipientSelect.appendChild(option);
            }
        });

        // Update UI to show connection status
        const statusDiv = document.getElementById('connectionStatus') || document.createElement('div');
        statusDiv.id = 'connectionStatus';
        statusDiv.textContent = `${activeUsers.size} user(s) online`;
        statusDiv.className = 'connection-status';
        if (!document.getElementById('connectionStatus')) {
            chatContainer.insertBefore(statusDiv, chatArea);
        }
    }

    function selectRecipient(user) {
        document.querySelectorAll('.user-chip').forEach(chip => {
            chip.classList.remove('selected');
        });
        const selectedChip = Array.from(document.querySelectorAll('.user-chip')).find(chip => chip.textContent === user);
        if (selectedChip) {
            selectedChip.classList.add('selected');
        }
        selectedRecipient = user;
        recipientSelect.value = user;
        messageInput.focus();
    }

    function addMessage(message, sender, recipient, save = true) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === currentUser ? 'user-b' : 'user-a');
        messageElement.dataset.sender = sender;
        messageElement.dataset.recipient = recipient;

        // Avatar
        const avatarInfo = generateAvatar(sender);
        const avatar = document.createElement('div');
        avatar.classList.add('message-avatar');
        avatar.style.backgroundColor = avatarInfo.color;
        avatar.textContent = avatarInfo.initials;

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('message-content');

        const senderName = document.createElement('div');
        senderName.classList.add('sender-name');
        senderName.textContent = sender;

        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = message;

        const messageFooter = document.createElement('div');
        messageFooter.classList.add('message-footer');

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = new Date().toLocaleTimeString();

        const statusIndicator = document.createElement('div');
        statusIndicator.classList.add('message-status');
        statusIndicator.innerHTML = sender === currentUser ? 
            '<i class="fas fa-check-double status-icon"></i>' : '';

        const reactions = document.createElement('div');
        reactions.classList.add('message-reactions');

        messageFooter.appendChild(timestamp);
        messageFooter.appendChild(statusIndicator);

        contentWrapper.appendChild(senderName);
        contentWrapper.appendChild(messageText);
        contentWrapper.appendChild(messageFooter);
        contentWrapper.appendChild(reactions);

        messageElement.appendChild(avatar);
        messageElement.appendChild(contentWrapper);

        chatArea.appendChild(messageElement);
        chatArea.scrollTop = chatArea.scrollHeight;

        if (save) {
            saveToStorage();
        }
    }

    function handleSend() {
        const message = messageInput.value.trim();
        const recipient = recipientSelect.value;

        if (message && recipient) {
            // Broadcast message to all windows
            broadcastChannel.postMessage({
                type: 'NEW_MESSAGE',
                message: message,
                sender: currentUser,
                recipient: recipient,
                timestamp: new Date().toLocaleTimeString()
            });
            
            addMessage(message, currentUser, recipient);
            messageInput.value = '';
            messageInput.focus();
        } else if (!recipient) {
            alert('Please select a recipient');
        }
    }

    // BroadcastChannel event handling
    broadcastChannel.onmessage = (event) => {
        const { type, user, message, sender, recipient, timestamp } = event.data;
        log('Received message:', type, event.data);
        
        switch (type) {
            case 'NEW_USER':
                log('New user joined:', user);
                activeUsers.add(user);
                localStorage.setItem(`lastSeen_${user}`, Date.now());
                updateUsersList();
                // Send acknowledgment
                if (currentUser && currentUser !== user) {
                    broadcastChannel.postMessage({
                        type: 'USER_ACK',
                        user: currentUser,
                        timestamp: Date.now()
                    });
                }
                break;
                
            case 'USER_ACK':
                log('User acknowledged:', user);
                if (user !== currentUser) {
                    activeUsers.add(user);
                    localStorage.setItem(`lastSeen_${user}`, Date.now());
                    updateUsersList();
                }
                break;
                
            case 'USER_LEFT':
                log('User left:', user);
                activeUsers.delete(user);
                localStorage.removeItem(`lastSeen_${user}`);
                updateUsersList();
                break;
                
            case 'NEW_MESSAGE':
                log('New message from', sender, 'to', recipient);
                if (sender !== currentUser && (recipient === currentUser || recipient === 'all')) {
                    addMessage(message, sender, recipient, true);
                }
                break;
                
            case 'REQUEST_USERS':
                log('Received user request');
                if (currentUser) {
                    setTimeout(() => {
                        broadcastChannel.postMessage({
                            type: 'NEW_USER',
                            user: currentUser,
                            timestamp: Date.now()
                        });
                    }, 100); // Small delay to prevent message collision
                }
                break;
                
            case 'HEARTBEAT':
                activeUsers.add(user);
                localStorage.setItem(`lastSeen_${user}`, Date.now());
                updateUsersList();
                break;
        }
    };

    function startChat(userName) {
        if (userName.trim()) {
            currentUser = userName.trim();
            
            log('Starting chat as:', currentUser);
            
            // Broadcast new user to all windows
            broadcastChannel.postMessage({
                type: 'NEW_USER',
                user: currentUser,
                timestamp: Date.now()
            });
            
            // Update local state
            activeUsers.add(currentUser);
            updateActiveUsers(currentUser);
            localStorage.setItem(`lastSeen_${currentUser}`, Date.now());
            
            currentUserSpan.textContent = `Logged in as: ${currentUser}`;
            userModal.style.display = 'none';
            chatContainer.style.display = 'flex';
            
            // Start heartbeat for this user
            startHeartbeat();

            // Request existing users
            log('Requesting existing users');
            broadcastChannel.postMessage({
                type: 'REQUEST_USERS',
                timestamp: Date.now()
            });
        }
    }

    // Event Listeners
    startChatButton.addEventListener('click', () => {
        startChat(userNameInput.value);
    });

    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startChat(userNameInput.value);
        }
    });

    changeUserButton.addEventListener('click', () => {
        // Broadcast user leaving
        if (currentUser) {
            broadcastChannel.postMessage({
                type: 'USER_LEFT',
                user: currentUser
            });
            activeUsers.delete(currentUser);
            localStorage.removeItem(`lastSeen_${currentUser}`);
            updateUsersList();
        }
        
        userModal.style.display = 'flex';
        chatContainer.style.display = 'none';
        userNameInput.value = '';
        userNameInput.focus();
    });

    sendButton.addEventListener('click', handleSend);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    recipientSelect.addEventListener('change', (e) => {
        selectRecipient(e.target.value);
    });

    // Initialize the app
    initializeFromStorage();
});