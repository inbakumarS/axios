//AXIOS GLOBALs
axios.defaults.headers.common['X-Auth-Token']='ghjkfdlkjhfdjkiuhendjuhfrndmiurfhndmr';
//GET Requests
function getTodos() {
   // console.log('GET Request');
   //method 1
  /* axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/todos',
    params:{
     _limit:5
    }

   })
   //.then(res=> console.log(res))
   //.then(res=> console.log(res.data))//to get the specified area
   .then(res=> showOutput(res))
   .catch(err =>console.error(err));
  }*/
  //method 2
  //by default axios is get method
  axios
  //.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout:5000})//settimeout option
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5',)
  .then(res=> showOutput(res))
   .catch(err =>console.error(err));
}
  
  // POST REQUEST
  function addTodo() {
    //console.log('POST Request');
    //method 1
    /*axios({
        method:'post',
        url:'https://jsonplaceholder.typicode.com/todos',
        data:{
            title:'New Todo',
            completed:false
    }
  })
  .then(res =>showOutput(res))
  .catch(err =>console.error(err));
}*/
//method 2
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title:'New Todo',
    completed:false
  })
  .then(res =>showOutput(res))
  .catch(err =>console.error(err));
}


  // PUT/PATCH REQUEST
  function updateTodo() {
    //console.log('PUT/PATCH Request');
    //method 1
    axios({
        //method:'put',//will change everything
        method:'patch',//will change only the data need to be updated
        url:'https://jsonplaceholder.typicode.com/todos/1',
        data:{
            title:'updated Todo',
            completed:true
    }
  })
  .then(res =>showOutput(res))
  .catch(err =>console.error(err));
  }
//method 2
  /*axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
        title:'updated Todo',
        completed:true
  })
  .then(res =>showOutput(res))
  .catch(err =>console.error(err));
  }*/
  
  // DELETE REQUEST
  function removeTodo() {
    //console.log('DELETE Request');
    axios.delete('https://jsonplaceholder.typicode.com/todos/1'
  )
  .then(res =>showOutput(res))
  .catch(err =>console.error(err));
  }
  
  
  // SIMULTANEOUS DATA
  function getData() {
    //console.log('Simultaneous Request');
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/posts')
    ])
    //method 1
    /*.then(res =>{
        console.log(res[0]);
        console.log(res[1]);
        showOutput(res[1]);
    })*/
    //method 2
    .then(axios.spread((todos,posts)=>showOutput(posts)))
    .catch(err =>console.error(err));
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    //console.log('Custom Headers');

    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:'someToken'
        }
    }
    axios.post('https://jsonplaceholder.typicode.com/todos',{
        title:'New Todo',
        completed:false
      },config
      )
      .then(res =>showOutput(res))
      .catch(err =>console.error(err));
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    //console.log('Transform Response');
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
          title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
          data.title = data.title.toUpperCase();
          return data;
        })
    };

    axios(options).then(res => showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    //console.log('Error Handling');
    /*axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
       validateStatus: function(status) {
         return status < 500; // Reject only if status is greater or equal to 500
       }*/
    axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then(res=> showOutput(res))
     .catch(err =>{
        // Server responded with a status other than 200 range
        if (err.response){
         console.log(err.response.data);
         console.log(err.response.status);
         console.log(err.response.headers);

         if(err.response.status===404){
            alert('Error:Page not found');
         }
        }else if (err.request) {
            // Request was made but no response
            console.error(err.request);
          } else {
            console.error(err.message);
          }
    });
        
  }
  
  
  // CANCEL TOKEN
  function cancelToken() {
    //console.log('Cancel Token');
    const source = axios.CancelToken.source();

    axios
      .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
      })
      .then(res => showOutput(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  if(true){
    //if (false) {
      source.cancel('Request canceled!');
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config =>{
        console.log(
        `${config.method.toUpperCase()} request sent to ${
            config.url} at  ${new Date().getTime}`
        );
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
  );
  
  // AXIOS INSTANCES
  const axioInstance=axios.create({
    //other custom settings
    baseURL:'https://jsonplaceholder.typicode.com'
  });
  //axioInstance.get('/todos').then(res => showOutput(res));
  axioInstance.get('/comments').then(res => showOutput(res));

  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);