
/* This section will be variables */
const userEntry = document.getElementById("user-entry-el");
const fromEl = document.getElementById("from-el");
const toEl = document.getElementById("to-el");
const publishEl = document.getElementById("btn-el");
const postWrapper = document.getElementById("post-wrapper")


/* This section will hold our imports */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


/* This section will connect the database */
const appSettings = {
    databaseURL: "https://messageboard-app-dbc34-default-rtdb.firebaseio.com/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const messageBoardDB = ref(database, "messageboard");


/* entry object */
const entry = {
    message: userEntry,
    from: fromEl,
    to: toEl
};

publishEl.addEventListener("click", () => {
    let messageArr = [entry.to.value, entry.message.value, entry.from.value]
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
    for (let i = 0; i < 1; i++) {
        let itemID = arr[0];
        let itemArr = arr[1];

        for (let i = 0; i < 1; i++) {
            let toItem = itemArr[0];
            let messageItem = itemArr[1];
            let fromItem = itemArr[2];
            console.log(toItem);
            console.log(messageItem);
            console.log(fromItem);
            section.className = "post";
            postTo.textContent = `To: ${toItem}`
            post.textContent = `${messageItem}`
            postFrom.textContent = `From: ${fromItem}`;
            section.appendChild(postTo);
            section.appendChild(post);
            section.appendChild(postFrom);
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
