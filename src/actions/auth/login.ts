'use server';
 
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    window.location.replace("/")
  } catch (error) {
    if (error instanceof AuthError) {
      return 'CredentialsSignin';
    } 
    throw error;
  }
}


export const login = async(email: string, password: string) => {

  try {
    
    await signIn('credentials', { email, password, redirect: false })

    return {
      ok: true
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "No se pudo iniciar sesion"
    }
  }

}