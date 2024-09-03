import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/Frontend/VerifyTokenForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function VerifyAccount({
  params: { id },
}: {
  params: { id: string };
}) {
  //Get a User from DB
  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Verificar token</CardTitle>
          <CardDescription>
            Por favor ingrese el token de 6 dígitos enviado a su correo
            electrónico - {user?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyTokenForm role={role} userToken={userToken} id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
