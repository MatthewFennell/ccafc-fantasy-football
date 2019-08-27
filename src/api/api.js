import firebase from "firebase";

// Param func is the NAME of the function to call
const functionToCall = func => firebase.functions().httpsCallable(func);

// Data here is the data that should be sent to the function
// Can add adapters to transform data here
export const addMessage = data =>
  functionToCall("addMessage")(data).then(data => ({
    ...data.data,
    test: "testing"
  }));
