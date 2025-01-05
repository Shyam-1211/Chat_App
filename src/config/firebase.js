// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {getFirestore, setDoc, doc, collection, query, where, getDocs} from "firebase/firestore"
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2T7-aorvO9sh13MginLTNROaqPdm1dEg",
  authDomain: "chat-app-ss-888e2.firebaseapp.com",
  projectId: "chat-app-ss-888e2",
  storageBucket: "chat-app-ss-888e2.firebasestorage.app",
  messagingSenderId: "1041181622978",
  appId: "1:1041181622978:web:a8b62db9377cb2f372715b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth,email,password)
    const user = res.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      lastSeen:Date.now(),
      bio:"Hey I am using this to chat"
    })
    await setDoc(doc(db,"chats",user.uid),{
      chatData:[]
    })
    
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const login = async (email,password) =>{
  try {
     await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = async ()=>{
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}
const resetPass = async (email) => {
  if (!email) {
    toast.error("Enter Your Email")
    return null
  }
  try {
    const userRef = collection(db,'users')
    const q = query(userRef,where("email","==",email))
    const querySnap = await getDocs(q)
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth,email)
      toast.success("Reset Email sent")
    }
    else{
      toast.error("Email Not Found")
    }
  } catch (error) {
    toast.error(error)
  }
}


export {signup,login,logout,auth,db,resetPass}