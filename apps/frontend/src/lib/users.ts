'use server';

import { supabase } from '../services/supabase';
import type { User } from '@clerk/nextjs/server';

/**
 * Finds a user in Supabase by their Clerk ID. If the user doesn't exist,
 * it creates a new user in Supabase.
 *
 * @returns The Supabase user object.
 */
export async function findOrCreateUser(user: User | null) {
  if (!user || !user.userId) {
    throw new Error('User not authenticated.');
  }

  try {
    // Check if the user already exists in Supabase
    const { data: existingUser, error: selectError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116: "The result contains 0 rows"
      throw selectError;
    }

    if (existingUser) {
      return { ...existingUser, fullName: existingUser.full_name };
    }

    // If the user doesn't exist, create a new one
    const { data: newUser, error: insertError } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          full_name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddresses[0].emailAddress
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return { ...newUser, fullName: newUser.full_name };
  } catch (error) {
    throw new Error(
      `Failed to find or create user: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
