import { type NextPage } from "next";
import Head from "next/head";
import { use, useState } from "react";
import { Input } from "~/component/Input";
import { FormGroup } from "~/component/FormGroup";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/component/Button";

const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({
        prompt: "",
    });

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data) {
            console.log('mutation finished', data);
        }
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Send form data to backend
        generateIcon.mutate({
            prompt: form.prompt,
        });
    }

    function updateForm(key: string) {
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            setForm((prev) => ({ 
                ...prev, 
                [key]: e.target.value 
            }))
        }
    }

    const session = useSession();

    const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!isLoggedIn && (
        <Button onClick={signIn}>Login</Button>
        )}
         {isLoggedIn && (
        <Button onClick={signOut}>LogOut</Button>
        )}
        <form className="flex flex-col gap-3"
            onSubmit={handleFormSubmit}
            >
            <FormGroup>
            <label className="">Prompt</label>
            <Input 
                value={form.prompt}
                onChange={updateForm('prompt')}></Input>
            </FormGroup>
            <Button className="rounded px-6 py-4 bg-blue-400">Generate</Button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
