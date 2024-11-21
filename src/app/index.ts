'use server';
import { signIn, signOut } from "@/auth";

export async function doLogout() {
    await signOut({ redirectTo: "/"});
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log("Attempting login with:", { username, password });
    try {
        const response = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        })
        return response;
    } catch (err: any) {
        throw err;
    }
}