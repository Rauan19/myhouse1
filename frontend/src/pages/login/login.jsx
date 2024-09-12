import {
  Button,
  Container,
  ForgotPassword,
  Content,
  Greeting,
  Form,
  Label,
  Input,
  SignUpLink,
} from "./style";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fazerlogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login/user", { email, password });
      const token = response?.data?.token;
      const { name, image } = response.data;
      console.log(response);

      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.subject;

        localStorage.setItem(
          "house",
          JSON.stringify({ token, subject: userId, name, image })
        );
        navigate("/");
        alert("Login realizado com sucesso!");
      } else {
        alert("Error ao obter token");
      }
      setLoading(false);
    } catch (error) {
      alert("Erro ao fazer login", error);
      console.log({ err: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Greeting>Bem-vindo de volta!</Greeting>
        {loading ? (
          <BarLoader color="#3f9aea" width="100%" />
        ) : (
          <Form onSubmit={fazerlogin}>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Entrar</Button>
            <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>
            <SignUpLink onClick={() => navigate("/registro")}>
              Criar uma conta
            </SignUpLink>
          </Form>
        )}
      </Content>
    </Container>
  );
};

export default LoginPage;
