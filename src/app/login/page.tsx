"use client";

import Link from "next/link";
import { useState } from "react";


export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [visivel, setVisivel] = useState<boolean>(false);
    const [resposta, setResposta] = useState<string>("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const time = (ms: number) => 
    new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (catchErro()) {
      return;
    };
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: senha
      })
    });
    if ( !response.ok ) {
      const data = await response.json();
      setResposta(data.error);
      alert();
      return;
    }
    const data = await response.json();
    setResposta(data.message);
    alert();
    }

    function catchErro() {
        if ( email === "" || senha === "" ) {
            setResposta("Preencha todos os campos.")
            alert();
            return true;
        } else {
            return false;
        }
    }

    

    async function alert() {
    setVisivel(true);
    await time(3000);
    setVisivel(false);
    }

    return(
        <div className="flex min-h-screen items-center justify-center gap-4" >
            <div className="relative">
                <form onSubmit={handleSubmit} className="flex flex-col w-fit items-center justify-center border border-amber-50 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.4)] p-8 gap-4">
                
                <h1 className="text-3xl font-bold">Login</h1>

                <div className="flex flex-col gap-2">
                    
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full border border-amber-50 p-2"/>
                    <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} className="w-full border border-amber-50 p-2"/>
                    <button className="border bg-blue-600 p-2 hover:bg-blue-800">Entrar</button>
                    <div className="flex gap-1 justify-center">
                        <h1 className="text-sm">Ainda não possui uma conta?</h1>
                        <Link href="/" className="text-sm text-blue-400 hover:text-blue-600">Criar conta</Link>
                    </div>
                </div>
                </form>
                <div className={`absolute top-full mt-4 w-full text-center transition-opacity text-xl duration-1000 text-white ${ visivel ? "opacity-100" : "opacity-0" }`}>
                    <h1>{resposta}</h1>
                </div>
            </div>
        </div>
    );
}