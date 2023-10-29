
/* This section will be variables */
const userEntry = document.getElementById("user-entry-el");
const fromEl = document.getElementById("from-el");
const toEl = document.getElementById("to-el");
const publishEl = document.getElementById("btn-el");
const postWrapper = document.getElementById("post-wrapper")


/* This section will hold our imports */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { v4 as uuid } from 'https://jspm.dev/uuid';


/* This section will connect the database */
const appSettings = {
    databaseURL: "https://messageboard-app-dbc34-default-rtdb.firebaseio.com/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const messageBoardDB = ref(database, "messageboard");

console.log(uuid())
/* entry object */
const entry = {
    message: userEntry,
    from: fromEl,
    to: toEl,
    isLiked: false,
    likes: 0,
    isCommented: false,
    comments: [],
    entryId: uuid()
};

publishEl.addEventListener("pointerdown", () => {
    let messageArr = [entry.to.value, entry.message.value, entry.from.value, entry.isLiked, entry.likes, entry.isCommented, entry.comments, entry.entryId]
    push(messageBoardDB, messageArr)
    inputReset()
});

onValue(messageBoardDB, function(snapshot) {
    if (snapshot.exists()) {
        let arrayItems = Object.entries(snapshot.val())
        clearMessageboard()
        for (let i = 0; i < arrayItems.length; i++) {
            let currentItem = arrayItems[i];
            let currentItemID = arrayItems[0];
            let currentItemValue = arrayItems[1];
            publishPosts(currentItem);

        }
    } else {
        postWrapper.innerHTML = `No messages currently`
    }
})

function publishPosts(arr) {
    const section = document.createElement("section");
    const postTo = document.createElement("h3");
    const post = document.createElement("p");
    const postFrom = document.createElement("h3");
    const div = document.createElement("div")
    /* get heart icon, get uuid setup as well */
    const heartBtn = document.createElement("i");
    const commentBtn = document.createElement("i");
    for (let i = 0; i < 1; i++) {
        let itemID = arr[0];
        let itemArr = arr[1];

    for (let i = 0; i < 1; i++) {
            let toItem = itemArr[0];
            let messageItem = itemArr[1];
            let fromItem = itemArr[2];
            let isLiked = itemArr[3];
            let likes = itemArr[4];
            let isCommented = itemArr[5]
            let comments = itemArr[6];
            let btnId = itemArr[7]

            section.className = "post";
            postTo.textContent = `To: ${toItem}`
            post.textContent = `${messageItem}`
            postFrom.textContent = `From: ${fromItem
            }`;
            div.classList.add("btn-container")
            heartBtn.classList.add("fa-heart");
            heartBtn.classList.add("fa-solid");
            heartBtn.dataset.likeId = btnId;
            div.appendChild(heartBtn);
            commentBtn.classList.add("fa-message");
            commentBtn.classList.add("fa-solid");
            commentBtn.dataset.commentId = btnId;
            div.appendChild(commentBtn);
            
            section.appendChild(postTo);
            section.appendChild(post);
            section.appendChild(postFrom);
            section.appendChild(div);
            postWrapper.prepend(section);
        };
    };
    
};

function inputReset() {
    userEntry.value = "";
    fromEl.value = "";
    toEl.value = "";
};

function clearMessageboard() {
    postWrapper.textContent ='';
};


window.addEventListener("pointerdown", (e) => {
    if (e.target.dataset.likeId) {
        handleLike(e.target.dataset.likeId)
    }
    else if (e.target.dataset.commentId) {
        handleComment(e.target.dataset.commentId)
    }
})
/* 
    make sure uuid works, make sure dataset is set
    make consolelogs in the functions
    make event listeners
    fill out functions
 */
function handleLike(likeUuid) {
    console.log(likeUuid)
}

function handleComment(commentUuid) {
    console.log(commentUuid)
}