"use client";

import useUser from "@/utils/useUser";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Spinner,
  Image,
  CardFooter,
} from "@nextui-org/react";

export default function Home() {
  const { isLoading, isLoggedIn, user, error, mutate } = useUser();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    mutate();
  };

  return (
    <main className="flex h-screen items-center justify-center">
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
              {isLoggedIn ? (
                <>
                  <Card className="w-full max-w-[400px]">
                    <CardHeader>
                      <p className="text-center w-full font-semibold">
                        User Details
                      </p>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4 justify-center items-center">
                      <Image
                        src={user?.picture}
                        alt="User Display Picture"
                        width={50}
                        height={50}
                      />
                      <Input
                        name="name"
                        label="Name"
                        value={user?.name}
                        variant="bordered"
                        isReadOnly
                      />
                      <Input
                        name="email"
                        label="Email"
                        value={user?.email}
                        variant="bordered"
                        isReadOnly
                      />
                    </CardBody>
                    <CardFooter className="flex justify-center">
                      <Button
                        variant="bordered"
                        color="danger"
                        onPress={handleLogout}
                      >
                        Logout
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="w-full max-w-[400px]">
                    <CardBody>
                      <p className="text-center w-full font-semibold">
                        Your Details will be displayed here when you login
                      </p>
                    </CardBody>
                    <CardFooter className="flex justify-between items-center">
                      <Button href="/login" as={Link}>
                        Login
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
      )}
    </main>
  );
}
