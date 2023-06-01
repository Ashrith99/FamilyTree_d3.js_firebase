import { initializeApp } from 'firebase/app'
import { getFirestore, collection,getDocs, addDoc, doc,query, where, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDlS1Zmz7dchPgjezE1JkOHY2i6BC2PQGQ",
    authDomain: "neww-7042b.firebaseapp.com",
    projectId: "neww-7042b",
    storageBucket: "neww-7042b.appspot.com",
    messagingSenderId: "669314217573",
    appId: "1:669314217573:web:da1d67ba6a53b8db8bb88c"
};

initializeApp(firebaseConfig);

const db = getFirestore()

// const col = collection(db, 'employees')
const col = collection(db, 'familyy')

getDocs(col)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {

            books.push({ ...doc.data(), id: doc.id })

        })
        console.log(books)

    })
    .catch(err => {
        console.log(err.message)
    })

    


//initialise form
const modal = document.querySelector('.modal');
M.Modal.init(modal);

//add to db
const Forms = document.querySelector('form');
const names = document.querySelector('#name');
const parent = document.querySelector('#parent');
const department = document.querySelector('#department');
const btn = document.querySelector('#butt');

var nams = document.getElementById("name").value;
var parr = document.getElementById("parent").value;
var dept = document.getElementById("department").value;



// Forms.addEventListner('submit',async (e)=>{
//     e.preventDefault()

//     const docRef = await addDoc(col,{

//         name: names.value,
//         parent: parent.value,
//         department: department.value
//     })
//     .then(()=>{
//         Forms.reset()
//     })



// })

// async function addss(e) {
//     e.preventDefault();
//     try {
//         const docRef = await addDoc(collection(db, "employees"), {
//             name: names.value,
//         parent: parent.value,
//         department: department.value
//         });
//         console.log("name :"+{nams}+"sssss");
//     }
//     catch (err) {
//         console.log(err);
//     }
// }
// var h = document.getElementById("butt");
// h.onclick = addss();

//manual

// const docRef = await addDoc(collection(db, "employees"), {
//     name: "Tokyo",
//     parent: "Japan",
//     department:"mech"
//   });
//   console.log("Document written with ID: ", docRef.id);
btn.addEventListener("click", async function (event) {
    event.preventDefault()

    const docRef = await addDoc(collection(db, "familyy"), {
        name: names.value,
        parent: parent.value,
        department: department.value
    });
    console.log("name :sssssyyyyyyyy");
    location.reload();
    // to close form
    // var instance = M.modal.getInstance(modal)
    // instance.close()

    // Forms.reset();



});


var data = []
onSnapshot(col,(snapshot) => {
        
        snapshot.docChanges().forEach((change) => {
            const doc = {...change.doc.data(), id:change.doc.id};

            if (change.type === "added") {
                data.push(doc)
            }
            if (change.type === "modified") {
                const index = data.findIndex(item => item.id == doc.id);
                data[index] = doc; 
                
            }
            if (change.type === "removed") {
                data = data.filter(item => item.id != doc.id)
            }
            

        })
        update(data);
        

    })
   






