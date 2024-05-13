console.log(1);

function displayChats(chatsData) {
    const currentUserId = chatsData.currentUserId;
    const chats = chatsData.chats;
    const chatsList = document.getElementById('chats');
    if (!chatsList) {
        console.error("Chats list element not found");
        return;
    }
    chatsList.innerHTML = ''; // Clear existing content

    for (const chatId in chats) {
        const chatData = chats[chatId];
        if (currentUserId === chatData.user1 || currentUserId === chatData.user2) {
            const otherUserId = Object.values(chatData).find(userId => userId !== currentUserId);
            if (otherUserId) {
                const otherUserData = chatsData.users[otherUserId];
                if (otherUserData) {
                    const listItem = createChatItem(chatId, otherUserData, chatsData);
                    chatsList.appendChild(listItem);
                }
            }
        }
    }
}

function createChatItem(chatId, userData, chatsData) {
    const listItem = document.createElement('li');
    // listItem.classList.add('chat-item');
    listItem.setAttribute('data-chat-id', chatId);

    const contactName = document.createElement('span');
    contactName.classList.add('contact-name');
    contactName.textContent = userData.full_name;

    const contactMessage = document.createElement('span');
    contactMessage.classList.add('contact-message');

    const messages = chatsData.messages[chatId];
    if (messages) {
        const lastMessageKey = Object.keys(messages).pop();
        const lastMessage = messages[lastMessageKey];
        contactMessage.textContent = lastMessage ? lastMessage.message : 'Start conversation';
    } else {
        contactMessage.textContent = 'Start conversation';
    }

    listItem.appendChild(contactName);
    listItem.appendChild(contactMessage);

    listItem.addEventListener('click', () => {
        console.log(2);
        window.location.href = `../Chat/index.html?chatId=${chatId}`;
    });

    return listItem;
}

function setUserNameDisplay(currentUser, userData) {
    const userNameDisplay = document.getElementById('user-name');
    if (!userNameDisplay) {
        console.error("User name display element not found");
        return;
    }

    const displayName = currentUser ? getUserDisplayName(currentUser.uid, userData) : 'Not logged in';
    userNameDisplay.textContent = `Welcome, ${displayName}`;
}

function getUserDisplayName(userId, userData) {
    return userData[userId] ? userData[userId].full_name : 'User';
}

document.addEventListener('DOMContentLoaded', function () {
    const currentUser = { uid: "user_id_1" }; // Simulate signed-in user

    const userData = {
        "user_id_1": { "full_name": "Velislva" },
        "user_id_2": { "full_name": "Nikola" }
    };

    setUserNameDisplay(currentUser, userData);

    const chatsData = {
        currentUserId: 'current_user_id',
        chats: {
            chat1: { user1: 'current_user_id', user2: 'other_user_id1' },
            chat2: { user1: 'current_user_id', user2: 'other_user_id2' }
        },
        users: {
            other_user_id1: { full_name: 'Nikola' },
            other_user_id2: { full_name: 'Veselin' }
        },
        messages: {
            chat1: { message1: { message: 'Hello!' }, message2: { message: 'Hi there!' } },
            chat2: {}
        }
    };

    displayChats(chatsData);
});
