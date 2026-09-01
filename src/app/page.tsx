"use client";

import Link from "next/link";
import { useState } from "react";


export default function Home() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [vsenha, setVsenha] = useState<string>("");
  const [visivel, setVisivel] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const time = (ms: number) => 
    new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (catchErro()) {
      return;
    };

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        password: senha
      })
    });
    if ( !response.ok ) {
      const data = await response.json();
      setErro(data.error);
      alert();
    }
  };

  function catchErro() {
    if ( senha !== vsenha ) {
      setErro("As senhas não coincidem.")
      alert();
      return true;
    } else if ( nome === "" || email === "" || senha === "" ) {
      setErro("Preencha todos os campos.")
      alert();
      return true;
    } else if ( senha.length < 8 ) {
      setErro("Senha muito curta.")
      alert();
      return true;
    }
    return false;
  }

  async function alert() {
    setVisivel(true);
    await time(3000);
    setVisivel(false);
  }


  return (
    <div className="flex min-h-screen items-center justify-center gap-4" >
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col w-fit items-center justify-center border border-amber-50 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.4)] p-8 gap-4">
          
          <h1 className="text-3xl font-bold">Cadastro</h1>

          <div className="flex flex-col gap-2">
            <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} className="w-fit border border-amber-50 p-2"/>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-fit border border-amber-50 p-2"/>
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} className="w-fit border border-amber-50 p-2"/>
            <input type="password" placeholder="Confirme a senha" onChange={(e) => setVsenha(e.target.value)} className="w-fit border border-amber-50 p-2"/>
            <button className="border bg-blue-600 p-2 hover:bg-blue-800">Cadastrar</button>
            <div className="flex gap-1 justify-center">
              <h1 className="text-sm">Ja possui uma conta?</h1>
              <Link href="/login" className="text-sm text-blue-400 hover:text-blue-600">Entrar</Link>
            </div>
          </div>
        </form>
        <div className={`absolute top-full mt-4 w-full text-center transition-opacity text-xl duration-1000 text-white ${ visivel ? "opacity-100" : "opacity-0" }`}>
          <h1>{erro}</h1>
        </div>
      </div>
    </div>
  );
}
