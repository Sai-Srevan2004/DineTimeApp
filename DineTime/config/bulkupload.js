import {slots} from '../store/restaurants'
import { collection,doc,setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
const restaurantData=slots

const uploadData=async()=>{
    try {
       for(let i=0;i<restaurantData.length;i++)
        {
            const restaurant=restaurantData[i];
            const docRef=doc(collection(db,"slots"),`slots_${i+1}`)
            await setDoc(docRef,restaurant)
        } 
        console.log("uploaded")
    } catch (error) {
            console.log(error);
    }
}

export default uploadData