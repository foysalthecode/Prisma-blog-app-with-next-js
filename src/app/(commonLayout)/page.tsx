import { Button } from "@/components/ui/button";
import { userService } from "@/src/services/user.service";
import { cookies } from "next/headers";

export default async function Home() {
  const { data } = await userService.getSession();

  console.log(data);

  return (
    <div>
      <Button variant="outline">Click here</Button>
    </div>
  );
}
