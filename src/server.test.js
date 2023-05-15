const saveToJSON =require('./server');


test("TestSaveToJSON",()=>{
    const post=  {
        date: "2023-05-15T11:04:04.246Z",
        title: "123",
        text: "title",
        id: "2023-05-15T11:04:04.246Z",
        author: "me"
      }
      const jsonPost={
        "date": "2023-05-15T11:04:04.246Z",
        "title": "123",
        "text": "",
        "id": "2023-05-15T11:04:04.246Z",
        "author": ""
      };
    //expect(saveToJSON(post)).toEqual( jsonPost)
})