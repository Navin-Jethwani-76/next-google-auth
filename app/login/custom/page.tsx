"use client";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import useUser from "@/utils/useUser";
import { useRouter } from "next/navigation";

const CustomLoginPage = () => {
  const router = useRouter();
  const { isLoading, mutate, error, isLoggedIn } = useUser();

  if (!isLoading && isLoggedIn) {
    router.push("/");
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response: TokenResponse) => {
      const res = await fetch("/api/login/google/tokenResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data?.message);
        mutate();
      } else {
        alert(data?.error);
      }
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
  });

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
                  <p className="text-center w-full font-semibold">
                    Custom Login
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col space-y-4">
                    <Button
                      className="flex items-center justify-center w-full rounded-md h-10 font-medium shadow-input"
                      variant="bordered"
                      onPress={() => {
                        handleGoogleLogin();
                      }}
                    >
                      <Image
                        src="/googleLogo.svg"
                        width={30}
                        height={30}
                        alt="Google Logo"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Login with Google
                      </span>
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <Button href="/" as={Link}>
                    Home
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

export default CustomLoginPage;
