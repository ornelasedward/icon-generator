import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Input } from "~/component/Input";
import { FormGroup } from "~/component/FormGroup";

const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({
        prompt: "",
    });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form className="flex flex-col gap-3">
            <FormGroup>
            <label className="">Prompt</label>
            <Input 
                value={form.prompt}
                onChange={(e) => 
                    setForm((prev) => ({ 
                        ...prev, 
                        prompt: e.target.value 
                    }))
                    }
            ></Input>
            </FormGroup>
            <button className="rounded px-6 py-4 bg-blue-400">Generate</button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
