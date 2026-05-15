"use client";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
//Create User
export async function createUser(data: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  password: any;
  name: string;
  email: string;
}) {
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
//Update User
export async function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
    password: string;
  }
) {
  await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
//Delete User
export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
