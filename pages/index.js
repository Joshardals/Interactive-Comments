import Head from "next/head";
import tw from "tailwind-styled-components";
import Body from "../components/Body";

export default function Home() {
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
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
