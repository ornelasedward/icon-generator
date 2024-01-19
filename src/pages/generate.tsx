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

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!isLoggedIn) {
            setIsModalVisible(true);
            return;
        }

        generateIcon.mutate({
            prompt: form.prompt,
        });
        setForm({ prompt: "" });
    }

    function updateForm(key: string) {
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            setForm((prev) => ({ 
                ...prev, 
                [key]: e.target.value 
            }))
        }
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const session = useSession();
    const isLoggedIn = !!session.data;

    const credits = api.user.getCredits.useQuery();

    const Modal = () => (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ${isModalVisible ? 'block' : 'hidden'}`}>
            <div className="w-full max-w-2xl rounded-lg bg-slate-500 p-6 m-auto flex flex-col gap-8 relative">
                <button 
                    onClick={() => setIsModalVisible(false)}
                    className="absolute top-3 right-3 text-white hover:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-4xl font-bold text-center">Login to Generate Icon!</h2>
                <div className="m-auto">
                    <Button onClick={() => {signIn().catch(console.error); setIsModalVisible(false);}}>Login</Button>
                </div>
            </div>
        </div>
    );
    

  return (
    <>
      <Head>
        <title>Logo Forge</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-5">
    <h1 className="text-3xl font-bold text-slate-400 ">{session.data?.user?.name}</h1>
    <p className="text-xl">{credits.data || 0} Credits Remaining</p>
    <form className="mt-5 flex w-full max-w-lg flex-col gap-4 rounded-lg bg-slate-300 p-6 shadow-lg"
        onSubmit={handleFormSubmit}
        >
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Prompt</label>
            <input 
                className="rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={form.prompt}
                onChange={updateForm('prompt')} />
        </div>
        <button className="mt-4 rounded bg-blue-500 px-6 py-3 text-lg font-medium text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Generate</button>
    </form>
    <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">Your Icons</h2>
    <section className="grid w-full max-w-4xl grid-cols-4 gap-4">
        {imageUrl && (
            <img
                className="h-auto w-full rounded-lg object-cover shadow-md"
                src={imageUrl}
                alt="an image of your generated prompt"
            />
        )}
    </section>
</main>
<Modal />

    </>
  );
};

export default GeneratePage;
