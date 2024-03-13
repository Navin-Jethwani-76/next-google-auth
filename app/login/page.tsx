"use client";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Spinner,
} from "@nextui-org/react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import useUser from "@/utils/useUser";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { isLoading, mutate, error, isLoggedIn } = useUser();

  if (!isLoading && isLoggedIn) {
    router.push("/");
  }
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await fetch("/api/login/google/credentialResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credentialResponse,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        mutate();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Spinner size="lg" />
        </>
      ) : (
        <>
          {error ? (
            <>
              <Card className="w-full max-w-[400px]">
                <CardBody>
                  <p className="text-center w-full font-semibold">
                    There Was An Error
                  </p>
                </CardBody>
              </Card>
            </>
          ) : (
            <>
              <Card className="w-full max-w-[400px]">
                <CardHeader>
                  <p className="text-center w-full font-semibold">Login</p>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-center items-center w-full h-full">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        handleGoogleLogin(credentialResponse);
                      }}
                      onError={() => {
                        alert("Login Failed");
                        // you can add a toast or notifier instead
                      }}
                      // useOneTap // comment out this line if you wish to include onetap signin feature
                    />
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <Button href="/" as={Link}>
                    Home
                  </Button>
                  <Button href="/login/custom" as={Link}>
                    Custom Login
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
};

export default LoginPage;
