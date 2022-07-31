export const createDataInFirebase = async (first, last, born) => {
    let returnObj = ""
    console.log('firebase start')
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first,
            last,
            born,
        });
        returnObj = "test1"
        console.log("Document written with ID:", docRef.id);
    } catch (e) {
        returnObj = "test2"
        console.error("Error adding document:", e)
    }
    return returnObj
}

export const readData = async () => {
    console.log('readData')
    const q = query(collection(db, "users"), where("born", "==", "1996"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
};

export const updateData = async () => {
    const washingtonRef = doc(db, "users", "OP57uDtNV1jUe5IM6Lj3");
    await updateDoc(washingtonRef, {
        capital: true
    });
};

export const deleteData = async () => {
    const cityRef = deleteDoc(doc(db, 'users', 'OP57uDtNV1jUe5IM6Lj3'))
    // await updateDoc(cityRef, {
    //     capital: deleteField()
    // })
}