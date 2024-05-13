import { useState } from "react";
import api from "../api"
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Fundo from "../assets/fundoLogin.svg"
import "../styles/FormStyle.css"
import logo from "../assets/logo.svg"
import animacao from "../assets/animacao.svg"

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Faça login e comece a buscar o lugar perfeito para você" : "Se cadastre e comece a  buscar o lugar perfeito para você"

    const metodo = method === "login" ? "Entrar" : "Cadastrar"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try{
            console.log('cheguei aqui')
            const res = await api.post(route, { username, password })
            if(method == "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                console.log("CHEGUEI AQUI")
                navigate("/")
            } else {
                navigate("/login")
            }
        }
        catch(error){
            if(error.response.status === 401){
                setError("Usuário ou senha errados, tente novamente!")
            } else if (error.response.status === 400) {
                setError("Insira todos os dados por favor!")
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
            <div className="main-login">
                <img src={logo} className="logo"/>
                <form onSubmit={handleSubmit} className="form">
                    <div className="left-login">
                        <h1>{name}</h1>
                        <img src={animacao}/>
                    </div>
                    <div className="right-login">
                        <div className="card-login">
                            <h1>LOGIN</h1>
                            <div className="text-field">
                                <p>Usuário</p>
                                <input 
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="usuario123"
                                    className={error ? 'input-error' : ''}
                                />
                            </div>

                            <div className="text-field">
                                <p>Senha</p>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="1234567"
                                    className={error ? 'input-error' : ''}
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <button type="submit" className="login-btn">{metodo}</button>
                            <p> Não possui conta?</p>
                        </div>
                    </div>
                </form>
            </div>
        </>

    
    )
}

export default Form