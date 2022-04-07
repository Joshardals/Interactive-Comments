import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import tw from "tailwind-styled-components";
import styled from "styled-components";

const login = ({ providers }) => {
  return (
    <Wrapper>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <LoginButton onClick={() => signIn(provider.id, { callbackUrl: "/"})}>Sign in with {provider.name}</LoginButton>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex items-center justify-center 
    min-h-screen
`;
// const LoginButton = tw.button`
//     bg-[#5457b6] w-auto h-auto rounded-md
//     p-3
//     hover:opacity-50 transition-all ease-in text-white
// `;
const LoginButton = styled.button`
  background: #5457b6;
  color: white;
  width: auto;
  height: auto;
  border-radius: 0.375rem;
  padding: 0.75rem;
  transform: scale(1);
  transition: all 0.3s ease-in 150ms;
  position: relative;

  :hover {
    opacity: 50%;
  }
  :focus {
    transform: scale(0.8);
  }
`;
export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
