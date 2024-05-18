"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import {z} from "zod";

 const signUpSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUp = async (formData:FormData) => {

   const supabase = createClient();

			const values = Object.fromEntries(formData.entries());

			const validatedFields = signUpSchema.safeParse({
				full_name: values.full_name,
				email: values.email,
				password: values.password,
			});

			if (!validatedFields.success) {
				// return flattened errors
				return "An error occurred";
			}

			const { data, error } = await supabase.auth.signUp({
				email: validatedFields.data.email,
				password: validatedFields.data.password,
				options: {
					data: {
						full_name: validatedFields.data.full_name,
					},
				},
			});

			if (error || !data) {
				return "An error occurred";
			}

			return "Success! Check your email to verify your account";



}


const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signIn = async (formData:FormData) => {

    const supabase = createClient();

        const {email, password} = Object.fromEntries(formData.entries());

        const validatedFields = signInSchema.safeParse({
          email: email,
          password: password,
        });

        if (!validatedFields.success) {
          // return flattened errors
          return validatedFields.error.flatten();
        }


        const { data, error } = await supabase.auth.signInWithPassword({
									email: validatedFields.data.email,
									password: validatedFields.data.password,
								});

        if (error || !data) {
          return "An error occurred";
        }

        redirect("/dashboard");

}


export const signOut = async () => {

      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        return "An error occurred";
      }

      redirect("/");
};

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const forgotPassword = async (formData:FormData) => {

      const supabase = createClient();

      const { email } = Object.fromEntries(formData.entries());

      const validatedFields = forgotPasswordSchema.safeParse({
        email: email,
      });

      if (!validatedFields.success) {
        // return flattened errors
        console.log(validatedFields.error.flatten().fieldErrors);
        return validatedFields.error.flatten().fieldErrors;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(validatedFields.data.email);

      console.log(error);

      if (error) {
        return "An error occurred";
      }

      return "Success! Check your email to reset your password";

};


const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function resetPassword(formData:FormData) {

      const supabase = createClient();

      const values = Object.fromEntries(formData.entries());

      const validatedFields = resetPasswordSchema.safeParse({
        email: values.email,
        password: values.password,
      });

      if (!validatedFields.success) {
        // return flattened errors
        return validatedFields.error.flatten().fieldErrors;
      }

      const { error, data } = await supabase.auth.updateUser({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      });

      console.log({error, data});

      if (error) {
        return "An error occurred";
      }

      return "Success! Your password has been reset";

}
