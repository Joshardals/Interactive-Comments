import { useEffect } from "react";
import Head from "next/head";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import Body from "../components/Body";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);
  return (
    <Wrapper>
      <Head>
        <title>Interactive Comments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body />
    </Wrapper>
  );
}

const Wrapper = tw.div``;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  return {
    props: {
      providers,
      session: await getSession(ctx),
    },
  };
}
