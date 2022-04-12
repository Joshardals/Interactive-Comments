import { useEffect } from "react";
import Head from "next/head";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import Body from "../components/Body";
import Profile from "../components/Profile";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);
  console.log(session);
  return (
    <Wrapper>
      <Head>
        <title>Interactive Comments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Profile />
      <Body />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  py-6
`;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  return {
    props: {
      providers,
      session: await getSession(ctx),
    },
  };
}
