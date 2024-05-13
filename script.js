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
        const userIds = Object.values(chatData); 
        if (userIds.includes(currentUserId)) {
            const otherUserId = userIds.find(userId => userId !== currentUserId);
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

    const messages = chatsData.messages[chatId].messages; // Access the messages array within the chat
    if (messages) {
        const lastMessage = messages[messages.length - 1]; // Get the last message in the array
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
        "user_id_1": { "full_name": "Velislava" },
        "user_id_2": { "full_name": "Nikola" },
        "user_id_3": { "full_name": "Anna" },
        "user_id_4": { "full_name": "Damyan" },
        "user_id_5": { "full_name": "Ralitsa" }
    };

    setUserNameDisplay(currentUser, userData);

    const chatsData = {
        currentUserId: 'current_user_id',
        chats: {
            chat1: { user1: 'current_user_id', user2: 'other_user_id1' },
            chat2: { user1: 'current_user_id', user2: 'other_user_id2' },
            chat3: { user1: 'current_user_id', user2: 'other_user_id3' },
            chat4: { user1: 'current_user_id', user2: 'other_user_id4' },
            chat5: { user1: 'current_user_id', user2: 'other_user_id5' },
        },
        users: {
            other_user_id1: { full_name: 'Nikola' },
            other_user_id2: { full_name: 'Veselin' },
            other_user_id3: { full_name: 'Anna' },
            other_user_id4: { full_name: 'Damyan' },
            other_user_id5: { full_name: 'Ralitsa' }
        },
        messages: {
            chat1: {
                messages: [
                    { message: 'Hello!', sender : 'user_id_1' },
                    { message: 'Hi', sender : 'user_id_2' },
                    { message: 'Hey there!', sender : 'user_id_3' }
                ]
            },
            chat2: {
                messages: [
                    { message: 'How are you?', sender : 'user_id_1' },
                    { message: 'good, thanks!', sender : 'user_id_2' }
                ]
            },
            chat3: {
                messages: [] // Empty array for chat3 messages
            },
            chat4: {
                messages: [
                    { message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sender: 'user_id_1' },
                    { message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', sender: 'user_id_3' },
                    { message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', sender: 'user_id_1' },
                    { message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', sender: 'user_id_3' },
                    { message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', sender: 'user_id_1' }
                ]
            },
            chat5: {
                messages: [
                    { message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', sender: 'user_id_2' },
                    { message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', sender: 'user_id_1' },
                    { message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', sender: 'user_id_2' },
                    { message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', sender: 'user_id_1' },
                    { message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', sender: 'user_id_2' }
                ]
            }
        }
    };

    displayChats(chatsData);
});
