console.log(3);

document.querySelector("#back-icon").addEventListener("click", () => {
    window.location.href = "../Chat-list/index.html"; 
});

function getChatIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('chatId'));
    return urlParams.get('chatId');
}

document.addEventListener('DOMContentLoaded', function () {
    const currentUser = { uid: "user_id_1" }; // Simulate signed-in user
    const chatId = getChatIdFromURL(); 

    const userData = {
        "user_id_1": { "full_name": "Velislava" },
        "user_id_2": { "full_name": "Nikola" },
        "user_id_3": { "full_name": "Anna" }
    };

    const chatsData = {
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
        }
    };

    const chats = {
        chat1: { participants: ['user_id_1', 'user_id_2', 'user_id_3'] },
        chat2: { participants: ['user_id_1', 'user_id_3'] }
    };

    function getUsersInChat(chatId) {
        const chatParticipants = chats[chatId].participants;
        const users = [];
        for (const userId of chatParticipants) {
            users.push(userData[userId].full_name);
        }
        return users;
    }

    const usersContainer = document.querySelector('.users');
    const chatParticipants = getUsersInChat(chatId);
    usersContainer.textContent = chatParticipants.join(', ') + ' chat';

    const messagesForChat = chatsData[chatId].messages;
    messagesForChat.forEach((message) => {
        const fullName = userData[message.sender].full_name;
        const messageClass = currentUser.uid === message.sender ? "sent" : "received";
        const messageElement = `<li class="${messageClass}"><span>${fullName}: </span>${message.message}</li>`;
        document.getElementById("messages").innerHTML += messageElement;

        document.getElementById("message-btn").addEventListener("click", function(event) {
            event.preventDefault();
            const messageInput = document.getElementById("message-input").value;
            if (messageInput.trim() !== "") {
                const newMessage = {
                    message: messageInput.trim(),
                    sender: currentUser.uid
                };
                const fullName = userData[currentUser.uid].full_name;
                const messageClass = "sent";
                const messageElement = `<li class="${messageClass}"><span>${fullName}: </span>${newMessage.message}</li>`;
                document.getElementById("messages").innerHTML += messageElement;
    
                document.getElementById("message-input").value = "";
            }
        });
    });
});
