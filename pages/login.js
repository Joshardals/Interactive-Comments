import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import tw from "tailwind-styled-components";
import styled from "styled-components";

const login = ({ providers }) => {
  return (
    <Wrapper>
      <Head>
        <title>Login - Interactive Comments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <a
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#5457b6] rounded-full shadow-md group"
            >
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#5457b6] group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-[#5457b6] transition-all duration-300 transform group-hover:translate-x-full ease">
                Sign in with {provider.name}
              </span>
              <span class="relative invisible">
                Sign in with {provider.name}
              </span>
            </a>
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
