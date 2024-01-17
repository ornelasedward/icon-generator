import { type NextPage } from "next";
import Head from "next/head";
import { use, useState } from "react";
import { Input } from "~/component/Input";
import { FormGroup } from "~/component/FormGroup";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/component/Button";
import Image from "next/image";

const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({
        prompt: "",
    });

    const [imageUrl, setImageUrl] = useState('');

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data) {
            if (!data.imageUrl) return;
            setImageUrl(data.imageUrl);
        }
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
        {session.data?.user?.name}
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
        <h2 className="text-xl">Your Icons</h2>
        <section className="mb-12 grid grid-cols-4 gap-4">
            {imageUrl && (
                <img
                    key={imageUrl}
                    src={imageUrl}
                    alt="an image of your generated prompt"
                    width={512}
                    height={512}
                    className="w-full"
                    priority="true"
                />
            )}
        </section>
      </main>
    </>
  );
};

export default GeneratePage;
