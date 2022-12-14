import { Button, TextField } from "@mui/material"
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const FormularioRestaurante = () => {

    const parametros = useParams()
    
    useEffect(()=> {
        if(parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
            .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    },[parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const AoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post('http://localhost:8000/api/v2/restaurantes/',
            {nome: nomeRestaurante}
        )
            .then(() => {
                alert('Restaurante Cadastrado com Sucesso')
            })

    }

    return(
    
    <form onSubmit={AoSubmeterForm}>
        <TextField
            value={nomeRestaurante}
            onChange={ evento => setNomeRestaurante(evento.target.value) }
            id="standard-basic"
            label="Nome do Restaurante"
            variant="standard"/>
        <Button type="submit" variant="outlined">Salvar</Button>
    </form>

    )
}

export default FormularioRestaurante