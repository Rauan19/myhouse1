
import {Button, Container, Content, Greeting, Form, Label, Input, SignUpLink} from './styles'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../services/api';
import {BarLoader} from 'react-spinners'

const RegistroPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading]  = useState(false)


    const CadastrarUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/user/registro', {name, email, password})
            alert("Cadastro com sucesso")
            setName('')
            setEmail('')
            setPassword('')
           setLoading(false)
        } catch (error) {
            alert("erro, ao cadastrar", error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const navigate = useNavigate()
    return (
      <Container>
        <Content>
          <Greeting>Registrese-se aqui</Greeting>
          {loading? (
             <BarLoader color="#3f9aea" width="100%" />
          ) : (
             <Form onSubmit={CadastrarUser}>
            <Label htmlFor="Nome">Nome</Label>
            <Input type="text"
             placeholder='Seu nome' 
             value={name}
             onChange={(e) => setName(e.target.value)}
             />
            <Label>Email</Label>
            <Input type="email"
             placeholder="Seu email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
            <Label>Senha</Label>
            <Input type="password"
             placeholder="Sua senha"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
            <Button type="submit">Registrar</Button>
            <SignUpLink onClick={() => navigate('/login')} >Fazer login</SignUpLink>
          </Form>
          )}
         
        </Content>
      </Container>
    );
  };
  
  export default RegistroPage;
