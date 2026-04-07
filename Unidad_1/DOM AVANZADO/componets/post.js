const postData=() =>{
    const newPost={
      titulo: "Nuevo Post",
      descripcion: "es un nuebo post ",
      fecha: new Date().toISOString()
    };
    fetch(API_URL, {
        method:"POST",
        headers:{"Content-type": "appllication/json",
                "Accept":"application/json"
        },
        body:JSON.stringify(newPost)
    })
    .then(response=>{
        if(!response.ok){
            throw new Error(`HTTP error! estado: ${response.status}`)
        }
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error =>showResult(error.message,true))
}

