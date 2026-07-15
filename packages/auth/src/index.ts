export interface AuthErrorLike {
  message: string;
}

export interface MagicLinkAuthClient {
  auth: {
    signInWithOtp(input: {
      email: string;
      options: { emailRedirectTo: string; shouldCreateUser: boolean };
    }): Promise<{ error: AuthErrorLike | null }>;
    signOut(): Promise<{ error: AuthErrorLike | null }>;
  };
}

export interface OrganizationMembershipChecker {
  isMember(userId: string, organizationId: string): Promise<boolean>;
}

export async function sendMagicLink(
  client: MagicLinkAuthClient,
  email: string,
  emailRedirectTo: string,
): Promise<void> {
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo, shouldCreateUser: false },
  });
  if (error) throw new Error(error.message);
}

export async function signOut(client: MagicLinkAuthClient): Promise<void> {
  const { error } = await client.auth.signOut();
  if (error) throw new Error(error.message);
}

export function extractBearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const match = /^Bearer\s+([^\s]+)$/i.exec(header);
  return match?.[1] ?? null;
}

export async function requireOrganizationMembership(
  checker: OrganizationMembershipChecker,
  userId: string,
  organizationId: string,
): Promise<void> {
  if (!(await checker.isMember(userId, organizationId))) {
    throw new Error("ORGANIZATION_ACCESS_DENIED");
  }
}
