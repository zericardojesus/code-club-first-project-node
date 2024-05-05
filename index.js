const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = [] //não se usa na vida real aqui vai o codigo do servidor !

const checkUserId = (request, response, next) => {
     const { id } = request.params 

     const index = users.findIndex(user => user.id === id)
      //posição do usuario esta dentro do nosso arrey

      //caso não encontro o usuario irá cair nessa informação
       if(index < 0){
          return response.status(404).json({error: "User not found"})
       }
      request.userIndex = index
      request.userId = id

      next()

}

app.get('/users', (request, response) => {
     return response.json(users)
})

//cria o usuario
app.post('/users', (request, response) => {
        const { name, age } = request.body
        
 
        const user = { id:uuid.v4(), name, age }
        
        users.push(user)
        
        return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request, response) => {
      const { name, age } = request.body //tras a informação
      const index = request.userIndex
      const id = request.userId

      const updateUser = { id, name, age } 
      //tras o objeto informção do usuario id n]ap muda nome e idade mudam

        
       //aqui ele atualiza o usuario
       users[index] = updateUser
             
      return response.json(updateUser)
})


//deletar o usuario
app.delete('/users/:id', checkUserId, (request, response) => {
        const index = request.userIndex

        
        users.splice(index,1)

        return response.status(204).json()
})




app.listen(port, () => {
     console.log('🚴‍♂️ Server started on port ${port}')
})