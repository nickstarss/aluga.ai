import logo from "../assets/logo.svg"
import "../styles/NotFoundSyle.css"

function NotFound(){
    return (
    <div className="bodyNotFound">
        <img src={logo} className={"logoImg"}/>
        <h1 className={"tituloNotFound"}>Erro 404</h1>
        <h3 className="h3NotFound">Opa, encontramos problemas tentando achar esta página!</h3>
        <p className="pNotFound">Parece que a página não existe, tente mudar o endereço por favor.</p>
    </div>
    
)
}

export default NotFound